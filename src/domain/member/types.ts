export type LinuxSkillLevel =
  | "NOTHING"
  | "AWARE_OF_EXISTENCE"
  | "BEGINNER_USER"
  | "REGULAR_USER"
  | "POWER_USER"
  | "CONTRIBUTOR";

export type PotentialInvolvement =
  | "ATTENDING"
  | "SPEAKING"
  | "EXECUTIVE"
  | "PROJECTS";

export type YearLevel =
  | "FIRST_YEAR"
  | "SECOND_YEAR"
  | "THIRD_YEAR"
  | "FOURTH_YEAR"
  | "FIFTH_YEAR_OR_LATER"
  | "GRADUATED_WITHIN_2_YEARS"; // was "POSTGRADUATE" - corrected using the Prisma schema

// Shared base fields present on every registration path
export type BaseMemberRegistration = {
  firstName: string;
  lastName: string;
  email: string;

  discordUsername?: string; //the missing field
  linuxSkillLevel: LinuxSkillLevel;
  potentialInvolvement: PotentialInvolvement[];
};

// Case 1: Returning member - Registration path 1
export type ConditionalReturningMember = BaseMemberRegistration & {
  memberType: "RETURNING";
  isConditionalReturningMember: true;
  upi?: string;
  studentId?: string;
};

// Case 2: Current UoA student - Registration path 2
export type CurrentUoaStudentMember = BaseMemberRegistration & {
  memberType: "CURRENT_UOA_STUDENT";
  isCurrentUoaStudent: true;
  upi?: string;
  studentId?: string;
  faculty: string[];
  programme?: string;
  yearLevel: YearLevel;
};

// Case 3: Non-current UoA student - Registration path 3
export type NonCurrentUoaStudentMember = BaseMemberRegistration & {
  memberType: "NON_CURRENT_UOA_STUDENT";
  isCurrentUoaStudent: false;
  primaryAffiliation?: string;
  nonUoaExcerpt?: string;
  nonUoaPitch?: string;
};

// Union type used everywhere a registration is handled
export type MemberRegistration =
  | ConditionalReturningMember
  | CurrentUoaStudentMember
  | NonCurrentUoaStudentMember;
