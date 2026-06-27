import { hasPermission, type Permission, type Role } from "@/config/permissions";

export interface Session {
  readonly userId: string;
  readonly organizationId: string;
  readonly displayName: string;
  readonly roles: readonly Role[];
}

export interface SessionAdapter {
  getSession(): Promise<Session | null>;
}

// Foundation-only adapter. Replace at this boundary when the backend auth contract is available.
const foundationSessionAdapter: SessionAdapter = {
  async getSession() {
    return {
      userId: "foundation-user",
      organizationId: "foundation-organization",
      displayName: "Logistic Disponent",
      roles: ["logistic_disponent"],
    };
  },
};

export async function getSession(): Promise<Session | null> {
  return foundationSessionAdapter.getSession();
}

export async function canAccess(permission: Permission): Promise<boolean> {
  const session = await getSession();
  return session ? hasPermission(session.roles, permission) : false;
}
