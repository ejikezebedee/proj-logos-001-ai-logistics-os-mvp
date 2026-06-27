import { redirect } from "next/navigation";
import { homeForRoles } from "@/config/navigation";
import { getSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getSession();
  redirect(session ? homeForRoles(session.roles) : "/login");
}
