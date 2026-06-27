# Frontend Architecture Plan

Project: PROJ-LOGOS-001 — AI-Agentic Smart Logistics Operating System

Status: Stage 0 planning baseline

Target: industrial logistics operations, initially oil/fuel logistics or fleet dispatch

## 1. Objective And Architectural Principles

The frontend will be a role-based operating surface for the complete order → warehouse → dispatch → driver → delivery proof → escrow → analytics workflow. It is not a generic delivery application. The Logistic Disponent console is a dedicated command center and a primary product surface.

The implementation will follow these principles:

- Model goods flow, information flow, money flow, and custody/responsibility together.
- Render only state transitions and actions allowed by the backend contract and the user's permissions.
- Treat AI output as a governed recommendation with reason, confidence, risk, impact, and approval state—not as an unreviewed command.
- Keep evidence, tracking history, ledger history, and audit history read-only; corrections use explicit workflows.
- Connect every enabled action to a typed command handler. When an endpoint is unavailable, show a deliberately disabled action with an implemented explanation.
- Keep mock and production adapters separate so sample data never leaks into page components.
- Design the driver experience mobile-first, warehouse work tablet-first, and Disponent operations for large screens.

## 2. Proposed Technology Baseline

- Next.js App Router with TypeScript in strict mode
- Tailwind CSS and shadcn/ui primitives with project-owned design tokens
- TanStack Query for server state, caching, mutations, and controlled retries
- React Hook Form plus Zod for accessible typed forms
- OpenAPI-generated types/client where the backend contract exists
- Small Zustand stores only for transient cross-component workspace state where URL state is insufficient
- Server-sent events or WebSocket adapter for live operational events, with polling fallback
- Map provider adapter so map components do not depend directly on a single vendor
- next-intl-ready copy structure for future localization, including Logistikdisponent terminology
- PWA manifest and service worker strategy for the driver surface; offline mutation queues are deferred until conflict and proof-upload rules are approved

No provider key or secret will be exposed in browser code. Environment files remain untracked; only a later sanitized `.env.example` may document public configuration names.

## 3. Suggested Application Structure

```text
apps/
  web/
    src/
      app/
        (public)/
        (auth)/
        (portal)/
        (operations)/
        (governance)/
        api/health/
      features/
        auth/ customers/ merchants/ warehouse/ inventory/
        orders/ shipments/ packages/ disponent/ dispatch/ routes/
        tracking/ drivers/ fleet/ carriers/ finance/ returns/
        disputes/ notifications/ ai/ approvals/ audit/ analytics/
        compliance/ admin/
      components/
        ui/ layout/ data-display/ forms/ feedback/ evidence/
        maps/ timeline/ approvals/ ai/ command-center/
      lib/
        api/ auth/ permissions/ events/ maps/ validation/
        uploads/ telemetry/ formatting/ constants/
      config/
        navigation.ts permissions.ts statuses.ts feature-flags.ts
      hooks/
      styles/
      tests/
packages/
  contracts/        # generated API types plus domain-safe wrappers
  ui/               # only if a second app makes sharing worthwhile
  config/           # shared lint/TypeScript config after scaffold
```

The initial scaffold may remain a single `apps/web` project. Package boundaries should be added only when they provide real reuse. Each feature owns its queries, commands, schemas, screens, and tests; shared components must remain domain-neutral.

## 4. Route Structure

Routes use stable nouns, IDs for detail views, and role-specific route groups. Route groups organize code without changing public URLs.

### 4.1 Public And Authentication

```text
/login
/register
/forgot-password
/verify-2fa
/session-expired
/access-denied
/track
/track/[trackingId]
```

### 4.2 Customer

```text
/customer
/customer/orders
/customer/orders/new
/customer/orders/[orderId]
/customer/orders/[orderId]/tracking
/customer/orders/[orderId]/payment
/customer/orders/[orderId]/confirm-delivery
/customer/returns/new
/customer/returns/[returnId]
/customer/disputes/new
/customer/disputes/[disputeId]
/customer/receipts
/customer/profile
/customer/notifications
/customer/support
```

### 4.3 Merchant And Shipper

```text
/merchant
/merchant/products
/merchant/inventory
/merchant/orders
/merchant/orders/[orderId]
/merchant/pickups
/merchant/pickups/new
/merchant/labels
/merchant/returns
/merchant/disputes
/merchant/earnings
/merchant/documents
/merchant/settings
```

