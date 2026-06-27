export const roles = [
  "customer",
  "merchant",
  "shipper",
  "warehouse_staff",
  "warehouse_manager",
  "driver",
  "fleet_manager",
  "carrier",
  "freight_forwarder",
  "logistic_disponent",
  "support_agent",
  "finance_admin",
  "compliance_admin",
  "super_admin",
] as const;

export type Role = (typeof roles)[number];

export const permissions = [
  "customer:portal:view",
  "merchant:portal:view",
  "warehouse:tasks:view",
  "warehouse:manage",
  "driver:jobs:view",
  "fleet:manage",
  "carrier:assignments:view",
  "forwarder:shipments:view",
  "disponent:dashboard:view",
  "disponent:queue:view",
  "disponent:tours:plan",
  "disponent:assignments:manage",
  "disponent:exceptions:manage",
  "disponent:approvals:view",
  "disponent:audit:view",
  "support:cases:manage",
  "finance:records:view",
  "compliance:reviews:manage",
  "admin:system:manage",
  "analytics:view",
] as const;

export type Permission = (typeof permissions)[number];

export const permissionsByRole: Record<Role, readonly Permission[]> = {
  customer: ["customer:portal:view"],
  merchant: ["merchant:portal:view"],
  shipper: ["merchant:portal:view"],
  warehouse_staff: ["warehouse:tasks:view"],
  warehouse_manager: ["warehouse:tasks:view", "warehouse:manage", "analytics:view"],
  driver: ["driver:jobs:view"],
  fleet_manager: ["fleet:manage", "analytics:view"],
  carrier: ["carrier:assignments:view"],
  freight_forwarder: ["forwarder:shipments:view"],
  logistic_disponent: [
    "disponent:dashboard:view",
    "disponent:queue:view",
    "disponent:tours:plan",
    "disponent:assignments:manage",
    "disponent:exceptions:manage",
    "disponent:approvals:view",
    "disponent:audit:view",
    "analytics:view",
  ],
  support_agent: ["support:cases:manage"],
  finance_admin: ["finance:records:view", "analytics:view"],
  compliance_admin: ["compliance:reviews:manage"],
  super_admin: ["admin:system:manage", "analytics:view"],
};

export function getPermissionsForRoles(userRoles: readonly Role[]): Set<Permission> {
  return new Set(userRoles.flatMap((role) => permissionsByRole[role]));
}

export function hasPermission(userRoles: readonly Role[], permission: Permission): boolean {
  return getPermissionsForRoles(userRoles).has(permission);
}

export interface ProtectedRouteRule {
  readonly prefix: `/${string}`;
  readonly permission: Permission;
}

export const protectedRouteRules: readonly ProtectedRouteRule[] = [
  { prefix: "/customer", permission: "customer:portal:view" },
  { prefix: "/merchant", permission: "merchant:portal:view" },
  { prefix: "/warehouse", permission: "warehouse:tasks:view" },
  { prefix: "/driver", permission: "driver:jobs:view" },
  { prefix: "/fleet", permission: "fleet:manage" },
  { prefix: "/carrier", permission: "carrier:assignments:view" },
  { prefix: "/forwarder", permission: "forwarder:shipments:view" },
  { prefix: "/disponent", permission: "disponent:dashboard:view" },
  { prefix: "/support", permission: "support:cases:manage" },
  { prefix: "/finance", permission: "finance:records:view" },
  { prefix: "/compliance", permission: "compliance:reviews:manage" },
  { prefix: "/admin", permission: "admin:system:manage" },
] as const;

export function permissionForPath(pathname: string): Permission | null {
  return protectedRouteRules.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )?.permission ?? null;
}
