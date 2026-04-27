export function NewMemberPage() {
  return (
    <>
      <h2>Name & University Status</h2>

      <input type="hidden" name="page" value="newMember" />

      <div>
        <p>What is your first name?*</p>
        <label htmlFor="firstName" />
        <input
          name="firstName"
          id="firstName"
          type="text"
          placeholder="Your answer"
          required
        />
      </div>

      <div>
        <p>And your last name?*</p>
        <p>If you do not have a last name, type N/A.</p>
        <label htmlFor="lastName" />
        <input
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Your answer"
          required
        />
      </div>

      <div>
        <p>{"Do you attend The University of Auckland (UoA)?*"}</p>
        <label>
          <input type="radio" name="attendUoa" value="yes" required />
          Yes
        </label>

        <label>
          <input type="radio" name="attendUoa" value="no" />
          No
        </label>
      </div>
    </>
  );
}
