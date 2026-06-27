# Codex UI Build Prompt

Use this prompt to instruct Codex to build the frontend UI for PROJ-LOGOS-001.

## Prompt For Codex

You are Codex, acting as the senior frontend engineering executor for PROJ-LOGOS-001: AI-Agentic Smart Logistics Operating System.

Repository:

- Local path: `/home/boss/.openclaw/workspace/projects/proj-logos-001-ai-logistics-os-mvp`
- GitHub repo: `https://github.com/ejikezebedee/proj-logos-001-ai-logistics-os-mvp`
- Visibility: private
- Branch: `main`

You must build the UI for an industrial-grade AI-agentic logistics operating system. Do not build a generic delivery app. Do not build a toy demo. Do not bury the Logistic Disponent / Logistikdisponent inside a generic admin page.

## Required Source Documents

Before writing code, read these files completely:

- `README.md`
- `INDUSTRIAL_FRONTEND_REQUIREMENTS.md`
- `INDUSTRIAL_BACKEND_REQUIREMENTS.md`
- `EXECUTION_PLAN.md`
- `CODEX_COLLABORATION_WORKFLOW.md`
- `PROJ-LOGOS-001-ai-logistics-os-mvp.md`

Treat these files as the product source of truth.

## Main Objective

Develop the full frontend for the AI-Agentic Smart Logistics Operating System with a serious industrial UI:

- customer portal
- merchant portal
- warehouse portal
- driver app/PWA
- Logistic Disponent console
- fleet dashboard
- finance dashboard
- support dashboard
- compliance dashboard
- AI command center
- super admin dashboard
- analytics dashboard
- tracking page

The UI must feel like a real logistics command platform used by operations teams, drivers, warehouses, finance teams, compliance teams, support agents, and super admins.

## Preferred Stack

Use this stack unless the repo already establishes a better standard:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent production-grade component system
- TanStack Query or equivalent API state layer
- Zod validation
- role-based routing
- map-ready component architecture
- WebSocket/SSE-ready event architecture
- PWA-ready driver interface

## First Execution Step

Do not jump straight into random pages.

First create a short frontend architecture plan inside the repo:

- suggested app structure
- route structure
- role-based navigation model
- component system plan
- API client structure
- auth/session approach
- protected route strategy
- frontend state/data fetching plan
- responsive design plan
- UI implementation phases

Save it as:

`FRONTEND_ARCHITECTURE_PLAN.md`

Commit and push this plan before large UI implementation begins.

## Required UI Standards

The frontend must be:

- industrial-grade
- modern
- responsive
- secure
- role-based
- fast
- clean
- professional
- mobile-friendly
- PWA-ready for drivers
- API-connected
- production-ready

Avoid:

- toy UI
- fake placeholder-only screens
- unconnected buttons
- generic delivery app look
- overcrowded layouts
- missing empty states
- broken mobile views
- "coming soon" placeholders for required MVP functions

## Required Global Features

Implement:

- login
- register
- forgot password UI
- 2FA-ready verification screen
- role-based dashboard redirect
- protected routes
- responsive shell
- sidebar navigation
- topbar
- notification panel
- search
- filters
- pagination
- status badges
- loading states
- empty states
- error states
- retry states
- permission-denied states
- form validation
- modal dialogs
- confirmation dialogs
- audit/history panels
- file upload components
- image/document preview
- timeline component
- map-ready component

## Required Roles

Role-based navigation and screens must support:

- customer
- merchant
- shipper
- warehouse_staff
- warehouse_manager
- driver
- fleet_manager
- carrier
- freight_forwarder
- logistic_disponent
- support_agent
- finance_admin
- compliance_admin
- super_admin

Every role must see only relevant pages and actions.

## Non-Negotiable Logistic Disponent Console

Build the Logistic Disponent console as a first-class command center.

Required pages:

- Disponent Dashboard
- Ready-for-Dispatch Queue
- Unassigned Shipments
- AI Tour Recommendations
- Tour Planning Board
- Driver Assignment
- Vehicle Assignment
- Carrier Assignment
- Live Map
- Route Board
- Delay Alerts
- Failed Pickup Queue
- Failed Delivery Queue
- Exception Cases
- Manual Reassignment
- Approval Queue
- Communication Panel
- Audit History

The Disponent console must support:

- view ready shipments
- filter by zone, time window, priority, and risk
- view AI tour recommendations
- approve/reject AI tour plan
- create manual tour plan
- assign driver
- assign vehicle
- assign carrier
- reassign shipment
- split route
- merge route
- reschedule pickup
- reschedule delivery
- handle failed pickup
- handle failed delivery
- open exception case
- resolve exception case
- escalate to support
- escalate to finance
- escalate to compliance
- view live driver/vehicle map
- view operational audit history

AI recommendation cards must show:

- recommended action
- reason
- confidence score
- risk level
- affected shipment/order
- estimated cost impact
- SLA impact
- approval requirement
- approve button
- reject button
- manual override button

## Required Portal Coverage

Build screens for:

1. Customer Portal
   - dashboard, create order, my orders, order detail, live tracking, payment/escrow, delivery confirmation, return request, dispute request, receipts, profile, notifications, support.

2. Merchant/Shipper Portal
   - dashboard, products/SKUs, inventory overview, orders, pickup requests, shipment labels, returns, disputes, earnings, documents, settings.

