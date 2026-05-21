import { getPrisma } from "../lib/db/prisma";

export async function createMembershipRegistration(
  registration: MemberRegistration,
) {
  const memberData = toMemberCreateInput(registration);

  try {
    await getPrisma().member.create({ data: memberData });
    return Response.json({ ok: true });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return Response.json({ ok: false, error: { type: "duplicate" } });
      }
    }

    return Response.json({ ok: false, error: { type: "database" } });
  }
}

function toMemberCreateInput(registration: MemberRegistration) {
  const memberData = {
    // unconditonal fields
    firstName: registration.firstName,
    lastName: registration.lastName,
    email: registration.email,
    linuxSkillLevel: registration.linuxSkillLevel,
    potentialInvolvement: registration.potentialInvolvement,
    discordUsername: registration.discordUsername,

    // shared conditional fields
    isConditionalReturningMember: registration.isEligibleReturningUoaStudent,
    isCurrentUoaStudent: registration.isCurrentUoaStudent,
  };

  const conditionalData = // non-shared conditional fields
    registration instanceof CurrentUoaStudentMember
      ? {
          faculty: registration.faculty,
          programme: registration.programme,
          yearLevel: registration.yearLevel,
          upi: registration.upi,
          studentId: registration.studentId,
        }
      : registration instanceof ConditionalReturningMember
        ? {
            faculty: [],
            upi: registration.upi,
            studentId: registration.studentId,
          }
        : {
            faculty: [],
            primaryAffiliation: registration.primaryAffiliation,
            nonUoaExcerpt: registration.nonUoaExcerpt,
            nonUoaPitch: registration.nonUoaPitch,
          };
  return { memberData, conditionalData };
}
