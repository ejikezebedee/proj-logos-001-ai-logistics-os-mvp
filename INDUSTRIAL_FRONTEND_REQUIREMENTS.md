# Industrial Frontend Requirements

Project: PROJ-LOGOS-001 - AI-Agentic Smart Logistics Operating System

## 1. Product Type

Build the frontend for an AI-Agentic Smart Logistics Operating System.

The frontend must support:

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

The Logistic Disponent / Logistikdisponent must be a first-class frontend experience, not hidden inside a generic admin screen.

## 2. Frontend Standard

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

Recommended stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent component system
- TanStack Query or equivalent API state layer
- Zod validation
- map component integration-ready
- WebSocket/SSE-ready real-time updates
- role-based routing

## 3. Design Direction

The visual identity should communicate:

- AI logistics control
- fleet intelligence
- industrial operations
- trust
- speed
- security
- precision

Use:

- dark/light mode support
- clean data tables
- status badges
- timeline components
- map panels
- AI recommendation cards
- approval queues
- KPI cards
- operational alerts
- professional forms
- responsive side navigation
- role-based menu visibility

Avoid:

- toy UI
- fake placeholder-only screens
- unconnected buttons
- generic delivery app look
- overcrowded layouts
- missing empty states
- broken mobile views

## 4. Required Roles And Navigation

Implement role-based navigation for:

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

Every role must see only relevant pages/actions.

## 5. Global Frontend Features

Implement globally:

- authentication pages
- login
- register
- forgot password UI
- 2FA-ready verification screen
- role-based dashboard redirect
- protected routes
- responsive layout
- sidebar navigation
- topbar
- notifications panel
- search
- filters
- pagination
- status badges
- empty states
- loading states
- error states
- form validation
- modal dialogs
- confirmation dialogs
- audit/history panels
- file upload components
- image/document preview
- timeline component
- map-ready component

## 6. Customer Portal

Pages:

- Customer Dashboard
- Create Shipment / Create Order
- My Orders
- Order Details
- Live Tracking
- Payment / Escrow Status
- Delivery Confirmation
- Return Request
- Dispute Request
- Receipts / Invoices
- Profile / Addresses
- Notifications
- Support

Functions:

- create order
- enter pickup/delivery address
- select service level
- enter package details
- view quote
- confirm order
- pay or see payment status
- track shipment
- view driver ETA
- confirm delivery with OTP/signature-ready UI
- request return
- open dispute
- upload evidence
- download receipt
- contact support

## 7. Merchant / Shipper Portal

Pages:

- Merchant Dashboard
- Products / SKUs
- Inventory Overview
- Orders
- Order Details
- Pickup Requests
- Shipment Labels
- Returns
- Disputes
- Earnings
- Documents
- Settings

Functions:

- create product/SKU
- view orders
- prepare shipment
- request pickup
- print/view label-ready screen
- track shipment
- handle returns
- upload documents
- view earnings
- view dispute evidence
- contact support

## 8. Warehouse Portal

Pages:

- Warehouse Dashboard
- Pick Queue
- Pack Station
- Scan Package
- Dispatch Staging
- Inventory
- Stock Movements
- Returns Inspection
- Damaged / Quarantined Stock
- Warehouse Reports

Functions:

- view pick tasks
- start picking
- scan item barcode/QR
- confirm SKU
- pack package
- enter weight/dimensions
- upload packing photo
- generate/view label-ready state
- mark ready for dispatch
- receive returns
- inspect return
- mark restocked/damaged/quarantined
- view stock movement history

## 9. Logistic Disponent Console

This is the operational command center.

Pages:

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

Functions:

- view all ready shipments
- filter by zone/time window/priority/risk
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

AI recommendation UI must show:

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

## 10. Driver App / PWA

Build driver UI as mobile-first and PWA-ready.

Pages:

- Driver Dashboard
- Available Jobs
- Active Job
- Pickup Flow
- Delivery Flow
- Failed Delivery
- Route / Navigation View
- Earnings
- Support
- Profile / Documents

