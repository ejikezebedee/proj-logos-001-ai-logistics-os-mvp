# Industrial Backend Requirements

Project: PROJ-LOGOS-001 - AI-Agentic Smart Logistics Operating System

## 1. Product Identity

Build a full industrial-grade backend for an AI-Agentic Smart Logistics Operating System.

This is not a toy delivery MVP. The backend must support real logistics operations across order intake, warehouse readiness, dispatch planning, route optimization, tracking, exceptions, returns, disputes, finance, escrow, compliance, analytics, and AI-agent orchestration.

The AI acts as the operating brain, but all high-risk actions must pass through this control chain:

AI recommendation -> rules engine validation -> permission check -> risk classification -> human approval gate when required -> execution -> immutable audit log.

## 2. Required Roles

Implement role-based access control for:

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
- ai_agent

The Logistic Disponent / Logistikdisponent is a first-class role.

The Logistic Disponent controls:

- transport planning
- tour planning
- driver assignment
- vehicle assignment
- carrier assignment
- route correction
- delay handling
- failed pickup handling
- failed delivery handling
- manual reassignment
- exception escalation
- live operations monitoring

The Logistic Disponent must not control:

- ledger edits
- escrow release in disputed cases
- role changes
- audit-log deletion
- user deletion
- finance rule changes

## 3. Core Backend Modules

Build as a modular monolith first, with clean boundaries that can later become microservices.

Required modules:

- auth-module
- user-module
- role-permission-module
- merchant-module
- customer-module
- warehouse-module
- inventory-module
- order-module
- shipment-module
- package-module
- disponent-module
- dispatch-module
- route-module
- tracking-module
- driver-module
- fleet-module
- carrier-module
- payment-module
- escrow-ledger-module
- return-module
- dispute-module
- notification-module
- ai-agent-module
- approval-gate-module
- audit-log-module
- analytics-module
- compliance-module
- admin-module

## 4. Architecture Requirements

Production-ready backend architecture:

```text
API Gateway / Backend API
  -> Modular backend services
  -> PostgreSQL
  -> Redis
  -> Queue/Event Bus
  -> Object Storage
  -> Search/Filtering layer
  -> AI Agent Runtime
  -> External providers
```

External provider categories:

- payment provider
- maps/GPS provider
- SMS/email/WhatsApp provider
- KYC provider
- carrier APIs
- accounting/ERP integration-ready layer

Recommended stack:

- Node.js + NestJS + TypeScript
- PostgreSQL
- Prisma or TypeORM
- Redis
- BullMQ or Temporal-style workflow queue
- S3-compatible object storage
- JWT + refresh tokens
- 2FA-ready authentication
- OpenAPI/Swagger contract

Alternative acceptable stack:

- Python FastAPI
- SQLAlchemy
- PostgreSQL
- Redis
- Celery/Temporal
- Pydantic
- OpenAPI

Default choice: Node.js + NestJS + TypeScript for fastest clean industrial structure unless a future codebase standard dictates otherwise.

## 5. Four Industrial Flows

The backend must always control:

1. Goods flow: where the physical package is.
2. Information flow: what the system knows about it.
3. Money flow: who paid, who is owed, who receives payout.
4. Responsibility: who has custody/accountability at each stage.

Every shipment must answer:

- What is the item?
- Where is it now?
- Who has custody?
- Who is responsible?
- What proof exists?
- What is the next allowed state?
- Who should be paid?
- Who should be refunded if something fails?
- What exception path applies?
- What audit evidence exists?

## 6. Industrial State Machines

Do not use loose status strings. Implement strict state machines.

### Order Status

- draft
- quoted
- booked
- payment_pending
- payment_authorized
- inventory_reserved
- warehouse_processing
- ready_for_dispatch
- transport_planned
- driver_assigned
- picked_up
- in_transit
- out_for_delivery
- delivery_attempted
- delivered
- proof_accepted
- settlement_pending
- completed
- cancelled

### Shipment Status

