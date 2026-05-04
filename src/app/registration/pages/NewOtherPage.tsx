export function NewOtherPage() {
  return (
    <>
      <h2>Your affiliation</h2>

      <div>
        <label htmlFor="organisation">
          What institution or organisation are you affiliated with the most?*
        </label>
        <p>
          This can be the name of your university, your company, your research
          lab, etc.
        </p>
        <input
          name="organisation"
          id="organisation"
          type="text"
          placeholder="Your answer"
          required
        />
      </div>

      <div>
        <label htmlFor="description"> Tell us more about yourself</label>
        <p>
          A nice excerpt about yourself can allow us to identify you in future
          club events.
        </p>
        <textarea
          name="description"
          id="description"
          placeholder="Your answer"
        />
      </div>

      <div>
        <label htmlFor="nonUoaPitch"> Why do you want to join our club?</label>
        <p>Here is your chance to pitch yourself to us!</p>
        <textarea
          name="nonUoaPitch"
          id="nonUoaPitch"
          placeholder="Your answer"
        />
      </div>
    </>
  );
}