Functions:

- go online/offline
- view available jobs
- accept/reject job
- view pickup address
- view delivery address
- scan package
- enter pickup OTP
- upload pickup photo
- start route
- send GPS check-in
- mark delivery attempted
- complete delivery
- enter customer OTP
- capture signature-ready input
- upload delivery photo
- select failed delivery reason
- contact Disponent/support
- view earnings

## 11. Fleet Manager Dashboard

Pages:

- Fleet Dashboard
- Vehicles
- Vehicle Details
- Driver Availability
- Maintenance
- Insurance/Documents
- Capacity Overview
- Fleet Reports

Functions:

- add/view vehicles
- view vehicle status
- view assigned driver
- view capacity
- view maintenance status
- view document expiry warnings
- view utilization

## 12. Finance Dashboard

Pages:

- Finance Dashboard
- Payments
- Escrow
- Ledger
- Payouts
- Refunds
- Commissions
- Invoices
- Reconciliation
- Finance Approval Queue

Functions:

- view payment status
- view escrow balances
- view immutable ledger entries
- view payout queue
- approve refund
- reject refund
- approve disputed escrow release
- view commission breakdown
- view invoices
- view reconciliation issues
- export finance records

Critical UI rule:

Never provide UI that edits ledger entries directly. Only allow reversing/correcting actions through approved workflows.

## 13. Support Dashboard

Pages:

- Support Dashboard
- Customer Tickets
- Delivery Issues
- Returns
- Disputes
- Communication History
- Evidence Timeline
- Support Escalations

Functions:

- view customer issue
- view order/shipment timeline
- view delivery proof
- view dispute evidence
- send message
- escalate to Disponent
- escalate to finance
- escalate to compliance
- add support note

## 14. Compliance Dashboard

Pages:

- Compliance Dashboard
- KYC Reviews
- Driver Documents
- Merchant Documents
- Restricted Items
- Risk Alerts
- Audit Logs
- Data Protection Requests
- Security Events

Functions:

- review driver documents
- review merchant documents
- view risk flags
- view AI compliance alerts
- view restricted item cases
- view personal-data access logs
- handle data export/delete-ready requests
- view security events

## 15. AI Command Center

Pages:

- AI Overview
- AI Agents
- AI Tasks
- AI Recommendations
- AI Approval Gates
- AI Provider Settings
- AI Cost / Token Usage
- AI Audit Logs
- AI Risk Events

Functions:

- view active AI agents
- view agent capabilities
- view AI task queue
- view AI recommendations
- approve/reject AI action
- view risk level
- view provider/model used
- view token/cost estimate
- configure AI provider
- configure allowed agents per provider
- view failed AI calls
- view AI audit trail

BYO-AI provider UI must support:

- OpenAI
- DeepSeek
- Anthropic
- Google Gemini
- Mistral
- Groq
- Ollama/local model
- Custom OpenAI-compatible endpoint

Provider form fields:

- provider name
- base URL
- model
- encrypted API key input
- allowed agents
- monthly budget
- rate limit
- status
- test connection button

Security UI rule:

Never show saved API keys after submission. Only show masked status.

## 16. Super Admin Dashboard

Pages:

- System Overview
- Users
- Roles & Permissions
- Organizations
- Warehouses
- Carriers
- Platform Settings
- Pricing Rules
- Zones
- Integrations
- AI Settings
- Audit Logs
- Security Settings
- System Health

Functions:

- manage users
- assign roles
- configure permissions
- manage platform settings
- configure zones
- configure pricing rules
- view all shipments
- view all finance records
- view all AI activity
- view all audit logs
- view system health

## 17. Tracking Page

Build public/private tracking UI.

Tracking page shows:

- tracking ID
- current status
- package timeline
- map-ready location panel
- ETA
- driver/courier info where allowed
- proof status
- delivery attempts
- support contact

