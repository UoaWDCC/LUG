"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type RegistrationPage =
  | "start"
  | "returningUoa"
  | "newMember"
  | "newUoa"
  | "newNonUoa"
  | "final";

type RegistrationDraft = {
  page: RegistrationPage;
  pageStack: RegistrationPage[];

  // Start page
  email?: string;
  isConditionalReturningMember?: string;

  // New member page
  firstName?: string;
  lastName?: string;
  isCurrentUoaStudent?: string;

  // Returning/current UoA fields
  upi?: string;
  studentId?: string;

  // Current UoA only
  faculty?: string[];
  programme?: string;
  yearLevel?: string;

  // Non-UoA only
  primaryAffiliation?: string;
  nonUoaExcerpt?: string;
  nonUoaPitch?: string;

  // Final page
  linuxSkillLevel?: string;
  potentialInvolvement?: string[];
  discordUsername?: string;
};

export type RegistrationFormState = {
  error?: string;
  fields?: Partial<RegistrationDraft>;
} | null;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/registration",
};

export async function submitRegistrationStep(
  prevState: RegistrationFormState,
  formData: FormData,
) {
  const cookieStore = await cookies();

  // Load previously saved data
  let prev: Partial<RegistrationDraft> = {};
  try {
    const raw = cookieStore.get("formState")?.value;
    if (raw) prev = JSON.parse(raw);
  } catch {}

  // Handle back navigation if required
  const intent = formData.get("intent") as string;
  if (intent == "back" && prev.pageStack) {
    const stack = prev.pageStack ?? [];
    const goTo = stack.at(-1) ?? "start";
    const newDraft = { ...prev, page: goTo, pageStack: stack.slice(0, -1) };

    cookieStore.set("formState", JSON.stringify(newDraft), COOKIE_OPTIONS);
    redirect("/registration");
  }

  const page = formData.get("page") as RegistrationPage;
  let nextPage: RegistrationPage = "start";
  let stepData: Partial<RegistrationDraft> = {};

  // Validate data based on page
  switch (page) {
    case "start": {
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

      stepData = { email, isConditionalReturningMember };
      nextPage =
        isConditionalReturningMember === "yes" ? "returningUoa" : "newMember";
      break;
    }
    case "newMember": {
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const isCurrentUoaStudent = formData.get("isCurrentUoaStudent") as string;

      if (!firstName || !lastName || !isCurrentUoaStudent) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      stepData = { firstName, lastName, isCurrentUoaStudent };
      nextPage = isCurrentUoaStudent === "yes" ? "newUoa" : "newNonUoa";
      break;
    }
    case "newUoa": {
      const upi = formData.get("upi") as string;
      const studentId = formData.get("studentId") as string;
      const faculty = formData.getAll("faculty") as string[];
      const programme = formData.get("programme") as string;
      const yearLevel = formData.get("yearLevel") as string;

      const upiRegex = /^[a-z]{3,4}\d{3}$/i;
      const studentIdRegex = /^\d{9,10}$/;

      if (
        !upi ||
        !upiRegex.test(upi) ||
        !studentId ||
        !studentIdRegex.test(studentId) ||
        faculty.length == 0 ||
        !programme ||
        !yearLevel
      ) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      stepData = { upi, studentId, faculty, programme, yearLevel };
      nextPage = "final";
      break;
    }
    case "newNonUoa": {
      const primaryAffiliation = formData.get("primaryAffiliation") as string;
      const nonUoaExcerpt = formData.get("nonUoaExcerpt") as string;
      const nonUoaPitch = formData.get("nonUoaPitch") as string;

      if (!primaryAffiliation) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      stepData = { primaryAffiliation, nonUoaExcerpt, nonUoaPitch };
      nextPage = "final";
      break;
    }
    case "returningUoa": {
      const upi = formData.get("upi") as string;
      const studentId = formData.get("studentId") as string;

      const upiRegex = /^[a-z]{3,4}\d{3}$/i;
      const studentIdRegex = /^\d{9,10}$/;

      if (
        !upi ||
        !upiRegex.test(upi) ||
        !studentId ||
        !studentIdRegex.test(studentId)
      ) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      stepData = { upi, studentId };
      nextPage = "final";
      break;
    }
    case "final": {
      const linuxSkillLevel = formData.get("linuxSkillLevel") as string;
      const potentialInvolvement = formData.getAll(
        "potentialInvolvement",
      ) as string[];
      const discordUsername = formData.get("discordUsername") as string;

      if (!linuxSkillLevel) {
        return {
          error: "Please select an option.",
          fields: {},
        };
      }

      // Strip page from final draft
      const { page, ...draftFields } = prev;

      // Merge final step data with full draft
      const fullDraft: Partial<RegistrationDraft> = {
        ...draftFields,
        linuxSkillLevel,
        potentialInvolvement,
        discordUsername,
      };

      // Final submission logic
      console.log("Finalizing registration for:", fullDraft);

      cookieStore.delete({ name: "formState", path: "/registration" });
      redirect("/success");
      break;
    }
    default:
      nextPage = "start";
      break;
  }

  // merge
  const newDraft: Partial<RegistrationDraft> = {
    ...prev,
    ...stepData,
    pageStack: [...(prev.pageStack ?? []), page],
    page: nextPage,
  };

  // Save data to cookie
  cookieStore.set("formState", JSON.stringify(newDraft), COOKIE_OPTIONS);

  // Redirect to the next step
  redirect("/registration");
}
