import Link from "next/link";
import { homeForRoles } from "@/config/navigation";
import { getSession } from "@/lib/auth/session";

export default async function AccessDeniedPage() {
  const session = await getSession();
  const destination = session ? homeForRoles(session.roles) : "/login";
  return (
    <main className="state-page">
      <p className="eyebrow">Permission boundary</p>
      <h1>Access denied</h1>
      <p>Your current role does not permit this operational surface. No restricted data was loaded.</p>
      <Link className="text-link" href={destination}>{session ? "Return to your role home" : "Sign in"}</Link>
    </main>
  );
}