- created
- awaiting_dispatch
- planned
- assigned
- pickup_scheduled
- picked_up
- in_transit
- at_hub
- sorted
- out_for_delivery
- delivered
- failed
- returned
- lost
- damaged

### Payment Status

- not_required
- pending
- authorized
- captured
- held_in_escrow
- partially_released
- released
- refunded
- partially_refunded
- chargeback
- failed

### Dispute Status

- none
- opened
- evidence_collecting
- under_review
- decision_pending
- resolved_customer
- resolved_merchant
- resolved_driver
- resolved_platform
- closed

### Return Status

- return_requested
- return_approved
- return_rejected
- return_pickup_planned
- return_picked_up
- return_received
- inspection_pending
- refund_pending
- refund_completed
- restocked
- discarded
- closed

## 7. Mandatory State Rules

Enforce in code:

- Cannot assign driver if package is not ready.
- Cannot mark pickup complete without scan, OTP, or proof.
- Cannot mark delivered without required delivery proof.
- Cannot release escrow before proof is accepted.
- Cannot release escrow if active dispute exists.
- Cannot resolve dispute without evidence.
- Cannot refund without ledger entry.
- Cannot delete tracking history.
- Cannot delete audit logs.
- Cannot let AI execute high-risk finance/compliance actions without approval.
- Cannot dispatch an unscanned package.
- Cannot let driver mark delivery complete outside permitted GPS tolerance unless Disponent approval exists.

## 8. Database Models

Create migrations/models for at least:

- users
- roles
- permissions
- user_roles
- customers
- merchants
- drivers
- disponents
- warehouse_staff
- fleet_managers
- carriers
- vehicles
- warehouses
- warehouse_zones
- bins
- products
- skus
- inventory_items
- stock_movements
- orders
- order_items
- shipments
- packages
- package_events
- tracking_events
- tour_plans
- route_plans
- dispatch_assignments
- pickup_attempts
- delivery_attempts
- proof_of_delivery
- transport_exceptions
- returns
- disputes
- dispute_evidence
- payments
- escrow_accounts
- ledger_entries
- payouts
- refunds
- commissions
- invoices
- notifications
- documents
- webhook_events
- ai_providers
- ai_agents
- ai_agent_capabilities
- ai_tasks
- ai_context_snapshots
- ai_recommendations
- ai_action_requests
- ai_tool_calls
- ai_approval_gates
- ai_execution_results
- ai_feedback
- ai_risk_assessments
- approval_requests
- audit_logs
- security_events
- manual_overrides
- ledger_audit_events
- proof_access_logs
- risk_scores

## 9. AI-Agentic Backend Layer

Build an AI control plane.

Required agents:

- AI Logistics Orchestrator
- AI Order Agent
- AI Pricing Agent
- AI Warehouse Agent
- AI Disponent Agent
- AI Dispatch Agent
- AI Route Agent
- AI Tracking Agent
- AI Exception Agent
- AI Finance Agent
- AI Dispute Agent
- AI Compliance Agent
- AI Support Agent
- AI Analytics Agent

The AI Logistics Orchestrator coordinates all specialized agents.

The AI layer must support:

- task creation
- task routing
- agent capability registry
- tool permissions
- risk scoring
- human approval gates
- execution result logging
- AI recommendation history
- provider/model logging
- token/cost tracking
- failure handling
- fallback provider support

## 10. BYO-AI Provider System

Users/admins must be able to connect AI providers:

- OpenAI
- DeepSeek
- Anthropic
- Google Gemini
- Mistral
- Groq
- Ollama/local model
- Custom OpenAI-compatible endpoint

`ai_providers` fields:

- id
- owner_type
- owner_id
- provider_name
- base_url
- model
- encrypted_api_key
- allowed_agents
- monthly_budget
- rate_limit
- status
- created_at
- updated_at

Security requirements:

- API keys encrypted at rest.
- API keys never exposed to frontend.
- Every AI call logged with provider, model, user, task, cost estimate, latency, and result.
- Provider failure triggers fallback when configured.
- AI must not bypass role permissions.

