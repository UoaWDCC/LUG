async function login(formData: FormData) {
  "use server";
  // TODO: look up admin by email, verify password hash, set session cookie also all later time
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("admin login attempt", { email, password });
}

const inputClass =
  "block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none";
const labelClass = "block text-sm font-medium mb-1";

export default function AdminLoginPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin login</h1>
        <p className="mt-1 text-sm text-gray-600">For club executives only.</p>

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}
