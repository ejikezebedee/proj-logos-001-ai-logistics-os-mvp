import { describe, expect, it } from "vitest";
import { disponentNavigation, homeForRoles, roleHome } from "@/config/navigation";
import { hasPermission, permissionForPath, roles } from "@/config/permissions";

describe("role and navigation foundation", () => {
  it("defines a home route for every supported role", () => {
    expect(Object.keys(roleHome).sort()).toEqual([...roles].sort());
  });

  it("keeps the Logistic Disponent as a dedicated top-level surface", () => {
    expect(roleHome.logistic_disponent).toBe("/disponent");
    expect(disponentNavigation).toHaveLength(18);
    expect(disponentNavigation.every((item) => item.href.startsWith("/disponent"))).toBe(true);
  });

  it("does not give the Disponent forbidden admin or finance permissions", () => {
    expect(hasPermission(["logistic_disponent"], "admin:system:manage")).toBe(false);
    expect(hasPermission(["logistic_disponent"], "finance:records:view")).toBe(false);
  });

  it("redirects each role to its configured workspace", () => {
    for (const role of roles) expect(homeForRoles([role])).toBe(roleHome[role]);
  });

  it("resolves protected paths through the shared permission registry", () => {
    expect(permissionForPath("/customer/orders")).toBe("customer:portal:view");
    expect(permissionForPath("/disponent/tours/active")).toBe("disponent:dashboard:view");
    expect(permissionForPath("/login")).toBeNull();
  });
});
