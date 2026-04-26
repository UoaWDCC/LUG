"use server";

import { redirect } from "next/navigation";

export async function createRegistrationForm(formData: FormData) {
  const page = formData.get("page") as string;

  const email = formData.get("email");
  const previouslyRegistered = formData.get("previouslyRegistered");

  let nextPage;
  if (page === "start" || page === null) {
    nextPage = "final";
  } else {
    nextPage = "start";
  }

  console.log("New Registration Attempt:", { email, previouslyRegistered });

  // redirect("/form/success");
  redirect(`/form?page=${nextPage}`);
}
