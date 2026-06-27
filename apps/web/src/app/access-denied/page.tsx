import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="state-page">
      <p className="eyebrow">Permission boundary</p>
      <h1>Access denied</h1>
      <p>Your current role does not permit this operational surface.</p>
      <Link className="text-link" href="/">Return to your role home</Link>
    </main>
  );
}