## 11. AI Action Risk Levels

- L1 Low Risk: send ETA update, summarize order.
- L2 Medium Risk: reassign standard delivery, reschedule pickup.
- L3 High Risk: refund, penalty recommendation, high-value reroute.
- L4 Critical: disputed escrow release, account suspension.
- L5 Prohibited: delete audit logs, delete evidence, alter ledger history.

Rules:

- L1 can execute automatically.
- L2 can execute automatically only if policy allows; otherwise Disponent approval.
- L3 requires human approval.
- L4 requires dual approval from correct roles.
- L5 must be blocked always.

## 12. Event-Driven Tracking

Core events:

- order.created
- order.quoted
- payment.authorized
- payment.escrow_created
- inventory.reserved
- warehouse.pick_started
- warehouse.item_scanned
- warehouse.packed
- shipment.ready_for_dispatch
- ai.disponent.plan_recommended
- disponent.plan_approved
- driver.assigned
- driver.accepted
- pickup.completed
- shipment.in_transit
- shipment.delayed
- shipment.route_deviation_detected
- hub.arrived
- out_for_delivery
- delivery.attempted
- delivery.completed
- proof.accepted
- escrow.release_requested
- escrow.released
- return.requested
- dispute.opened
- dispute.resolved
- order.completed

Each tracking event must answer:

- what happened
- to which package/shipment
- where it happened
- when it happened
- who/what caused it
- what proof exists
- what next action is allowed

## 13. Proof Of Delivery

Implement:

- GPS location
- timestamp
- driver identity
- customer OTP
- photo proof
- signature
- package scan
- delivery note
- device metadata

Proof rules:

- Low-value delivery: GPS + OTP or signature.
- Medium-value delivery: GPS + OTP + photo.
- High-value delivery: GPS + OTP + photo + signature + ID check if legally allowed.
- Disputed delivery: proof locked from modification.

Use object storage for photos/signatures/documents. Store only safe references in the database.

## 14. Warehouse And Inventory Logic

Implement:

- product/SKU creation
- inventory item creation
- stock reservation
- stock movement
- pick task
- pack task
- barcode/QR scan
- package label generation-ready logic
- ready-for-dispatch transition
- return inspection
- damaged/quarantined stock state

Warehouse flow:

Order confirmed -> inventory reserved -> pick task generated -> item scanned -> package packed -> package weighed/measured -> label generated -> staged for dispatch -> ready_for_dispatch.

## 15. Logistic Disponent Backend

Dedicated Disponent functions:

- ready-for-dispatch queue
- unassigned shipment queue
- tour plan creation
- AI tour recommendation
- driver assignment
- vehicle assignment
- carrier assignment
- manual reassignment
- route board
- exception queue
- delay handling
- failed pickup handling
- failed delivery handling
- carrier comparison-ready structure
- approval queue
- live operations event feed

Disponent endpoints:

- GET /disponent/queue
- GET /disponent/live-map
- GET /disponent/exceptions
- POST /disponent/tour-plans
- POST /disponent/tour-plans/:id/approve
- POST /disponent/tour-plans/:id/reject
- POST /disponent/assign-driver
- POST /disponent/reassign-driver
- POST /disponent/assign-carrier
- POST /disponent/exceptions/:id/resolve

## 16. Driver Execution Backend

Implement:

- driver job queue
- accept/reject job
- pickup verification
- GPS check-ins
- delivery attempt
- delivery completion
- failed delivery reason
- proof upload
- driver earnings view
- driver status online/offline/busy

Driver endpoints:

- GET /driver/jobs
- POST /driver/jobs/:id/accept
- POST /driver/jobs/:id/reject
- POST /driver/pickup/:shipmentId/complete
- POST /driver/delivery/:shipmentId/attempt
- POST /driver/delivery/:shipmentId/complete
- POST /driver/location
- GET /driver/earnings

## 17. Payment, Escrow, And Ledger

Implement immutable ledger logic.