The `shipper` role uses the merchant operational shell with organization-policy differences rather than a duplicated application.

### 4.4 Warehouse

```text
/warehouse
/warehouse/pick-queue
/warehouse/pick/[taskId]
/warehouse/pack/[taskId]
/warehouse/scan
/warehouse/staging
/warehouse/inventory
/warehouse/stock-movements
/warehouse/returns
/warehouse/returns/[returnId]/inspection
/warehouse/quarantine
/warehouse/reports
/warehouse/management
```

Management routes and actions are visible only to `warehouse_manager`; task execution is shared with `warehouse_staff` according to permissions.

### 4.5 Logistic Disponent Command Center

```text
/disponent
/disponent/ready-queue
/disponent/unassigned
/disponent/ai-recommendations
/disponent/tours
/disponent/tours/new
/disponent/tours/[tourId]
/disponent/assignments/drivers
/disponent/assignments/vehicles
/disponent/assignments/carriers
/disponent/live-map
/disponent/route-board
/disponent/alerts/delays
/disponent/failures/pickups
/disponent/failures/deliveries
/disponent/exceptions
/disponent/exceptions/[exceptionId]
/disponent/reassignments
/disponent/approvals
/disponent/communications
/disponent/audit
```

The command center uses a persistent operational context: selected zone, shift/time window, risk filter, selected tour, and live-event health. Core queue, planning, assignment, exception, and map views must be reachable directly and must not be nested under `/admin`.

### 4.6 Driver PWA

```text
/driver
/driver/jobs
/driver/jobs/[jobId]
/driver/jobs/[jobId]/pickup
/driver/jobs/[jobId]/route
/driver/jobs/[jobId]/delivery
/driver/jobs/[jobId]/failed-delivery
/driver/earnings
/driver/support
/driver/profile
/driver/documents
```

### 4.7 Fleet, Carrier, And Freight Forwarder

```text
/fleet
/fleet/vehicles
/fleet/vehicles/[vehicleId]
/fleet/drivers
/fleet/maintenance
/fleet/documents
/fleet/capacity
/fleet/reports
/carrier
/carrier/assignments
/carrier/capacity
/carrier/documents
/carrier/performance
/forwarder
/forwarder/shipments
/forwarder/consolidations
/forwarder/carriers
/forwarder/documents
/forwarder/exceptions
```

### 4.8 Finance, Support, And Compliance

```text
/finance
/finance/payments
/finance/escrow
/finance/ledger
/finance/payouts
/finance/refunds
/finance/commissions
/finance/invoices
/finance/reconciliation
/finance/approvals
/support
/support/tickets
/support/delivery-issues
/support/returns
/support/disputes
/support/communications
/support/evidence
/support/escalations
/compliance
/compliance/kyc
/compliance/driver-documents
/compliance/merchant-documents
/compliance/restricted-items
/compliance/risk-alerts
/compliance/audit
/compliance/data-requests
/compliance/security-events
```

### 4.9 AI, Administration, And Analytics

```text
/ai
/ai/agents
/ai/tasks
/ai/recommendations
/ai/approvals
/ai/providers
/ai/costs
/ai/audit
/ai/risks
/admin
/admin/users
/admin/roles
/admin/organizations
/admin/warehouses
/admin/carriers
/admin/settings
/admin/pricing
/admin/zones
/admin/integrations
/admin/ai-settings
/admin/audit
/admin/security
/admin/health
/analytics/operations
/analytics/finance
/analytics/drivers
/analytics/warehouse
/analytics/ai
/analytics/disputes
```

## 5. Role-Based Navigation And Authorization Model

Navigation is derived from a typed route registry, not scattered role checks. Each entry declares `href`, label, icon, required permissions, optional badge source, responsive priority, and feature readiness.

