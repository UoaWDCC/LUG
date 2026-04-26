export function ReturningUoaPage() {
  return (
    <>
      <h2>Returning UoA Students</h2>
      <p>
        We have two questions from you in this section, and then a few more
        questions to wrap things up.
      </p>

      <input type="hidden" name="page" value="returningUoa" />

      <div>
        <p>What is your username/UPI?</p>
        <p>i.e. jbon007</p>
        <label htmlFor="upi">UPI</label>
        <input name="upi" id="upi" type="upi" required />
      </div>

      <div>
        <p>And your student ID?</p>
        <p>i.e. 825179213</p>
        <label htmlFor="studentId">student ID</label>
        <input name="studentId" id="studentId" type="studentId" required />
      </div>

      <div>
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
