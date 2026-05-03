"use client";
import { createContext, useContext, useActionState } from "react";
import { createRegistrationForm, FormState } from "./actions";

const FormStateContext = createContext<FormState>(null);

export function RegistrationForm({
  currentPage,
  children,
}: {
  currentPage: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(createRegistrationForm, null);

  return (
    <FormStateContext.Provider value={state}>
      <form action={formAction} noValidate className="flex flex-col gap-6">
        <input type="hidden" name="page" value={currentPage} />
        {children}
        <button
          type="submit"
          className="self-start px-6 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormStateContext.Provider>
  );
}

export const useFormError = () => useContext(FormStateContext);