| Role | Default destination | Primary navigation |
| --- | --- | --- |
| customer | `/customer` | Orders, tracking, payment/escrow, returns, disputes, receipts, support |
| merchant | `/merchant` | Products, inventory, orders, pickups, labels, returns, earnings, documents |
| shipper | `/merchant` | Orders, pickups, labels, tracking, documents |
| warehouse_staff | `/warehouse/pick-queue` | Pick, pack, scan, staging, returns |
| warehouse_manager | `/warehouse` | Staff routes plus inventory, movements, quarantine, reports, management |
| driver | `/driver` | Jobs, active route, earnings, support, documents |
| fleet_manager | `/fleet` | Vehicles, drivers, maintenance, documents, capacity, reports |
| carrier | `/carrier` | Assignments, capacity, documents, performance |
| freight_forwarder | `/forwarder` | Shipments, consolidations, carriers, documents, exceptions |
| logistic_disponent | `/disponent` | Queues, tours, assignments, live map, exceptions, approvals, communications, audit |
| support_agent | `/support` | Tickets, issues, returns, disputes, evidence, escalations |
| finance_admin | `/finance` | Payments, escrow, ledger, payouts, refunds, invoices, reconciliation, approvals |
| compliance_admin | `/compliance` | KYC, documents, restricted items, risk, audit, data requests, security |
| super_admin | `/admin` | System configuration, governance, AI, audit, health, cross-domain analytics |

Authorization is permission-first: roles supply permission sets, while route and action guards evaluate permissions and resource scope. The frontend hides unauthorized actions for clarity, but the backend remains authoritative. Forbidden direct navigation renders a permission-denied state and records no sensitive resource content.

## 6. Shells And Responsive Layouts

- `PublicShell`: tracking and authentication without operational navigation.
- `PortalShell`: customer and merchant desktop/mobile portal.
- `WarehouseShell`: high-contrast tablet layout, scan focus, large targets, keyboard/scanner support.
- `DriverShell`: bottom navigation, one primary task per screen, outdoor-readable contrast, resumable proof flow.
- `OperationsShell`: dense desktop layout for fleet, support, finance, compliance, and analytics.
- `DisponentCommandShell`: multi-panel large-screen workspace with queue, planning board, assignment drawers, map, alert rail, and live-event status.
- `GovernanceShell`: super-admin and AI governance surfaces with explicit scope and high-risk confirmations.

At narrow widths, data tables become prioritized cards or horizontally scrollable tables with sticky identifiers and actions. Disponent mobile/tablet views are for monitoring and urgent approvals; full tour construction requires an adequately sized viewport and explains that limitation rather than silently losing controls.

## 7. Component System Plan

### 7.1 Foundations

- Semantic color tokens for operational status, risk, proof, finance, and approvals in light/dark themes
- Type scale optimized for dense operational data
- Consistent focus, hover, disabled, destructive, warning, and pending states
- WCAG-compliant keyboard navigation, contrast, labels, errors, and live announcements

### 7.2 Shared Operational Components

- `PageHeader`, `CommandBar`, `FilterBar`, `SavedViewMenu`, `DataTable`, `Pagination`
- `StatusBadge` variants for order, shipment, payment, warehouse, driver, dispute, return, proof, AI risk, and approval
- `KpiCard`, `OperationalAlert`, `Timeline`, `AuditPanel`, `HistoryDrawer`
- `LoadingState`, `EmptyState`, `ErrorState`, `RetryState`, `PermissionDeniedState`
- `ConfirmDialog`, `AuditReasonDialog`, `ApprovalDecisionDialog`
- `SafeFileUpload`, `DocumentPreview`, `EvidenceGallery`, `LockedEvidenceIndicator`
- `MapPanel`, `MapLegend`, `VehicleMarker`, `RouteOverlay` behind a provider adapter

### 7.3 Domain Components

- Disponent: `ReadyQueue`, `TourPlanningBoard`, `AssignmentPanel`, `RouteBoard`, `ExceptionWorkbench`, `LiveOperationsMap`, `AIRecommendationCard`
- Warehouse: `PickTaskCard`, `ScanResult`, `PackChecklist`, `StagingLane`, `ReturnInspectionForm`
- Driver: `JobCard`, `StopChecklist`, `PickupProofForm`, `DeliveryProofForm`, `FailureReasonForm`
- Finance: `EscrowPosition`, `LedgerTable` (read-only), `ReconciliationPanel`, `RefundApproval`
- Support/compliance: `EvidenceTimeline`, `EscalationPanel`, `DocumentReview`, `RiskCasePanel`

