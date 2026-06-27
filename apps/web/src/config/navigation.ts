import type { Permission, Role } from "@/config/permissions";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly permission: Permission;
  readonly enabled: boolean;
  readonly description?: string;
}

export const roleHome: Record<Role, string> = {
  customer: "/customer",
  merchant: "/merchant",
  shipper: "/merchant",
  warehouse_staff: "/warehouse/pick-queue",
  warehouse_manager: "/warehouse",
  driver: "/driver",
  fleet_manager: "/fleet",
  carrier: "/carrier",
  freight_forwarder: "/forwarder",
  logistic_disponent: "/disponent",
  support_agent: "/support",
  finance_admin: "/finance",
  compliance_admin: "/compliance",
  super_admin: "/admin",
};

export const disponentNavigation: readonly NavigationItem[] = [
  { label: "Command overview", href: "/disponent", permission: "disponent:dashboard:view", enabled: true },
  { label: "Ready-for-dispatch", href: "/disponent/ready-queue", permission: "disponent:queue:view", enabled: false },
  { label: "Unassigned shipments", href: "/disponent/unassigned", permission: "disponent:queue:view", enabled: false },
  { label: "AI tour recommendations", href: "/disponent/ai-recommendations", permission: "disponent:tours:plan", enabled: false },
  { label: "Tour planning board", href: "/disponent/tours", permission: "disponent:tours:plan", enabled: false },
  { label: "Driver assignment", href: "/disponent/assignments/drivers", permission: "disponent:assignments:manage", enabled: false },
  { label: "Vehicle assignment", href: "/disponent/assignments/vehicles", permission: "disponent:assignments:manage", enabled: false },
  { label: "Carrier assignment", href: "/disponent/assignments/carriers", permission: "disponent:assignments:manage", enabled: false },
  { label: "Live map", href: "/disponent/live-map", permission: "disponent:dashboard:view", enabled: false },
  { label: "Route board", href: "/disponent/route-board", permission: "disponent:tours:plan", enabled: false },
  { label: "Delay alerts", href: "/disponent/alerts/delays", permission: "disponent:exceptions:manage", enabled: false },
  { label: "Failed pickups", href: "/disponent/failures/pickups", permission: "disponent:exceptions:manage", enabled: false },
  { label: "Failed deliveries", href: "/disponent/failures/deliveries", permission: "disponent:exceptions:manage", enabled: false },
  { label: "Exception cases", href: "/disponent/exceptions", permission: "disponent:exceptions:manage", enabled: false },
  { label: "Manual reassignment", href: "/disponent/reassignments", permission: "disponent:assignments:manage", enabled: false },
  { label: "Approval queue", href: "/disponent/approvals", permission: "disponent:approvals:view", enabled: false },
  { label: "Communication panel", href: "/disponent/communications", permission: "disponent:dashboard:view", enabled: false },
  { label: "Audit history", href: "/disponent/audit", permission: "disponent:audit:view", enabled: false },
];
