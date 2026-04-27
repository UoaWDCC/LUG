export function NewOtherPage() {
  return (
    <>
      <h2>Your affiliation</h2>

      <input type="hidden" name="page" value="newOther" />

      <div>
        <p>
          What institution or organisation are you affiliated with the most?*
        </p>
        <p>
          This can be the name of your university, your company, your research
          lab, etc.
        </p>
        <label htmlFor="organisation" />
        <input
          name="organisation"
          id="organisation"
          type="organisation"
          placeholder="Your answer"
          required
        />
      </div>

      <div>
        <p>Tell us more about yourself</p>
        <p>
          A nice excerpt about yourself can allow us to identify you in future
          club events.
        </p>
        <label htmlFor="description" />
        <input
          name="description"
          id="description"
          type="description"
          placeholder="Your answer"
        />
      </div>

      <div>
        <p>Why do you want to join our club?</p>
        <p>Here is your chance to pitch yourself to us!</p>
        <label htmlFor="pitch" />
        <input name="pitch" id="pitch" type="pitch" placeholder="Your answer" />
      </div>
    </>
  );
}
