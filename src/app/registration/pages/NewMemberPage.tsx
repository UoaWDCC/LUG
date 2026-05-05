export function NewMemberPage() {
  return (
    <>
      <h2>Name & University Status</h2>

      <div>
        <label htmlFor="firstName">What is your first name?*</label>
        <input
          name="firstName"
          id="firstName"
          type="text"
          placeholder="Your answer"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">And your last name?*</label>
        <p>If you do not have a last name, type N/A.</p>
        <input
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Your answer"
          required
        />
      </div>

      <fieldset>
        <legend>Do you attend The University of Auckland (UoA)?*</legend>
        <div>
          <label>
            <input
              type="radio"
              name="isCurrentUoaStudent"
              value="yes"
              required
            />
            Yes
          </label>

          <label>
            <input type="radio" name="isCurrentUoaStudent" value="no" />
            No
          </label>
        </div>
      </fieldset>
    </>
  );
}
