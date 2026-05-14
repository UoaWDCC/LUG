"use client";
import { createContext, useContext, useActionState } from "react";
import { submitRegistrationStep, RegistrationFormState } from "./actions";

const FormStateContext = createContext<RegistrationFormState>(null);

export function RegistrationForm({
  currentPage,
  children,
}: {
  currentPage: string;
  children: React.ReactNode;
}) {
  const [state, submitAction] = useActionState(submitRegistrationStep, null);

  return (
    <FormStateContext.Provider value={state}>
      <form action={submitAction} noValidate className="flex flex-col gap-6">
        <input type="hidden" name="page" value={currentPage} />

        {/* Generic Error Message */}
        {state?.error && (
          <div role="alert" style={{ color: "red" }}>
            <strong>Error:</strong> {state.error}
          </div>
        )}

        {children}
        <button
          type="submit"
          name="intent"
          value="back"
          className="self-start px-6 py-2 bg-green-600 text-white rounded"
        >
          Prev
        </button>

        <button
          type="submit"
          name="intent"
          value="submit"
          className="self-start px-6 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormStateContext.Provider>
  );
}

export const useFormError = () => useContext(FormStateContext);
