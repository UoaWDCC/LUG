"use server";

import { redirect } from "next/navigation";

// 1. Update the type to include 'fields'
export type FormState = {
  error?: string;
  fields?: {
    email?: string;
    previouslyRegistered?: string;
  };
} | null;

export async function createRegistrationForm(
  prevState: FormState,
  formData: FormData,
) {
  const page = formData.get("page") as string;

  const email = formData.get("email") as string;
  const previouslyRegistered = formData.get("previouslyRegistered") as string;

  let nextPage: string = "start";

  switch (page) {
    case "start":
      // Check Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        return {
          error: "Please enter a valid email address (e.g., name@example.com).",
          fields: { email, previouslyRegistered },
        };
      }

      if (!previouslyRegistered) {
        return {
          error: "Please select whether you have registered previously.",
          fields: { email }, // Keep the email so they don't have to re-type it
        };
      }

      nextPage = previouslyRegistered === "yes" ? "returningUoa" : "newMember";
      break;

    case "newMember":
      const attendsUoa = formData.get("attendUoa") as string;
      if (!attendsUoa) {
        return {
          error: "Please select an option.",
          fields: { email, previouslyRegistered },
        };
      }
      nextPage = attendsUoa === "yes" ? "newUoa" : "newOther";
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
  redirect(`/form?page=${nextPage}`);
}