`AIRecommendationCard` always shows action, reason, confidence, risk level, affected entity, estimated cost impact, SLA impact, approval requirement, and permitted approve/reject/manual-override commands.

## 8. API Client And Contract Structure

```text
src/lib/api/
  transport.ts          # base URL, credentials, correlation ID, timeout
  errors.ts             # normalized domain/API errors
  generated/            # OpenAPI output; never hand-edited
  clients/              # auth, orders, shipments, disponent, etc.
  adapters/
    production/
    mock/
  query-keys.ts
  retry-policy.ts
```

Typed clients cover `/auth`, `/users`, `/roles`, `/merchants`, `/customers`, `/warehouse`, `/inventory`, `/orders`, `/shipments`, `/packages`, `/disponent`, `/dispatch`, `/routes`, `/tracking`, `/drivers`, `/fleet`, `/carriers`, `/payments`, `/escrow`, `/ledger`, `/returns`, `/disputes`, `/notifications`, `/ai`, `/approvals`, `/audit`, `/analytics`, `/admin`, and `/compliance`.

Rules:

- Prefer an available OpenAPI contract; wrap generated calls in domain-focused query and command functions.
- Normalize errors into validation, authentication, authorization, conflict/state-transition, rate-limit, network, and server categories.
- Retry safe idempotent reads only; never automatically retry financial, assignment, approval, proof, or manual-override commands.
- Use idempotency keys for supported create/payment/proof commands.
- Invalidate narrow query keys after mutations and reconcile live events without replacing newer data.
- Keep mock fixtures at adapter boundaries and label mock mode visibly outside production.
- Upload files via signed, constrained workflows; validate type/size before upload and show scan/processing status.

## 9. Authentication, Session, And Protected Routes

The preferred browser model is secure, `HttpOnly`, `Secure`, `SameSite` cookies issued by the backend or a same-origin BFF. Tokens must not be persisted in local storage. The frontend will support refresh rotation without exposing refresh tokens to JavaScript.

Protection layers:

1. Middleware performs a coarse session check for protected route groups.
2. Server layout loads the current user, organization scope, roles, and permissions.
3. Route registry checks permission and resource scope before rendering navigation/content.
4. Action components use the same permission vocabulary for visibility and disabled reasons.
5. Backend revalidates every request and state transition.

The session layer supports role-based post-login redirect, 2FA challenge state, timeout warning, forced sign-out, revoked-session handling, and safe return URLs. Sensitive pages must not leak content through loading states, cached HTML, or error messages.

## 10. State, Data Fetching, And Real-Time Events

- Server state: TanStack Query with feature-owned query keys and conservative stale times.
- URL state: filters, sorting, pagination, tabs, selected zone, and saved-view identifiers.
- Form state: React Hook Form and Zod schemas aligned with API constraints.
- Local UI state: drawers, dialogs, column visibility, and non-sensitive preferences.
- Live state: one event transport adapter feeding typed tracking, assignment, delay, exception, notification, and approval events.

Incoming events carry entity/version identifiers. The client invalidates or patches only when the event is newer than cached data. Connection loss is visible, stale live data is timestamped, and polling fallback is rate-limited. Optimistic updates are limited to reversible low-risk interactions such as marking a notification read; operational commands wait for server confirmation.

## 11. Forms, Commands, And High-Risk Actions

Every form provides required-field markers, plain-language help, inline validation, a summary on failure, submission state, and recovery guidance. State-machine conflicts return the current state and the newly allowed actions.

These actions always require confirmation and an audit reason:

- approve a refund
- release disputed escrow
- manual route override
- manual delivery completion
- suspend a driver
- suspend a merchant
- approve a high-risk AI action

Critical/dual-approval actions show that one approval does not equal execution. L5/prohibited actions are never rendered as executable controls. Ledger entries, audit logs, tracking history, and locked evidence are not editable.

## 12. Frontend Security Baseline

- No API keys, secrets, or provider credentials in client bundles, logs, query strings, fixtures, or committed files
- Mask saved AI provider keys permanently after submission
- CSP, clickjacking protection, safe redirect validation, and dependency review during scaffold
- Output encoding and sanitized rendering for user notes and external content
- Safe upload allowlist, size limits, preview isolation, malware-scan status, and signed downloads
- Permission-aware telemetry with correlation IDs and no sensitive payloads
- Audit reason and explicit confirmation for overrides; no destructive action hidden behind a single click
- Customer/driver location and proof information disclosed only to permitted roles