Tracking timeline events:

- order created
- payment confirmed
- inventory reserved
- warehouse packed
- ready for dispatch
- tour planned
- driver assigned
- picked up
- in transit
- at hub
- out for delivery
- delivery attempted
- delivered
- proof accepted
- completed

## 18. Analytics Dashboard

Analytics pages:

- Operations Analytics
- Finance Analytics
- Driver Analytics
- Warehouse Analytics
- AI Automation Analytics
- Dispute Analytics

KPIs:

- on-time delivery rate
- first-attempt delivery success
- average delivery time
- failed delivery rate
- cost per delivery
- driver utilization
- vehicle utilization
- warehouse pick accuracy
- inventory accuracy
- dispute rate
- refund rate
- damage rate
- route efficiency
- ETA accuracy
- revenue per shipment
- escrow held balance
- platform commission
- AI automation rate
- AI override rate
- AI error rate

## 19. API Integration Requirements

Consume backend API groups:

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

Create:

- typed API client
- request/response types
- auth token handling
- refresh token handling
- error handling
- loading handling
- retry policy where safe

Use backend OpenAPI contract when available.

## 20. Status Badge System

Create reusable badges for:

- order status
- shipment status
- payment status
- warehouse status
- driver status
- dispute status
- return status
- AI risk level
- approval status
- delivery proof status

## 21. Proof And Evidence UI

Create UI components for:

- photo proof
- signature preview
- OTP verification status
- GPS verification status
- package scan status
- warehouse packing proof
- delivery timeline
- dispute evidence timeline
- locked evidence indicator

## 22. Notification UI

Implement:

- notification center
- read/unread states
- operational alerts
- AI alerts
- finance alerts
- dispute alerts
- driver delay alerts
- warehouse readiness alerts

## 23. Responsive Requirements

Must work well on:

- desktop
- tablet
- mobile
- driver mobile PWA
- warehouse tablet view
- Disponent large-screen command center

Driver app must be mobile-first.

Disponent console must be large-screen optimized.

## 24. Security Requirements

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

High-risk actions require confirmation and reason:

- approve refund
- release disputed escrow
- manual route override
- manual delivery completion
- driver suspension
- merchant suspension
- AI high-risk approval

## 25. Empty, Error, And Loading States

Every major page must have:

- loading state
- empty state
- error state
- retry state
- permission-denied state

## 26. Build Quality

Deliver:

- clean frontend code
- typed components
- reusable layout system
- role-based routing
- API client layer
- form validation
- responsive dashboards
- production-ready styling
- README
- environment variable template
- frontend acceptance report

## 27. Frontend Acceptance Criteria

The frontend is acceptable only when:

- Customer can create and track an order.
- Merchant can manage orders/products/pickup requests.
- Warehouse can pick, scan, pack, and mark ready for dispatch.
- Logistic Disponent can plan, approve AI tour recommendation, assign/reassign driver, and handle exceptions.
- Driver can accept job, complete pickup, complete delivery, and submit proof.
- Finance admin can view escrow, ledger, payouts, refunds, and approvals.
- Support can manage disputes and evidence timelines.
- Compliance can review documents/risk/security events.
- Super admin can manage users, roles, settings, zones, AI settings, and audit logs.
- AI Command Center shows agents, recommendations, approvals, providers, and audit logs.
- Tracking page shows complete timeline.
- All buttons are connected to real API handlers or clearly blocked with implemented disabled states.
- No required MVP functions are hidden behind "coming soon" placeholders.
- No fake provider links.
- No unconnected CTA buttons.
- No exposed secrets.
- Responsive layout works across desktop/tablet/mobile.

## 28. Final Frontend Instruction

Do not create a generic delivery frontend.

Do not bury the Logistic Disponent inside a normal admin page.

Do not leave buttons unconnected.

Build a complete industrial-grade frontend for an AI-agentic logistics operating system, with every required role, dashboard, workflow, state, approval gate, and operational function represented.