Entities:

- payments
- escrow_accounts
- ledger_entries
- payouts
- refunds
- commissions
- invoices

Ledger rule:

Never edit financial history. Only create reversing/correcting entries.

Escrow logic:

If delivery proof is accepted, no active dispute exists, and settlement window passed, release escrow. Otherwise hold escrow.

Finance admin must approve:

- large refund
- manual refund
- disputed escrow release
- manual payout correction
- commission rule changes

## 18. Returns And Disputes

Return flow:

Customer requests return -> policy check -> return approved/rejected -> AI Disponent schedules return pickup -> driver collects item -> warehouse receives return -> inspection happens -> refund/replacement decision -> ledger updated -> case closed.

Dispute flow:

Dispute opened -> AI Dispute Agent collects evidence -> evidence timeline generated -> AI recommends decision -> support/finance approves -> ledger/refund/release action executed -> audit log saved.

## 19. Notification System

Support:

- email
- SMS
- WhatsApp-ready provider
- push-ready provider
- in-app notifications
- webhooks

Notification examples:

- order created
- payment confirmed
- package ready
- driver assigned
- driver near arrival
- delivery failed
- delivery completed
- return approved
- dispute opened
- refund processed

## 20. Security Requirements

Implement:

- RBAC
- ABAC-ready policies
- 2FA-ready auth
- JWT refresh-token rotation
- rate limiting
- request validation
- input sanitization
- webhook signature verification
- object storage access control
- sensitive field encryption
- audit logs
- security events
- admin action logs
- proof access logs
- AI tool-call logs
- database backups-ready configuration

GDPR-ready requirements:

- data export-ready structure
- data deletion/anonymization-ready structure
- retention policy-ready structure
- personal-data access logs
- privacy-by-role access control

## 21. API Contract

Generate and maintain OpenAPI/Swagger documentation for:

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

## 22. Testing Requirements

Automated tests must cover:

- auth and permissions
- role access control
- state-machine transitions
- warehouse pick/pack flow
- driver assignment
- pickup proof
- delivery proof
- escrow hold/release
- dispute blocks escrow release
- refund creates ledger entry
- AI low-risk action execution
- AI high-risk approval gate
- AI prohibited action blocked
- audit logs created
- audit logs not deletable
- ledger entries immutable
- driver cannot deliver without proof
- package cannot dispatch without scan

## 23. Seed Data

Provide seed data for:

- super admin
- logistic disponent
- warehouse staff
- driver
- merchant
- customer
- finance admin
- sample warehouse
- sample vehicle
- sample product/SKU
- sample order
- sample shipment
- sample AI provider placeholder
- sample AI agents

## 24. Backend Deliverables

Deliver:

- working backend code
- database migrations
- seed script
- OpenAPI/Swagger docs
- README with local run instructions
- environment variable template
- architecture document
- database schema document
- AI-agent governance document
- state-machine document
- test suite
- acceptance report

## 25. Backend Acceptance Criteria

The backend is acceptable only when:

- Customer can create an order.
- Merchant can prepare shipment.
- Warehouse can pick, scan, pack, and mark ready for dispatch.
- Logistic Disponent can plan and assign shipment.
- AI Disponent can recommend route/tour plan.
- Driver can accept, pick up, and deliver with proof.
- Tracking timeline updates correctly.
- Payment can be held in escrow.
- Escrow does not release without proof.
- Active dispute blocks escrow release.
- Return workflow works.
- Dispute workflow works.
- Finance ledger is immutable.
- AI cannot perform high-risk actions without approval.
- AI cannot perform prohibited actions at all.
- Audit logs cannot be deleted.
- OpenAPI docs are complete.
- Tests pass.
- No secrets are committed.
- No API keys are exposed to frontend.

## 26. Execution Rule

Before making major architectural choices, write a short backend architecture plan first, then implement step by step.

Do not skip the Logistic Disponent role.

Do not build a generic delivery app.

Build the backend as an industrial-grade AI-agentic logistics operating system.
