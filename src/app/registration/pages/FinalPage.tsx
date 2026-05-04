export function FinalPage() {
  return (
    <>
      <h2>The Final Section</h2>
      <p>
        {
          "Some final questions from us about who you are, and what you're looking forward to!"
        }
      </p>

      <p>final section placeholder</p>

      <fieldset>
        <legend>How much do you currently know about Linux?*</legend>
        <p>
          {
            "Everyone is welcome, regardless of skill level or operating system choice!"
          }
        </p>
        <div>
          <label>
            <input
              type="radio"
              name="linuxSkillLevel"
              value="NOTHING"
              required
            />
            Nothing
          </label>
          <label>
            <input
              type="radio"
              name="linuxSkillLevel"
              value="AWARE_OF_EXISTENCE"
            />
            I am aware of its existence
          </label>
          <label>
            <input type="radio" name="linuxSkillLevel" value="BEGINNER_USER" />I
            consider myself a beginner user
          </label>
          <label>
            <input type="radio" name="linuxSkillLevel" value="REGULAR_USER" />I
            consider myself a regular user
          </label>
          <label>
            <input type="radio" name="linuxSkillLevel" value="POWER_USER" />I
            consider myself a power user
          </label>
          <label>
            <input type="radio" name="linuxSkillLevel" value="CONTRIBUTOR" />I
            maintain or contribute to software for GNU/Linux
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your potential involvement in the LUG?</legend>
        <p>
          Checking any of these boxes will add you to our email newsletter. You
          can unsubscribe at any time by emailing lug.aucklanduni@gmail.com
        </p>

        <div>
          <label>
            <input
              type="checkbox"
              name="potentialInvolvement"
              value="ATTENDING"
            />
            Attending events
          </label>
          <label>
            <input
              type="checkbox"
              name="potentialInvolvement"
              value="SPEAKING"
            />
            Speaking at events
          </label>
          <label>
            <input
              type="checkbox"
              name="potentialInvolvement"
              value="EXECUTIVE"
            />
            Being an executive
          </label>
          <label>
            <input
              type="checkbox"
              name="potentialInvolvement"
              value="PROJECTS"
            />
            Participating in a software development project
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="discordUsername">
          What is your Discord username or handle?
        </label>
        <p>
          LUG@UoA hosts a Discord server. The link will be shown after
          submission.
        </p>
        <input
          name="discordUsername"
          id="discordUsername"
          type="text"
          placeholder="Your answer"
        />
      </div>
    </>
  );
}
