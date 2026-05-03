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
        <p>What is your username/UPI?*</p>
        <p>i.e. jbon007</p>
        <label htmlFor="upi" />
        <input
          name="upi"
          id="upi"
          type="text"
          placeholder="Your answer"
          pattern="[a-z]{3,4}[0-9]{3}"
          required
        />
      </div>

      <div>
        <p>And your student ID?*</p>
        <p>i.e. 825179213</p>
        <label htmlFor="studentId" />
        <input
          name="studentId"
          id="studentId"
          type="text"
          placeholder="Your answer"
          pattern="[0-9]{9,10}"
          required
        />
      </div>
    </>
  );
}