## 13. Testing And Verification Strategy

- Unit tests: schemas, permission predicates, status/risk mappings, retry rules, event reconciliation
- Component tests: all shared states, accessible forms/dialogs, recommendation and evidence cards
- Integration tests: API adapters, session refresh, route guards, role navigation, conflict handling
- End-to-end tests: one critical workflow per role, with extra coverage for Disponent planning/assignment/exceptions and high-risk approvals
- Contract tests: generated client compatibility with backend OpenAPI
- Visual/responsive checks: mobile driver, warehouse tablet, standard desktop, and large-screen Disponent layouts
- Accessibility checks: automated scan plus keyboard/manual checks of primary flows
- PWA checks: installability, safe caching, update behavior, and no caching of sensitive API responses

Each major page must prove loading, empty, error, retry, permission-denied, and populated states. Enabled buttons must be exercised in tests or explicitly mapped to a tested command handler.

## 14. UI Implementation Phases

1. **Foundation:** scaffold Next.js, strict TypeScript, styles, component primitives, test tooling, API adapter contract, and sanitized environment template.
2. **Identity and access:** login/register/reset/2FA, session lifecycle, role redirect, shells, permissions, and route registry.
3. **Shared operations:** data table, filters, status system, timelines, evidence, upload, approvals, audit, map abstraction, notifications, and real-time adapter.
4. **Core logistics:** customer order flow; merchant preparation; warehouse pick/scan/pack/stage; tracking detail.
5. **Disponent command center:** queues, AI recommendations, tour planning, driver/vehicle/carrier assignment, live map, route board, failures, exceptions, approvals, communications, and audit.
6. **Driver PWA:** jobs, pickup proof, route, delivery proof, failed delivery, GPS check-in, support, and PWA verification.
7. **Fleet/carrier/forwarder:** asset capacity, availability, maintenance/documents, assignments, consolidation, and exceptions.
8. **Finance/support/compliance:** immutable financial views, governed approvals, evidence/dispute workflows, document/risk/security review.
9. **AI/admin/analytics:** agents, tasks, providers, costs, governance, system configuration, health, and API-backed KPIs.
10. **Hardening and acceptance:** responsive/accessibility pass, contract/E2E tests, performance budgets, security review, and acceptance report.

Implementation follows backend readiness but preserves complete typed adapter boundaries. No required MVP capability will be represented by an unconnected placeholder.

## 15. Initial Route, Component, And API-Client Implementation Slice

The first coding slice after this plan should establish architecture rather than random pages:

1. Create `apps/web` with Next.js, strict TypeScript, Tailwind, lint, build, and test scripts.
2. Add semantic tokens and the six shell layouts with responsive navigation scaffolding.
3. Add the typed role/permission route registry for all 14 user roles.
4. Add API transport, normalized errors, query provider, production/mock adapter interface, and clients for `/auth`, `/orders`, `/shipments`, `/warehouse`, `/disponent`, `/drivers`, `/tracking`, and `/approvals`.
5. Add shared loading, empty, error, retry, and permission-denied states.
6. Implement authentication screens and protected role redirects against the adapter interface.
7. Implement a vertical navigation-and-state prototype for the Disponent dashboard and ready queue, including fully wired filters and deliberately disabled server-unavailable commands.
8. Verify typecheck, lint, build, unit tests, route smoke tests, and responsive shell behavior before expanding domain pages.

## 16. Decisions Requiring Backend/Product Confirmation

- Exact OpenAPI location, authentication cookie/BFF topology, and refresh contract
- Organization/tenant scoping and whether one user can switch roles or organizations in-session
- Canonical permission names and server-provided allowed-action representation
- Map provider, geocoding policy, location retention, and permitted GPS tolerance
- Oil/fuel-specific cargo, vehicle, safety-document, and restricted-route fields for the first vertical
- Proof level thresholds and country-specific ID/signature constraints
- Approval matrices for L2–L4 actions, financial thresholds, and dual approval
- Offline driver behavior and conflict resolution for proof uploads
- Supported scanner hardware/browser input and warehouse label generation contract

Until confirmed, these remain explicit interfaces or configuration—not hardcoded business assumptions.
