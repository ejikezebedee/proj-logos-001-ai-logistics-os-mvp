import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <p className="eyebrow">Route boundary</p>
      <h1>Operational route not found</h1>
      <p>This route is not implemented in the current verified foundation.</p>
      <Link className="text-link" href="/disponent">Return to command center</Link>
    </main>
  );
}
