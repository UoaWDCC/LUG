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
        <p>What is your username/UPI?*</p>
        <p>i.e. jbon007</p>
        <label htmlFor="upi" />
        <input
          name="upi"
          id="upi"
          type="text"
          placeholder="Your answer"
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
          required
        />
      </div>

      <div>
        <p>{"What faculty or faculties are you enrolled in?*"}</p>
        <p>If we miss your faculty, let us know!</p>

        <div>
          <label>
            <input type="checkbox" name="faculties" value="engineeringDesign" />
            Faculty of Engineering & Design
          </label>

          <label>
            <input type="checkbox" name="faculties" value="science" />
            Faculty of Science
          </label>

          <label>
            <input type="checkbox" name="faculties" value="artsEducation" />
            Faculty of Arts & Education
          </label>

          <label>
            <input type="checkbox" name="faculties" value="business" />
            Business School
          </label>

          <label>
            <input type="checkbox" name="faculties" value="law" />
            Auckland Law School
          </label>

          <label>
            <input
              type="checkbox"
              name="faculties"
              value="medicalHealthScience"
            />
            Faculty of Medical and Health Sciences
          </label>

          <label>
            <input type="checkbox" name="faculties" value="liggins" />
            Liggins Institute
          </label>

          <label>
            <input type="checkbox" name="faculties" value="bioengineering" />
            Auckland Bioengineering Institute
          </label>

          <label>
            <input type="checkbox" name="faculties" value="other" />
            Other
          </label>
          <input type="text" name="otherFaculty" />
        </div>
      </div>

      <div>
        <p>What is your current programme of study?*</p>
        <p>
          e.g. Bachelor of Engineering (Honours), Bachelor of Science, Master of
          Arts, etc.
        </p>
        <label htmlFor="programme" />
        <input
          name="programme"
          id="programme"
          type="text"
          placeholder="Your answer"
          required
        />
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
            <input type="radio" name="studyYear" value="year1" required />
            1st Year
          </label>

          <label>
            <input type="radio" name="studyYear" value="year2" />
            2nd Year
          </label>

          <label>
            <input type="radio" name="studyYear" value="year3" />
            3rd Year
          </label>

          <label>
            <input type="radio" name="studyYear" value="year4" />
            4th Year
          </label>

          <label>
            <input type="radio" name="studyYear" value="year5Above" />
            5h Year or later
          </label>

          <label>
            <input type="radio" name="studyYear" value="yearGraduated" />
            Graduated within 2 years
          </label>
        </div>
      </div>
    </>
  );
}
