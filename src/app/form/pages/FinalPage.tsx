export function FinalPage() {
  return (
    <>
      <h2>The Final Section</h2>
      <p>
        {
          "Some final questions from us about who you are, and what you're looking forward to!"
        }
      </p>

      <input type="hidden" name="page" value="final" />

      <p>final section placeholder</p>

      <div>
        <p>{"How much do you currently know about Linux?*"}</p>
        <p>
          {
            "Everyone is welcome, regardless of skill level or operating system choice!"
          }
        </p>
        <div>
          <label>
            <input type="radio" name="skill" value="0" required />
            Nothing
          </label>

          <label>
            <input type="radio" name="skill" value="1" />I am aware of its
            existence
          </label>

          <label>
            <input type="radio" name="skill" value="2" />I consider myself a
            beginner user
          </label>

          <label>
            <input type="radio" name="skill" value="3" />I consider myself a
            regular user
          </label>

          <label>
            <input type="radio" name="skill" value="4" />I consider myself a
            power user
          </label>

          <label>
            <input type="radio" name="skill" value="5" />I maintain or
            contribute to packages & software for GNU/Linux
          </label>
        </div>
      </div>

      <div>
        <p>{"What is your potential involvement in the LUG?"}</p>
        <p>
          Checking any of these boxes will add you to our email newsletter. You
          can unsubscribe at any time by emailing lug.aucklanduni@gmail.com
        </p>

        <div>
          <label>
            <input type="checkbox" name="involvement" value="attend" />
            Attending events
          </label>

          <label>
            <input type="checkbox" name="involvement" value="speak" />
            Speaking at events
          </label>

          <label>
            <input type="checkbox" name="involvement" value="executive" />
            Being an executive
          </label>

          <label>
            <input type="checkbox" name="involvement" value="project" />
            Participating in a software development project
          </label>
        </div>
      </div>

      <div>
        <p>What is your Discord username or handle?</p>
        <p>
          LUG@UoA hosts a Discord server where members can discuss Linux, free
          and open source software and technology in general. The Discord link
          will be shown when you submit this form.
        </p>
        <label htmlFor="discordUsername" />
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
