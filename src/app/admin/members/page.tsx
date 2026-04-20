import { getPrisma } from "@/lib/db/prisma";

export default async function AdminMembersPage() {
  const prisma = getPrisma();
  const members = await prisma.member.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin members test</h1>
      <p className="mt-2 text-sm text-gray-600">
        Temporary page to verify server-side DB reads.
      </p>

      {members.length === 0 ? (
        <p className="mt-6">No members found.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {members.map((member) => (
            <li key={member.id} className="rounded border p-4">
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>University:</strong> {member.university}
              </p>
              <p>
                <strong>Returning:</strong> {member.isReturning ? "Yes" : "No"}
              </p>
              <p>
                <strong>Skill level:</strong> {member.skillLevel}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
