import { getPrisma } from "../lib/db/prisma";

export async function createMembershipRegistration(
  registration: MemberRegistration,
) {
  const memberData = toMemberCreateInput(registration);
  try {
    await getPrisma().member.create({ data: memberData });
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { ok: false, error: { type: "duplicate" } };
      }
    }

    return { ok: false, error: { type: "database" } };
  }
}

function toMemberCreateInput(
  registration: MemberRegistration,
): MemberCreateInput {
  const memberData = {
    // unconditonal fields
    firstName: registration.firstName,
    lastName: registration.lastName,
    email: registration.email,
    linuxSkillLevel: registration.linuxSkillLevel,
    potentialInvolvement: registration.potentialInvolvement,
    discordUsername: registration.discordUsername,

    // shared conditional field
    isConditionalReturningMember: registration.isEligibleReturningUoaStudent,
  };

  const conditionalData = // non-shared conditional fields
    registration.isEligibleReturningUoaStudent === true
      ? {
          faculty: [],
          upi: registration.upi,
          studentId: registration.studentId,
          isCurrentUoaStudent: registration.isCurrentUoaStudent,
        }
      : registration.isCurrentUoaStudent === true
        ? {
            faculty: registration.faculty,
            programme: registration.programme,
            yearLevel: registration.yearLevel,
            upi: registration.upi,
            studentId: registration.studentId,
            isCurrentUoaStudent: registration.isCurrentUoaStudent,
          }
        : {
            faculty: [],
            primaryAffiliation: registration.primaryAffiliation,
            nonUoaExcerpt: registration.nonUoaExcerpt,
            nonUoaPitch: registration.nonUoaPitch,
            isCurrentUoaStudent: registration.isCurrentUoaStudent,
          };

  return { ...memberData, ...conditionalData };
}
