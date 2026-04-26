import { createRegistrationForm } from "./actions";
import { StartPage } from "./pages/StartPage";
import { ReturningUoaPage } from "./pages/ReturningUoaPage";
import { NewMemberPage } from "./pages/NewMemberPage";
import { NewUoaPage } from "./pages/NewUoaPage";
import { NewOtherPage } from "./pages/NewOtherPage";
import { FinalPage } from "./pages/FinalPage";

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "start" } = await searchParams;

  return (
    <section className="max-w-2xln border-2 border-green-500">
      <h1>LUG@UoA Member Registration Form 2026</h1>
      <p>{`Thank you for registering your interest to become a member of the
          University of Auckland Linux User Group (also known as LUG@UoA)! It's
          great to have you with us. The details collected in this form will be
          used for record-keeping purposes as mandated by Student Groups and to
          send you relevant communication about the user group, as well as to
          identify areas of interest for the club. We will not otherwise use or
          transfer your information. You can modify or withdraw your response by
          contacting lug.aucklanduni@gmail.com.`}</p>

      <form action={createRegistrationForm}>
        <input type="hidden" name="page" value={page} />

        {page === "start" && <StartPage />}
        {page === "returningUoa" && <ReturningUoaPage />}
        {page === "newMember" && <NewMemberPage />}
        {page === "newUoa" && <NewUoaPage />}
        {page === "newOther" && <NewOtherPage />}
        {page === "final" && <FinalPage />}

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
