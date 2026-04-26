export function NewUoaPage() {
  return (
    <>
      <h2>Your student details with The University of Auckland</h2>
      <p>
        {
          "As a registered club at the University of Auckland, we are required to collect information about our members who are UoA students or staff."
        }
      </p>

      <input type="hidden" name="page" value="newUoa" />

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
        <p>
          {
            "What faculty or faculties are you enrolled in? If we miss your faculty, let us know!"
          }
        </p>
      </div>

      <div>
        <p>checkbox placeholder</p>
      </div>

      <div>
        <p>{"What is your current year of study?"}</p>
        <p>
          {
            "Note to those who have progressed from one degree to another at UoA (e.g. from undergrad to postgrad, from one Bachelor degree to another): Your year of study is based on your current degree, not the total number of years that you have accumulated at UoA.  For instance, if it is your first year doing a Master's degree after doing a Bachelor's degree, then you are at your 1st Year."
          }
        </p>
        <div>
          <label>
            <input type="radio" name="firstYear" value="yes" required />
            1st Year
          </label>

          <label>
            <input type="radio" name="secondYear" value="no" />
            2nd Year placeholder
          </label>
        </div>
      </div>
    </>
  );
}
