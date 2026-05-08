"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type FormState = {
  error?: string;
  fields?: {
    firstName?: string;
    lastName?: string;
    email?: string;

    isConditionalReturningMember?: string;

    // Asked for non-conditional-returning members
    isCurrentUoaStudent?: string;

    // UoA student fields
    upi?: string;
    studentId?: string;

    // Only for current UoA members
    faculty?: string[];
    programme?: string;
    yearLevel?: string;

    // Only for non-UoA students
    primaryAffiliation?: string[];
    nonUoaExcerpt?: string;
    nonUoaPitch?: string;

    // Final questions for everyone
    linuxSkillLevel?: string;
    potentialInvolvement?: string;
    discordUsername?: string;
  };
} | null;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/registration",
};

export async function submitRegistrationStep(
  prevState: FormState,
  formData: FormData,
) {
  const cookieStore = await cookies();

  // Load previously saved data
  const raw = cookieStore.get("formState")?.value;
  const prev = raw ? JSON.parse(raw) : {};

  const page = formData.get("page") as string;

  const { page: _, ...fields } = Object.fromEntries(formData); // strip page field
  const newData = { ...prev, ...fields }; // merge old and new data

  let nextPage: string = "start";

  switch (page) {
    case "start":
      // Get required inputs
      const email = formData.get("email") as string;
      const isConditionalReturningMember = formData.get(
        "isConditionalReturningMember",
      ) as string;

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
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const isCurrentUoaStudent = formData.get("isCurrentUoaStudent") as string;

      if (!firstName || !lastName || !isCurrentUoaStudent) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      nextPage = isCurrentUoaStudent === "yes" ? "newUoa" : "newOther";
      break;

    case "newUoa": {
      const upi = formData.get("upi") as string;
      const studentId = formData.get("studentId") as string;
      const faculties = formData.getAll("faculty") as string[];
      const programme = formData.get("programme") as string;
      const yearLevel = formData.get("yearLevel") as string;

      if (
        !upi ||
        !studentId ||
        faculties.length == 0 ||
        !programme ||
        !yearLevel
      ) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      nextPage = "final";
      break;
    }
    case "newOther":
      const primaryAffiliation = formData.get("primaryAffiliation") as string;

      if (!primaryAffiliation) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      nextPage = "final";
      break;

    case "returningUoa": {
      const upi = formData.get("upi") as string;
      const studentId = formData.get("studentId") as string;

      if (!upi || !studentId) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      nextPage = "final";
      break;
    }
    case "final":
      const linuxSkillLevel = formData.get("linuxSkillLevel") as string;

      if (!linuxSkillLevel) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      // Final submission logic
      console.log("Finalizing registration for:", newData.email);
      cookieStore.delete({ name: "formState", path: "/registration" });
      redirect("/success");
      break;

    default:
      nextPage = "start";
      break;
  }

  // Save data to cookie
  cookieStore.set(
    "formState",
    JSON.stringify({ ...newData, page: nextPage }),
    COOKIE_OPTIONS,
  );

  // Redirect to the next step
  redirect("/registration");
}
