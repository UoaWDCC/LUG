"use server";

import { redirect } from "next/navigation";

export type FormState = {
  error?: string;
  fields?: {
    firstName?: string;
    lastName?: string;
    email?: string;

    isConditionalReturningMember?: string;

    isCurrentUoaStudent?: string;

    // UoA student fields
    upi?: string;
    studentId?: string;

    // Only for current UoA members
    faculty?: string[];
    programme?: string;
    yearLevel?: string;

    // Only for non-UoA students
    primaryAffiliation?: string;
    nonUoaExcerpt?: string;
    nonUoaPitch?: string;

    // Final questions for everyone
    linuxSkillLevel?: string;
    potentialInvolvement?: string;
    discordUsername?: string;
  };
} | null;

export async function submitRegistrationStep(
  prevState: FormState,
  formData: FormData,
) {
  const page = formData.get("page") as string;

  const email = formData.get("email") as string;
  const isConditionalReturningMember = formData.get(
    "isConditionalReturningMember",
  ) as string;

  let nextPage: string = "start";

  switch (page) {
    case "start":
      // Check Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        return {
          error: "Please enter a valid email address (e.g., name@example.com).",
          fields: { email, isConditionalReturningMember },
        };
      }

      if (!isConditionalReturningMember) {
        return {
          error: "Please select whether you have registered previously.",
          fields: { email }, // Keep the email so they don't have to re-type it
        };
      }

      nextPage =
        isConditionalReturningMember === "yes" ? "returningUoa" : "newMember";
      break;

    case "newMember":
      const isCurrentUoaStudent = formData.get("isCurrentUoaStudent") as string;
      if (!isCurrentUoaStudent) {
        return {
          error: "Please select an option.",
          fields: { email, isConditionalReturningMember },
        };
      }
      nextPage = isCurrentUoaStudent === "yes" ? "newUoa" : "newOther";
      break;

    case "returningUoa":
    case "newUoa":
    case "newOther":
      nextPage = "final";
      break;

    case "final":
      // Final submission logic
      console.log("Finalizing registration for:", email);
      redirect("/success");
      break;

    default:
      nextPage = "start";
      break;
  }

  // Redirect to the next step
  redirect(`/registration?page=${nextPage}`);
}
