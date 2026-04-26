"use server";

import { redirect } from "next/navigation";

export async function createRegistrationForm(formData: FormData) {
  const email = formData.get("email");
  const previouslyRegistered = formData.get("previouslyRegistered");

  console.log("New Registration Attempt:", { email, previouslyRegistered });

  redirect("/form/success");
}
