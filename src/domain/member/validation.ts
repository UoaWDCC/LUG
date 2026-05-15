import { PotentialInvolvement } from "@/generated/prisma/enums";

const validYearLevel = [
  "FIRST_YEAR",
  "SECOND_YEAR",
  "THIRD_YEAR",
  "FOURTH_YEAR",
  "FIFTH_YEAR_OR_LATER",
  "GRADUATED_WITHIN_2_YEARS",
] as const;
const validPotentialInvolvement = [
  "ATTENDING",
  "SPEAKING",
  "EXECUTIVE",
  "PROJECTS",
] as const;
const validLinuxSkillLevel = [
  "NOTHING",
  "AWARE_OF_EXISTENCE",
  "BEGINNER_USER",
  "REGULAR_USER",
  "POWER_USER",
  "CONTRIBUTOR",
] as const;

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

  const fieldContent = validateFields(parsedRegistrationForm);
  if (fieldContent.fieldsValid == false) {
    return { ok: false, error: fieldContent.error };
  }

  return { ok: true, data: toMemberRegistrationObject(parsedRegistrationForm) };
}
function validateFields(
  parsed: ParsedRegistrationFormSubmission,
):
  | { fieldsValid: true }
  | { fieldsValid: false; error: RegistrationFormValidationError } {
  if (!isValidEmail(parsed.email)) {
    return {
      fieldsValid: false,
      error: {
        message: `Email invalid: '${parsed.email}', please enter a valid email address`,
      },
    };
  }
  if (
    !validLinuxSkillLevel.includes(parsed.linuxSkillLevel as LinuxSkillLevel)
  ) {
    return {
      fieldsValid: false,
      error: {
        message: `linuxSkillLevel property has invalid value: '${parsed.linuxSkillLevel}'`,
      },
    };
  }
  for (const option of parsed.potentialInvolvement) {
    if (!validPotentialInvolvement.includes(option)) {
      return {
        fieldsValid: false,
        error: {
          message: `potentialInvolvement field contains a selection with invalid value: '${option}'`,
        },
      };
    }
  }

  if (
    parsed.isCurrentUoaStudent == "true" ||
    parsed.isEligibleReturningUoaStudent == "true"
  ) {
    if (!validYearLevel.includes(parsed.yearLevel as YearLevel)) {
      return {
        fieldsValid: false,
        error: {
          message: `yearLevel property has invalid value: ${parsed.yearLevel}`,
        },
      };
    }
    if (!isValidUPI(parsed.upi!)) {
      return {
        fieldsValid: false,
        error: {
          message: `upi invalid: '${parsed.upi}', please enter a valid upi`,
        },
      };
    }
  }

  return { fieldsValid: true };
}

function isValidUPI(upi: string): boolean {
  const upiRegex = /^[A-Za-z]{3,4}[0-9]{3}$/;
  return upiRegex.test(upi);
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
    "isEligibleReturningUoaStudent",
    "isCurrentUoaStudent",
  ];
  const errorDisplayNames: string[] = [
    "First name",
    "Last name",
    "Email",
    "Linux skill level",
    "Potential involvement",
    "Is eligible returning Uoa student",
    "Is current Uoa student",
  ];
  for (const field of requiredFields) {
    if (!(field in parsed) || !parsed[field as keyof typeof parsed]) {
      const displayName = errorDisplayNames[requiredFields.indexOf(field)];
      return {
        hasRequiredFields: false,
        error: {
          message: `'${displayName}' field is required, and must not be null or empty`,
        },
      };
    }
  }

  if (parsed.potentialInvolvement.length === 0) {
    return {
      hasRequiredFields: false,
      error: {
        message:
          "At least one option for Potential Involvement must be selected",
      },
    };
  }

  //check if the value of isEligibleReturningUoaStudent and isCurrentUoaStudent is valid.
  //It is a validity check(thus should be in validateFields function) but is required for the following checks so is moved here.
  if (
    !["true", "false"].includes(parsed.isEligibleReturningUoaStudent as string)
  ) {
    return {
      hasRequiredFields: false,
      error: {
        message: `isEligibleReturningUoaStudent field has value: '${parsed.isEligibleReturningUoaStudent}' must either have value 'true' or 'false'`,
      },
    };
  }
  if (!["true", "false"].includes(parsed.isCurrentUoaStudent as string)) {
    return {
      hasRequiredFields: false,
      error: {
        message:
          "isCurrentUoaStudent field must either have value 'true' or 'false'",
      },
    };
  }

  // Further check for fields that are only required if specific conditions are met
  if (parsed.isEligibleReturningUoaStudent == "true") {
    if (!("upi" in parsed) || !parsed.upi) {
      return {
        hasRequiredFields: false,
        error: { message: "upi field is required for Uoa students" },
      };
    }
    if (!("studentId" in parsed) || !parsed.studentId) {
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
      if (!(field in parsed) || !parsed[field as keyof typeof parsed]) {
        const displayName =
          errorDisplayNamesUoa[requiredFieldsUoa.indexOf(field)];
        return {
          hasRequiredFields: false,
          error: {
            message: `'${displayName}' field is required for Uoa students, and must not be null or empty`,
          },
        };
      }
    }
  } else if (parsed.isCurrentUoaStudent == "false") {
    if (!("primaryAffiliation" in parsed) || !parsed.primaryAffiliation) {
      return {
        hasRequiredFields: false,
        error: {
          message:
            "'Primary Affiliation' field is required for non-Uoa candidates, and must not be null or empty",
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
  } else {
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
    primaryAffiliation: parsed.primaryAffiliation!,
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
    upi: parsed.upi!,
    studentId: parsed.studentId!,
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

    upi: parsed.upi!,
    studentId: parsed.studentId!,
    faculty: parsed.faculty!,
    programme: parsed.programme!,
    yearLevel: parsed.yearLevel!,
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
