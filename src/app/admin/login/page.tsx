async function login(formData: FormData) {
  "use server";
  // TODO: look up admin by email, verify password hash, set session cookie.
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("admin login attempt", { email, password });
}

export default function AdminLoginPage() {
  return (
    <>
      <h1>Admin login</h1>

      <form action={login} method="post">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Log in</button>
      </form>
    </>
  );
}
