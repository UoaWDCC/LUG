"use client";

import { useFormError } from "../RegistrationForm";

export function NewNonUoaPage() {
  const state = useFormError();

  return (
    <>
      <h2>Your affiliation</h2>

      <div>
        <label htmlFor="primaryAffiliation">
          What institution or organisation are you affiliated with the most?*
        </label>
        <p>
          This can be the name of your university, your company, your research
          lab, etc.
        </p>
        <input
          name="primaryAffiliation"
          id="primaryAffiliation"
          type="text"
          placeholder="Your answer"
          defaultValue={state?.fields?.primaryAffiliation || ""}
          required
        />
      </div>

      <div>
        <label htmlFor="nonUoaExcerpt"> Tell us more about yourself</label>
        <p>
          A nice excerpt about yourself can allow us to identify you in future
          club events.
        </p>
        <textarea
          name="nonUoaExcerpt"
          id="nonUoaExcerpt"
          placeholder="Your answer"
          defaultValue={state?.fields?.nonUoaExcerpt || ""}
        />
      </div>

      <div>
        <label htmlFor="nonUoaPitch"> Why do you want to join our club?</label>
        <p>Here is your chance to pitch yourself to us!</p>
        <textarea
          name="nonUoaPitch"
          id="nonUoaPitch"
          placeholder="Your answer"
          defaultValue={state?.fields?.nonUoaPitch || ""}
        />
      </div>
    </>
  );
}
