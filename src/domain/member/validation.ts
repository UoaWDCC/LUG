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
  const requiredFields = validateRequiredFields(parsedRegistrationForm);
  if (requiredFields.hasRequiredFields === false) {
    return { ok: false, error: requiredFields.error };
  }

  const fieldContent = validateFieldValues(parsedRegistrationForm);
  if (fieldContent.fieldsValid === false) {
    return { ok: false, error: fieldContent.error };
  }

  return { ok: true, data: toMemberRegistration(parsedRegistrationForm) };
}

//validate if required fields exist and are not null/empty string/undefined etc.
function validateRequiredFields(
  parsed: ParsedRegistrationFormSubmission,
):
  | { hasRequiredFields: true }
  | { hasRequiredFields: false; error: RegistrationFormValidationError } {
  //Base fields required by all registrations
  const baseRequiredFields = validateBaseRequiredFields(parsed);
  if (baseRequiredFields.hasRequiredFields === false) {
    return baseRequiredFields;
  }

  const conditionalRequiredFields =
    validateRegistrationPathRequiredFields(parsed);
  if (conditionalRequiredFields.hasRequiredFields === false) {
    return conditionalRequiredFields;
  }

  return { hasRequiredFields: true };
}

function validateBaseRequiredFields(
  parsed: ParsedRegistrationFormSubmission,
):
  | { hasRequiredFields: true }
  | { hasRequiredFields: false; error: RegistrationFormValidationError } {
  const requiredFields: string[] = [
    "firstName",
    "lastName",
    "email",
    "linuxSkillLevel",
    "potentialInvolvement",
    "isConditionalReturningMember",
  ];
  const errorDisplayNames: string[] = [
    "First name",
    "Last name",
    "Email",
    "Linux skill level",
    "Potential involvement",
    "Is Conditional Returning Member",
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
  return { hasRequiredFields: true };
}

function validateRegistrationPathRequiredFields(
  parsed: ParsedRegistrationFormSubmission,
):
  | { hasRequiredFields: true }
  | { hasRequiredFields: false; error: RegistrationFormValidationError } {
  //check if the value of isConditionalReturningMember and isCurrentUoaStudent is valid.
  //It is a validity check(thus should be in validateFields function) but is required for the following checks so is moved here.
  if (
    !["true", "false"].includes(parsed.isConditionalReturningMember as string)
  ) {
    return {
      hasRequiredFields: false,
      error: {
        message: `isConditionalReturningMember field has value: '${parsed.isConditionalReturningMember}', must either have value 'true' or 'false'`,
      },
    };
  }

  // If Conditional Returning Member is false, then isCurrentUoaStudent becomes a required field
  if (parsed.isConditionalReturningMember === "false") {
    if (!("isCurrentUoaStudent" in parsed) || !parsed.isCurrentUoaStudent) {
      return {
        hasRequiredFields: false,
        error: {
          message:
            "'isCurrentUoaStudent' field is required if not a Conditional Returning Member",
        },
      };
    }
    if (!["true", "false"].includes(parsed.isCurrentUoaStudent as string)) {
      return {
        hasRequiredFields: false,
        error: {
          message: `isCurrentUoaStudent field has value: '${parsed.isCurrentUoaStudent}', must either have value 'true' or 'false'`,
        },
      };
    }
  }

  // Further check for fields that are only required if specific conditions are met
  if (parsed.isConditionalReturningMember === "true") {
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
  } else if (parsed.isCurrentUoaStudent === "true") {
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

    //Extra check for if faculty is empty, at this point existence of faculty field is verified.
    if (parsed.faculty!.length === 0) {
      return {
        hasRequiredFields: false,
        error: {
          message: "'faculty' field must not be an empty array",
        },
      };
    }
  } else if (parsed.isCurrentUoaStudent === "false") {
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

function validateFieldValues(
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
  if (!isLinuxSkillLevel(parsed.linuxSkillLevel)) {
    return {
      fieldsValid: false,
      error: {
        message: `linuxSkillLevel property has invalid value: '${parsed.linuxSkillLevel}'`,
      },
    };
  }
  for (const option of parsed.potentialInvolvement) {
    if (!isPotentialInvolvement(option)) {
      return {
        fieldsValid: false,
        error: {
          message: `potentialInvolvement field contains a selection with invalid value: '${option}'`,
        },
      };
    }
  }

  if (
    parsed.isConditionalReturningMember === "true" ||
    parsed.isCurrentUoaStudent === "true"
  ) {
    if (!isValidUPI(parsed.upi!)) {
      return {
        fieldsValid: false,
        error: {
          message: `upi invalid: '${parsed.upi}', please enter a valid upi`,
        },
      };
    }
  }
  if (parsed.isCurrentUoaStudent === "true") {
    if (!isYearLevel(parsed.yearLevel)) {
      return {
        fieldsValid: false,
        error: {
          message: `yearLevel property has invalid value: ${parsed.yearLevel}`,
        },
      };
    }
  }

  return { fieldsValid: true };
}

function toMemberRegistration(
  parsedForm: ParsedRegistrationFormSubmission,
): MemberRegistration {
  if (parsedForm.isConditionalReturningMember === "true") {
    return toConditionalReturningMember(parsedForm);
  } else if (parsedForm.isCurrentUoaStudent === "true") {
    return toCurrentUoaStudentMember(parsedForm);
  } else {
    return toNonCurrentUoaStudentMember(parsedForm);
  }
}

function toConditionalReturningMember(
  parsed: ParsedRegistrationFormSubmission,
): ConditionalReturningMember {
  const returningMember: ConditionalReturningMember = {
    ...toBaseMemberRegistration(parsed),
    isConditionalReturningMember: true,
    upi: parsed.upi!,
    studentId: parsed.studentId!,
  };
  return returningMember;
}

function toCurrentUoaStudentMember(
  parsed: ParsedRegistrationFormSubmission,
): CurrentUoaStudentMember {
  const uoaMember: CurrentUoaStudentMember = {
    ...toBaseMemberRegistration(parsed),
    isConditionalReturningMember: false,
    isCurrentUoaStudent: true,

    upi: parsed.upi!,
    studentId: parsed.studentId!,
    faculty: parsed.faculty!,
    programme: parsed.programme!,
    yearLevel: parsed.yearLevel!,
  };
  return uoaMember;
}
function toNonCurrentUoaStudentMember(
  parsed: ParsedRegistrationFormSubmission,
): NonCurrentUoaStudentMember {
  const nonUoaMember: NonCurrentUoaStudentMember = {
    ...toBaseMemberRegistration(parsed),
    isConditionalReturningMember: false,
    isCurrentUoaStudent: false,
    primaryAffiliation: parsed.primaryAffiliation!,
    ...(parsed.nonUoaExcerpt != null
      ? { nonUoaExcerpt: parsed.nonUoaExcerpt }
      : {}),
    ...(parsed.nonUoaPitch != null ? { nonUoaPitch: parsed.nonUoaPitch } : {}),
  };
  return nonUoaMember;
}

function toBaseMemberRegistration(
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

function isLinuxSkillLevel(value: string | null): value is LinuxSkillLevel {
  return (
    value != null && validLinuxSkillLevel.includes(value as LinuxSkillLevel)
  );
}

function isYearLevel(value: string | null): value is YearLevel {
  return value != null && validYearLevel.includes(value as YearLevel);
}

function isPotentialInvolvement(
  value: string | null,
): value is PotentialInvolvement {
  return (
    value != null &&
    validPotentialInvolvement.includes(value as PotentialInvolvement)
  );
}
