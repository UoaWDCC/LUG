export type LinuxSkillLevel =
  | "no_experience"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type PotentialInvolvement =
  | "attending_events"
  | "volunteering"
  | "presenting_talks"
  | "helping_with_workshops"
  | "committee"
  | "other";

export type YearLevel =
  | "year_1"
  | "year_2"
  | "year_3"
  | "year_4"
  | "postgraduate"
  | "other";

//shared base fields present on every registration path
export type BaseMemberRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  linuxSkillLevel: LinuxSkillLevel;
  potentialInvolvement: PotentialInvolvement[];
};

//case1: if memeber is returning - Registration path 1
export type ConditionalReturningMember = BaseMemberRegistration & {
  memberType: "conditional_returning";
  uoaStudentId: string;
};

//case2: if memeber is current UoA student- Current UoA student member
export type CurrentUoaStudentMember = BaseMemberRegistration & {
  memberType: "current_uoa_student";
  uoaStudentId: string;
  yearLevel: YearLevel;
  degreeOrMajor: string;
};

//case3: if member not a current UoA student - Registration path 3
export type NonCurrentUoaStudentMember = BaseMemberRegistration & {
  memberType: "non_current_uoa_student";
  affiliation: string;
};

//the single type used everywhere a registration is handled - Union
export type MemberRegistration =
  | ConditionalReturningMember
  | CurrentUoaStudentMember
  | NonCurrentUoaStudentMember;
