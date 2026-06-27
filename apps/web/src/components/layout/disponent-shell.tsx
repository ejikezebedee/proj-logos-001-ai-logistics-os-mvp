"use client";

import { Bell, Menu, Radio, Search, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { disponentNavigation } from "@/config/navigation";
import { hasPermission, type Role } from "@/config/permissions";
import { cn } from "@/lib/cn";
import { LogoutButton } from "@/components/auth/session-actions";

function Navigation({
  roles,
  query,
  onNavigate,
}: {
  roles: readonly Role[];
  query: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const normalizedQuery = query.trim().toLowerCase();
  const items = disponentNavigation.filter(
    (item) =>
      hasPermission(roles, item.permission) &&
      (!normalizedQuery || item.label.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <nav aria-label="Logistic Disponent navigation" className="command-nav">
      {items.map((item) =>
        item.enabled ? (
          <Link
            className={cn("nav-item", pathname === item.href && "nav-item-active")}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <span className="nav-dot" />
            {item.label}
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="nav-item nav-item-disabled"
            key={item.href}
            title="Route is defined; operational implementation is not part of this foundation step."
          >
            <span className="nav-dot" />
            {item.label}
            <span className="nav-state">Defined</span>
          </span>
        ),
      )}
    </nav>
  );
}

export function DisponentShell({
  children,
  displayName,
  roles,
}: {
  children: ReactNode;
  displayName: string;
  roles: readonly Role[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="command-shell">
      <aside className="command-sidebar">
        <div className="brand-lockup">
          <span className="brand-mark">L</span>
          <div><strong>LOGOS</strong><span>Operations system</span></div>
        </div>
        <div className="role-context">
          <span>Active console</span>
          <strong>Logistic Disponent</strong>
        </div>
        <Navigation query={query} roles={roles} />
        <div className="security-note">
          <ShieldCheck aria-hidden="true" size={18} />
          <span>Permission-scoped<br />Audit-ready foundation</span>
        </div>
      </aside>

      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Command navigation">
          <button className="icon-button drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
          <div className="brand-lockup"><span className="brand-mark">L</span><strong>LOGOS</strong></div>
          <Navigation query={query} roles={roles} onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="command-main">
        <header className="command-topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <label className="command-search">
            <Search aria-hidden="true" size={17} />
            <span className="sr-only">Search operational navigation</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter command navigation"
              value={query}
            />
          </label>
          <div className="connection-state" title="The backend event connection is not configured in this foundation step.">
            <Radio aria-hidden="true" size={15} /><span>Adapter offline</span>
          </div>
          <button
            aria-expanded={notificationsOpen}
            aria-label="Toggle notifications"
            className="icon-button"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={19} />
          </button>
          <LogoutButton compact />
          <div className="operator-identity"><span>{displayName}</span><small>Secure session</small></div>
        </header>

        {notificationsOpen && (
          <aside className="notification-panel" aria-live="polite">
            <strong>Notifications unavailable</strong>
            <p>The notifications adapter is not configured. No operational alerts are being claimed.</p>
          </aside>
        )}

        <main className="command-content">{children}</main>
      </div>
    </div>
  );
}
