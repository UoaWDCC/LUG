export default function FormPage() {
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

      <form className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="email" required />
        </div>

        <fieldset>
          <legend>
            Have you registered with us previously and meet the following
            conditions?
          </legend>

          <ul>
            <li>You are a current student at the University of Auckland</li>
            <li>
              You previously gave us your UPI or Student ID when registering
              your interest in 2025
            </li>
            <li>
              You have not changed your programme of study since your last
              application
            </li>
          </ul>

          <p>
            <i>
              {
                "If you are signing up for the first time, you should select 'no'"
              }
            </i>
          </p>

          <div>
            <label>
              <input
                type="radio"
                name="previouslyRegistered"
                value="yes"
                required
              />
              Yes
            </label>

            <label>
              <input type="radio" name="previouslyRegistered" value="no" />
              No
            </label>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
