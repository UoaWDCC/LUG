import { PotentialInvolvement } from "@/generated/prisma/enums";

type RegistrationFormValidationError = {
  message: string;
};

export function validateMemberRegistration(
  parsedRegistrationForm: ParsedRegistrationFormSubmission,
):
  | { ok: true; data: MemberRegistration }
  | { ok: false; error: RegistrationFormValidationError } {
  const requiredFields = hasRequiredFields(parsedRegistrationForm);
  if (requiredFields.hasRequiredFields == false) {
    return { ok: false, error: requiredFields.error };
  }

  if (!isValidEmail(parsedRegistrationForm.email)) {
    return {
      ok: false,
      error: { message: "Email invalid: please enter a valid email address" },
    };
  }

  return { ok: true, data: toMemberRegistrationObject(parsedRegistrationForm) };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length > 254) {
    return false;
  }
  return emailRegex.test(email);
}

//validate if required fields exist and are not null/empty string/undefined etc.
function hasRequiredFields(
  parsed: ParsedRegistrationFormSubmission,
):
  | { hasRequiredFields: true }
  | { hasRequiredFields: false; error: RegistrationFormValidationError } {
  //Base fields required by all registrations
  const requiredFields: string[] = [
    "firstName",
    "lastName",
    "email",
    "linuxSkillLevel",
    "potentialInvolvement",
  ];
  const errorDisplayNames: string[] = [
    "first name",
    "last name",
    "email",
    "linux skill level",
    "potential involvement",
  ];
  for (const field of requiredFields) {
    if (!(field in parsed) || !parsed[field]) {
      const displayName = errorDisplayNames[requiredFields.indexOf(field)];
      return {
        valid: false,
        error: { message: "${displayName} field is required" },
      };
    }
  }
  // Further check for fields that are only required if specific conditions are met
  if (parsed.isEligibleReturningUoaStudent == "true") {
    if (!parsed.upi) {
      return {
        hasRequiredFields: false,
        error: { message: "upi field is required for Uoa students" },
      };
    }
    if (!parsed.studentId) {
      return {
        hasRequiredFields: false,
        error: { message: "Student ID field is required for Uoa students" },
      };
    }
  } else if (parsed.isCurrentUoaStudent == "true") {
    const requiredFieldsUoa = [
      "upi",
      "studentId",
      "faculty",
      "programme",
      "yearLevel",
    ];
    const errorDisplayNamesUoa = [
      "upi",
      "Student ID",
      "Faculty",
      "Programme",
      "Year level",
    ];
    for (const field of requiredFieldsUoa) {
      if (!(field in parsed) || !parsed[field]) {
        const displayName =
          errorDisplayNamesUoa[requiredFieldsUoa.indexOf(field)];
        return {
          hasRequiredFields: false,
          error: {
            message: "${displayName} field is required for Uoa students",
          },
        };
      }
    }
  } else if (parsed.isCurrentUoaStudent == "false") {
    if (!parsed.primaryAffiliation) {
      return {
        hasRequiredFields: false,
        error: {
          message:
            "Primary Affiliation field is required for non-Uoa candidates",
        },
      };
    }
  }
  return { hasRequiredFields: true };
}

function toMemberRegistrationObject(
  parsedForm: ParsedRegistrationFormSubmission,
): MemberRegistration {
  if (parsedForm.isEligibleReturningUoaStudent == "true") {
    return toConditionalReturningMember(parsedForm);
  } else if (parsedForm.isCurrentUoaStudent == "true") {
    return toCurrentUoaStudent(parsedForm);
  } else if (parsedForm.isCurrentUoaStudent == "false") {
    return toNonCurrentUoaStudentMember(parsedForm);
  }
}

function toNonCurrentUoaStudentMember(
  parsed: ParsedRegistrationFormSubmission,
): NonCurrentUoaStudentMember {
  const nonUoaMember: NonCurrentUoaStudentMember = {
    ...toBaseMember(parsed),
    isEligibleReturningUoaStudent: false,
    isCurrentUoaStudent: false,
    primaryAffiliation: parsed.primaryAffiliation,
    ...(parsed.nonUoaExcerpt != null
      ? { nonUoaExcerpt: parsed.nonUoaExcerpt }
      : {}),
    ...(parsed.nonUoaPitch != null ? { nonUoaPitch: parsed.nonUoaPitch } : {}),
  };
  return nonUoaMember;
}

function toConditionalReturningMember(
  parsed: ParsedRegistrationFormSubmission,
): ConditionalReturningMember {
  const returningMember: ConditionalReturningMember = {
    ...toBaseMember(parsed),
    isEligibleReturningUoaStudent: true,
    upi: parsed.upi,
    studentId: parsed.studentId,
  };
  return returningMember;
}
function toCurrentUoaStudent(
  parsed: ParsedRegistrationFormSubmission,
): CurrentUoaStudentMember {
  const uoaMember: CurrentUoaStudentMember = {
    ...toBaseMember(parsed),
    isEligibleReturningUoaStudent: false,
    isCurrentUoaStudent: true,

    upi: parsed.upi,
    studentId: parsed.studentId,
    faculty: parsed.faculty,
    programme: parsed.programme,
    yearLevel: parsed.yearLevel,
  };
  return uoaMember;
}
function toBaseMember(
  parsed: ParsedRegistrationFormSubmission,
): BaseMemberRegistration {
  const baseRegistration: BaseMemberRegistration = {
    firstName: parsed.firstName,
    lastName: parsed.lastName,
    email: parsed.email,

    linuxSkillLevel: parsed.linuxSkillLevel,
    potentialInvolvement: parsed.potentialInvolvement,
    //only create dc username property if property exists in provided info
    ...(parsed.discordUsername != null
      ? { discordUsername: parsed.discordUsername }
      : {}),
  };
  return baseRegistration;
}