3. Warehouse Portal
   - dashboard, pick queue, pack station, scan package, dispatch staging, inventory, stock movements, returns inspection, damaged/quarantined stock, reports.

4. Driver App/PWA
   - dashboard, available jobs, active job, pickup flow, delivery flow, failed delivery, route view, earnings, support, profile/documents.

5. Fleet Manager Dashboard
   - vehicles, vehicle detail, driver availability, maintenance, insurance/documents, capacity overview, reports.

6. Finance Dashboard
   - payments, escrow, ledger, payouts, refunds, commissions, invoices, reconciliation, finance approval queue.

7. Support Dashboard
   - tickets, delivery issues, returns, disputes, communication history, evidence timeline, escalations.

8. Compliance Dashboard
   - KYC reviews, driver documents, merchant documents, restricted items, risk alerts, audit logs, data protection requests, security events.

9. AI Command Center
   - AI overview, agents, tasks, recommendations, approval gates, provider settings, cost/token usage, audit logs, risk events.

10. Super Admin Dashboard
    - system overview, users, roles/permissions, organizations, warehouses, carriers, platform settings, pricing rules, zones, integrations, AI settings, audit logs, security settings, system health.

11. Tracking Page
    - tracking ID, status, timeline, map-ready panel, ETA, driver/courier info where allowed, proof status, delivery attempts, support contact.

12. Analytics Dashboard
    - operations, finance, driver, warehouse, AI automation, and dispute analytics.

## Required User Guidance Documentation

While building the UI, also write a clear user guidance document explaining how each role should fill and operate the system properly.

Create:

`USER_WORKFLOW_AND_FORM_GUIDE.md`

This guide must explain, in plain language:

- how customers create orders correctly
- how merchants prepare shipments
- how warehouse staff pick, scan, pack, and stage packages
- how Logistic Disponenten plan tours and assign drivers/vehicles/carriers
- how drivers accept jobs, complete pickup, and complete delivery proof
- how finance admins handle escrow, ledger, payouts, refunds, and approvals
- how support agents handle returns, disputes, and evidence timelines
- how compliance admins review documents, risk, restricted items, and security events
- how super admins configure users, roles, zones, AI settings, and system rules
- how AI recommendations should be reviewed, approved, rejected, or overridden
- what fields are mandatory in important forms
- what mistakes users must avoid
- what high-risk actions require confirmation and audit reason

This guide must be written for operational users, not developers.

## API Connection Rules

Build a clean API client layer for these backend groups:

- /auth
- /users
- /roles
- /merchants
- /customers
- /warehouse
- /inventory
- /orders
- /shipments
- /packages
- /disponent
- /dispatch
- /routes
- /tracking
- /drivers
- /fleet
- /carriers
- /payments
- /escrow
- /ledger
- /returns
- /disputes
- /notifications
- /ai
- /approvals
- /audit
- /analytics
- /admin
- /compliance

If backend endpoints are not yet implemented, create a typed API layer with clearly separated mock adapters and production adapters. Do not hardwire fake data deep inside components.

All buttons must be connected to real handlers or safely disabled with a clear implemented state. No unconnected CTA buttons.

## Security Rules

Frontend must enforce:

- protected routes
- role-based page access
- role-based action visibility
- no API keys exposed
- no secret values displayed
- safe file upload UI
- confirmation before high-risk actions
- session timeout-ready behavior
- audit reason modal for manual overrides

High-risk actions requiring confirmation and reason:

- approve refund
- release disputed escrow
- manual route override
- manual delivery completion
- driver suspension
- merchant suspension
- AI high-risk approval

Never show saved AI provider API keys after submission. Show masked status only.

## Design Requirements

Use a premium operational dashboard style:

- dense but readable layouts
- professional data tables
- status badges
- risk indicators
- event timelines
- map panels
- KPI cards
- approval queues
- AI recommendation cards
- operational alerts
- responsive side navigation
- role-based menus
- mobile-first driver workflow
- large-screen Disponent command center

The UI should look calm, serious, precise, and operational. It should not look like a marketing landing page.

## Testing And Verification

Before reporting completion, run appropriate checks:

- install dependencies
- typecheck
- lint
- build
- unit/component tests if present
- smoke test key routes
- inspect responsive layout where possible

If any test cannot run, explain why.

## Git And Push Rule

After each completed step:

1. Check `git status`.
2. Stage only project-relevant files.
3. Commit with a clear message.
4. Push to `origin/main`.
5. Verify remote GitHub contains the update.

Do not push unrelated OpenClaw workspace files.

Do not commit secrets.

Do not commit API keys.

Do not commit `.env` files.

## Reporting Rule

At the end of each step, report:

- what was built
- files changed
- tests/checks run
- commit hash
- push status
- next recommended step

Keep the report concise.

## First Task To Execute

Start with this exact first task:

1. Read the required source documents.
2. Create `FRONTEND_ARCHITECTURE_PLAN.md`.
3. Create the initial frontend route/component/API-client implementation plan inside that architecture document.
4. Create `USER_WORKFLOW_AND_FORM_GUIDE.md` draft structure for all roles.
5. Commit and push both documents.
6. Report the commit hash and next coding step.

After that, begin frontend scaffolding.
