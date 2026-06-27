import Link from "next/link";

export default function SessionExpiredPage() {
  return (
    <main className="state-page">
      <p className="eyebrow">Session protection</p>
      <h1>Your session ended safely</h1>
      <p>Your credentials were cleared because the session could not be refreshed. Sign in again to continue.</p>
      <Link className="primary-link" href="/login">Sign in again</Link>
    </main>
  );
}
