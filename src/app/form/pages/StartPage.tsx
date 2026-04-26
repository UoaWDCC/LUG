export function StartPage() {
  return (
    <>
      <input type="hidden" name="page" value="start" />

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
            You previously gave us your UPI or Student ID when registering your
            interest in 2025
          </li>
          <li>
            You have not changed your programme of study since your last
            application
          </li>
        </ul>

        <p>
          <i>
            {"If you are signing up for the first time, you should select 'no'"}
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

      {/* <button type="submit">Submit</button> */}
    </>
  );
}
