"use server";

import { redirect } from "next/navigation";

export async function createRegistrationForm(formData: FormData) {
  const page = formData.get("page") as string;

  const email = formData.get("email");
  const previouslyRegistered = formData.get("previouslyRegistered");

  let nextPage;
  switch (page) {
    case "start":
      const returning = formData.get("previouslyRegistered") as string;
      nextPage = returning === "yes" ? "returningUoa" : "newMember";
      break;
    case "returningUoa":
      nextPage = "final";
      break;
    case "newMember":
      const attendsUoa = formData.get("attendUoa") as string;
      nextPage = attendsUoa === "yes" ? "newUoa" : "newOther";
      break;
    case "newUoa":
      nextPage = "final";
      break;
    case "newOther":
      nextPage = "final";
      break;
    case "final":
      // redirect to success page
      break;
    default:
      break;
  }

  console.log("New Registration Attempt:", { email, previouslyRegistered });

  // redirect("/form/success");
  redirect(`/form?page=${nextPage}`);
}
