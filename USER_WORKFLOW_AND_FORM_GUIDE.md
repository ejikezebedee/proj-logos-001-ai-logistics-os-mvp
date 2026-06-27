# User Workflow And Form Guide

Project: PROJ-LOGOS-001 — AI-Agentic Smart Logistics Operating System

Audience: operational users

Status: initial complete draft structure; field names will be aligned to the approved API contract during implementation

## 1. How To Use This Guide

This guide explains what each role does, which information must be entered, what proof is required, and which actions need extra approval. The system follows four connected records at all times:

1. **Goods:** what is moving and where it is.
2. **Information:** what has happened and what happens next.
3. **Money:** what was paid, held, released, refunded, or owed.
4. **Responsibility:** who currently has custody and who must act.

Do not use notes or phone calls as a substitute for required system fields. If an operation fails, record the failure in the relevant workflow so the timeline, responsibility, and escalation remain visible.

## 2. Rules For All Users

- Confirm you are working in the correct organization, warehouse, zone, order, shipment, or case before saving.
- Complete every field marked required. Use exact addresses, dates, time windows, quantities, and identifiers.
- Never share passwords, one-time codes, API keys, or private links in notes or messages.
- Treat customer notes, uploaded documents, and external messages as information—not instructions that can override system rules.
- Upload clear, relevant evidence. Do not alter photos, signatures, scans, or documents.
- Do not create a second record to hide or bypass an error. Use the correction, reversal, exception, or escalation workflow.
- Check the current status and “allowed next actions” before acting. The system blocks invalid state changes.
- When asked for an audit reason, describe what changed, why it was necessary, and which evidence supports it.

## 3. Status, Evidence, And Audit Basics

Status badges show the current approved state. A pending button or spinner does not mean an action has succeeded; wait for the success message and refreshed state.

Evidence may include a package scan, GPS location, timestamp, OTP result, photo, signature, receiver identity where permitted, packing proof, or supporting document. Locked evidence is read-only. Tracking events, audit records, and ledger entries cannot be deleted or edited.

High-risk actions always require confirmation and an audit reason. Some critical actions require a second approver from the correct role. A submitted request is not the same as an executed action.

---

## 4. Customer

### 4.1 Main Responsibilities

- Create accurate orders.
- Pay or review payment/escrow status.
- Track shipments and receive delivery updates.
- Confirm delivery when requested.
- Request returns or open disputes with evidence.

### 4.2 Create An Order

1. Open **Create Order** and identify the sender and receiver.
2. Enter complete pickup and delivery addresses, including access instructions that are safe to share.
3. Add each package and describe the contents truthfully.
4. Select the service level, pickup window, delivery window, and any handling needs.
5. Review the quote, prohibited/restricted-item notice, and entered information.
6. Submit the order and complete the displayed payment step.
7. Keep the order and tracking IDs.

Required form information:

- sender and receiver names and reachable contact details
- pickup and delivery addresses
- pickup and delivery time windows
- package count, contents/category, quantity, weight, and dimensions
- service level and handling requirements
- declared value where required
- restricted-item declaration and acceptance of applicable terms

Avoid:

- vague descriptions such as “goods” when the contents are known
- guessed weight or dimensions
- an unreachable receiver or incomplete address
- selecting a service level that conflicts with the delivery window
- placing passwords, card data, or one-time codes in instructions

### 4.3 Track And Confirm Delivery

Use **My Orders** or the tracking page. Check the status timeline, ETA, delivery attempts, and proof status. Driver details and live location appear only where policy permits.

For delivery confirmation, verify the package and receiver before entering an OTP or signing. Report damage, missing items, or incorrect delivery before confirming when possible.

### 4.4 Request A Return Or Open A Dispute

For a return, select the item, reason, condition, requested outcome, pickup availability, and evidence. For a dispute, describe the specific problem, requested resolution, amount affected if relevant, and attach unaltered evidence.

Do not open duplicate cases. An active dispute may hold escrow until an evidence-based decision is approved.

---

## 5. Merchant

### 5.1 Main Responsibilities

- Maintain accurate products/SKUs and stock information.
- Prepare the correct goods for each order.
- Request pickups and provide labels/documents.
- Respond to returns and disputes with evidence.

### 5.2 Create Or Update A Product/SKU

Required form information:

- product name and unique SKU
- category and truthful description
- unit weight and dimensions
- value and handling/storage requirements
- barcode/QR identifier where used
- restricted, dangerous, fragile, temperature-controlled, or regulated status

Never mark a restricted or regulated item as ordinary cargo to bypass review.

### 5.3 Prepare A Shipment And Request Pickup

1. Open the order and compare the requested items with the picked goods.
2. Confirm SKU, quantity, packaging, condition, weight, and dimensions.
3. Attach required commercial, safety, or transport documents.
4. Generate or open the shipment label and place it on the correct package.
5. Select a realistic pickup window and location/contact.
6. Submit the pickup request and monitor its status.

Required pickup information includes pickup site, contact, time window, package count, total weight/dimensions, readiness time, handling needs, and document status.

Avoid requesting pickup before goods are packed, reusing a label, or changing contents after final preparation without updating the shipment.

### 5.4 Returns, Disputes, And Earnings

Review the evidence timeline before responding. Upload relevant packing, inventory, label, and communication evidence. Earnings are informational records; report a discrepancy through support or finance rather than trying to alter financial history.

---

## 6. Shipper

### 6.1 Main Responsibilities

- Create transport-ready shipment instructions on behalf of the sending organization.
- Confirm cargo, pickup readiness, documents, and service requirements.
- Track handover and resolve origin-side exceptions.

### 6.2 Prepare Transport Instructions

Required information:

- shipper organization and authorized contact
- origin, destination, and time windows
- package or load units, cargo type, quantity, weight, dimensions, and value
- required vehicle/equipment and handling conditions
- reference numbers and required transport/safety documents
- restricted-item or hazardous-material declaration

Confirm that the warehouse or pickup site can release the cargo during the selected window. Do not duplicate merchant orders or represent unverified cargo data as confirmed.

### 6.3 Handover And Tracking

Check that the package IDs, scans, labels, and documents match before handover. Use the shipment timeline for progress. Report origin delays or document problems as an exception so the Disponent can replan safely.

---

## 7. Warehouse Staff

### 7.1 Main Responsibilities

- Pick the correct inventory.
- Scan and verify every required item/package.
- Pack safely and record actual measurements.
- Stage only completed, identified packages.
- Receive and inspect returns as assigned.

### 7.2 Pick, Scan, Pack, And Stage

1. Open **Pick Queue** and start only a task assigned to your warehouse/zone.
2. Go to the listed bin and scan the bin and item.
3. Compare SKU, batch/serial details where required, quantity, and condition.
4. Record a shortage, mismatch, or damage instead of substituting silently.
5. At **Pack Station**, scan the picked items and package ID again.
6. Enter actual weight and dimensions; add packing/condition photos when required.
7. Confirm packaging and safety checks, then generate/open the correct label.
8. Scan the package into the specified staging lane.
9. Mark **Ready for Dispatch** only after all required scans, proof, labels, and documents pass.

Required task information:

- scanned task, bin, SKU/item, and package identifiers
- picked and packed quantities
- condition and discrepancy reason when applicable
- actual weight and dimensions
- packaging type and required packing proof
- label status, staging zone/lane, and handover readiness

The system must not dispatch an unscanned package. Never scan one item for another, estimate measurements without measuring, reuse labels, or stage a package in an unrecorded location.

### 7.3 Return Inspection

Scan the return and compare it with the authorized return. Record seal/packaging condition, item condition, completeness, photos, and inspection outcome. Select restock, damaged, quarantine, or other permitted disposition. Do not decide refunds; warehouse evidence supports the finance/support decision.

---

## 8. Warehouse Manager

### 8.1 Main Responsibilities

- Supervise queues, staffing, inventory accuracy, staging, quarantine, and reports.
- Review exceptions and approve warehouse actions allowed by policy.
- Protect traceability of stock movements and returned goods.

### 8.2 Daily Control Workflow

1. Review workload, aging pick/pack tasks, staging capacity, and readiness alerts.
2. Rebalance permitted assignments while preserving task ownership history.
3. Investigate shortages, scan mismatches, damaged stock, and quarantine items.
4. Confirm handover readiness with the Disponent queue.
5. Review stock movements and unresolved return inspections.

Manager actions require the affected warehouse/zone, reason, effective time, responsible staff, and supporting evidence. Do not force readiness around missing scans, overwrite movement history, or return quarantined stock to availability without an approved disposition.

---

## 9. Logistic Disponent / Logistikdisponent

### 9.1 Main Responsibilities

The Logistic Disponent controls transport and tour planning, driver/vehicle/carrier assignment, route correction, delay and failure handling, reassignment, and operational escalation. The Disponent does not edit ledger history, release disputed escrow, change roles, or delete users, evidence, tracking history, or audit logs.

### 9.2 Start-Of-Shift Command-Center Check

1. Confirm the operating organization, zone, shift/time window, and live-event connection.
2. Review **Ready-for-Dispatch Queue** and **Unassigned Shipments**.
3. Filter by zone, time window, priority, risk, capacity need, and readiness.
4. Review delay alerts, failed pickups/deliveries, exceptions, and pending approvals.
5. Confirm current driver, vehicle, and carrier availability before planning.

### 9.3 Review An AI Tour Recommendation

Every recommendation must show the proposed action, reason, confidence, risk level, affected shipments/orders, cost impact, SLA impact, and approval requirement.

Before deciding:

- confirm every shipment is ready for dispatch
- compare time windows, zones, capacity, cargo/vehicle compatibility, driver shift, documents, and current location
- inspect route restrictions and unresolved risk/exception flags
- check whether the recommendation changes custody, cost, SLA, or a prior commitment

Choose:

- **Approve** when the plan is valid and within your authority.
- **Reject** when it is unsafe, infeasible, incomplete, or inferior; enter a clear reason.
- **Manual override** only when a better controlled plan is required; confirmation and an audit reason are mandatory.

AI confidence is not proof. High-risk actions require the correct human approval, and critical actions may require dual approval.

### 9.4 Create A Manual Tour Plan

Required form information:

- plan date, operating zone/depot, and tour name/reference
- selected ready shipments and stop sequence
- pickup/delivery time windows and service priorities
- planned driver, vehicle, and/or carrier
- vehicle capacity and cargo compatibility check
- route, distance/ETA estimate, constraints, and risk notes
- manual planning/override reason

Do not add unscanned or not-ready packages. Resolve capacity, timing, document, and assignment conflicts before submission.

### 9.5 Assign Driver, Vehicle, Or Carrier

1. Open the tour/shipment and review current state and existing assignments.
2. Check driver availability, shift, qualification, documents, and workload.
3. Check vehicle type, capacity, location, maintenance, insurance, and cargo fit.
4. If using a carrier, check service zone, capacity, documents, performance, and terms shown.
5. Confirm effective time, instructions, and required approvals.
6. Submit and verify that the assignment event appears in the timeline/audit history.

Never assign a driver before the package is ready, a vehicle in maintenance, or an unqualified resource.

### 9.6 Split, Merge, Reassign, Or Reschedule

Review affected stops, custody, driver/vehicle capacity, customer windows, proof already collected, SLA/cost impact, and communications. Enter the operational reason and effective point. A manual route override requires confirmation and an audit reason.

Do not split/merge active routes when it would lose custody or proof traceability. Do not reassign work without notifying affected operational users through the recorded communication workflow.

### 9.7 Handle Delays, Failed Pickups, Failed Deliveries, And Exceptions

1. Open the alert/case and verify the latest timeline, GPS/status, driver report, customer availability, and proof.
2. Select the verified reason and severity; do not guess.
3. Choose a permitted response: contact, reschedule, reassign, reroute, return, or open an exception.
4. Record action owner, due time, customer/SLA impact, and communications.
5. Escalate to support, finance, or compliance when their authority is required.
6. Resolve only after the corrective action and evidence are recorded.

Required exception information includes type, affected shipment/tour, time/location, description, current custody, risk/severity, evidence, immediate action, owner, due time, escalation, and resolution reason.

### 9.8 End-Of-Shift Handover

Review unassigned ready shipments, active high-risk tours, unresolved exceptions, failed attempts, pending approvals, and stale communications. Record a handover note with owners and due times; do not close cases merely to clear the dashboard.

---

## 10. Driver

### 10.1 Main Responsibilities

- Keep availability accurate.
- Accept only jobs that can be performed safely and lawfully.
- Verify package custody at pickup.
- Provide truthful location/status updates.
- Complete delivery with the required proof or record a failed attempt.

### 10.2 Accept A Job And Complete Pickup

1. Go online only when ready to work.
2. Review pickup/delivery locations, cargo, equipment needs, time windows, route, and instructions.
3. Accept or reject with a reason; never accept for another driver.
4. At pickup, verify package ID and condition, then scan it.
5. Complete the required OTP, photo, timestamp, GPS, or other pickup proof.
6. Confirm pickup only after custody has actually transferred.

### 10.3 Complete Delivery Proof

1. Confirm the correct destination and receiver.
2. Scan the package and record the arrival/delivery attempt.
3. Collect the proof required for the shipment value/risk: GPS, OTP, photo, signature, receiver details where lawful, and notes.
4. Review the proof and submit once.
5. Wait for server confirmation before leaving when operationally safe.

A delivery cannot be completed without required proof. A location outside the permitted GPS tolerance needs Disponent approval; manual delivery completion requires confirmation, evidence, and an audit reason.

### 10.4 Failed Delivery Or Pickup

Select the exact reason, record time/location, describe what happened, add permitted evidence, and state whether the customer/contact was reached. Follow the displayed instruction to wait, reschedule, return, or contact the Disponent/support. Never mark delivered after an unsuccessful attempt.

Avoid sharing OTPs, uploading unrelated photos, editing proof, driving while operating the app, or using another person's account.

---

## 11. Fleet Manager

### 11.1 Main Responsibilities

- Maintain accurate vehicle availability, capacity, maintenance, insurance, and documents.
- Monitor driver availability and fleet utilization.
- Remove unsafe or non-compliant assets from service.

### 11.2 Vehicle And Maintenance Workflow

Required vehicle information includes plate/fleet number, type, capacity, fuel type, operating zone, status/location, assigned driver if applicable, maintenance status, and document/insurance expiry.

For maintenance, record issue/type, severity, odometer or usage reading, detected date, service provider, planned downtime, work completed, cost/reference, and return-to-service approval. Do not mark a vehicle available while safety work or required documents remain unresolved.

Driver suspension is a high-risk action requiring confirmation and an audit reason. Use compliance/support escalation when the issue is outside fleet authority.

---

## 12. Carrier

### 12.1 Main Responsibilities

- Publish truthful service capacity and operating coverage.
- Maintain carrier, vehicle, driver, insurance, and compliance documents.
- Accept and execute assignments under agreed constraints.
- Report exceptions promptly.

### 12.2 Capacity And Assignment Workflow

Required capacity information includes service zones, dates/time windows, vehicle/equipment type, load capacity, restrictions, contact, and availability status. Before accepting an assignment, review cargo, route, windows, documents, proof requirements, and exceptions.

Do not accept unavailable capacity, substitute resources without recorded approval, or conceal a delay. Report changes through the assignment/exception workflow so the Disponent can replan.

---

## 13. Freight Forwarder

### 13.1 Main Responsibilities

- Coordinate multi-party shipments, consolidations, carriers, and documents.
- Preserve package-level identity, custody, and timeline across handovers.
- Escalate transport/document exceptions.

### 13.2 Consolidation And Carrier Coordination

Required information includes linked shipments/packages, origin/destination, planned legs and handovers, selected carriers, cutoff/time windows, capacity, cargo compatibility, transport documents, and responsible contacts.

Before consolidation, confirm each package is eligible, identified, compatible, and within capacity. Never merge records in a way that loses package tracking or evidence. Record every carrier/hub handover and open an exception for missing or conflicting documents.

---

## 14. Support Agent

### 14.1 Main Responsibilities

- Handle tickets, delivery issues, returns, and disputes.
- Build a clear evidence timeline.
- Communicate accurately and escalate to the correct authority.

### 14.2 Ticket, Return, And Dispute Workflow

1. Verify the requester and authorized access to the order/case.
2. Review the full order, shipment, tracking, communication, proof, return, dispute, and payment timeline available to your role.
3. Classify the issue, priority, affected item/amount, and requested outcome.
4. Ask for only relevant missing evidence.
5. Add factual internal notes and clear customer communications.
6. Escalate operational issues to the Disponent, money decisions to finance, and restricted/risk/privacy issues to compliance.
7. Resolve only when the decision, action, evidence, and customer communication are recorded.

Required case information includes requester, affected order/shipment, category, description, impact, evidence, communication history, owner, due time/SLA, escalation, and resolution.

Do not promise refunds or escrow release without finance approval, alter evidence, expose internal/security data, or close a dispute without evidence.

---

## 15. Finance Admin

### 15.1 Main Responsibilities

- Review payments, escrow, immutable ledger entries, payouts, refunds, commissions, invoices, and reconciliation.
- Approve only permitted financial actions with evidence.
- Correct financial history through reversing/correcting entries, never direct edits.

### 15.2 Escrow, Refund, Payout, And Reconciliation Workflow

1. Confirm the organization, account, order/shipment, currency, and amount.
2. Review payment status, accepted delivery proof, dispute state, settlement window, prior entries, and approval threshold.
3. Compare the requested action with policy and supporting evidence.
4. Enter the decision, reason, references, and effective date.
5. Complete required confirmation/approval and verify the resulting ledger event.

Required approval information includes affected transaction/account, amount/currency, action type, reason/category, supporting evidence, policy/threshold, requester, and approval chain.

An active dispute blocks escrow release. Approving a refund or releasing disputed escrow is high risk and requires confirmation and an audit reason; critical cases may need dual approval. Never edit or delete a ledger entry, approve your own restricted request, or treat an approval request as completed payment.

---

## 16. Compliance Admin

### 16.1 Main Responsibilities

- Review KYC and operational documents.
- Handle restricted items, risk alerts, data-protection requests, and security events.
- Preserve evidence and access controls.

### 16.2 Document And KYC Review

Required review information includes subject/person/organization, document type and reference, issuing country/authority, issue and expiry dates, verification result, risk flags, evidence/reference, decision, reason, and next review date.

Check authenticity indicators, scope, expiry, identity match, and policy requirements. Use approved statuses such as pending, verified, rejected, or more-information-required; explain rejection without exposing sensitive detection rules.

### 16.3 Restricted Items, Risk, Privacy, And Security

For a risk or restricted-item case, record the affected entity/shipment, category, severity, source, evidence, immediate control, owner, escalation, decision, and review date. For a data request, verify identity/authority, request scope, legal basis/status, deadline, and access log before action.

Merchant suspension and other critical controls require confirmation, an audit reason, and the proper approval chain. Never delete audit/security events, reveal secret values, or approve a case based only on an AI recommendation.

---

## 17. Super Admin

### 17.1 Main Responsibilities

- Configure users, roles, permissions, organizations, warehouses, carriers, zones, pricing, integrations, AI settings, security, and system rules.
- Monitor system health and audit history.
- Keep operational, financial, and governance duties separated.

### 17.2 Users, Roles, And Permissions

Required user information includes name, verified contact, organization, role(s), permitted scope, status, and authentication/2FA policy. Required role information includes unique name, purpose, permissions, scope limits, and approval restrictions.

Apply least privilege. Review the impact before changing a role. Do not give broad admin rights to solve a narrow access problem, and do not remove the last safe administrator without an approved recovery plan.

### 17.3 Zones, Pricing, And System Rules

For zones, record name/code, geographic definition, service types, operating hours, restrictions, and effective dates. For pricing/rules, record scope, conditions, calculation/amount, currency, effective window, priority, approval requirement, and change reason.

Use preview/validation where available and avoid overlapping rules without a documented priority. Finance-impacting rule changes require the approved finance/governance process.

### 17.4 AI Provider And Agent Settings

Provider forms require provider name, base URL where applicable, model, API key on initial submission, allowed agents, monthly budget, rate limit, and status. Confirm the endpoint domain and provider owner before entering a credential. Saved keys are never shown again; only masked status is displayed.

Configure each agent with the minimum capabilities, tools, provider access, budget, and risk policy needed. Test connection does not authorize unrestricted agent execution.

### 17.5 Security And System Health

Investigate health/security alerts through their evidence and correlation references. Do not paste secrets into notes, disable protections as a routine workaround, delete audit history, or perform production infrastructure changes without explicit approval and an approved change process.

---

## 18. Reviewing AI Recommendations (All Authorized Roles)

AI can explain, summarize, predict risk, draft, and recommend. It cannot bypass permissions or approval gates.

Before deciding:

1. Verify the affected order, shipment, account, user, or case.
2. Read the reason—not only the headline.
3. Check confidence, risk level, cost impact, SLA impact, and evidence/data freshness.
4. Confirm the recommendation is within your role and organization scope.
5. Check whether new events or human knowledge contradict it.

Decision rules:

- **Approve:** the action is accurate, permitted, supported, and proportionate.
- **Reject:** the action is wrong, unsafe, stale, unsupported, or outside policy; record why.
- **Override:** use a specific alternative supported by evidence; enter an audit reason and accept the confirmation.
- **Escalate:** use when risk, value, compliance, dispute, or authority exceeds your role.

Risk handling:

- L1 low risk may run automatically when policy permits.
- L2 medium risk may need Disponent or other human approval.
- L3 high risk always requires human approval.
- L4 critical requires the correct dual approval.
- L5 prohibited actions are always blocked.

Never approve because confidence is high, accept an action you do not understand, or enter secrets into an AI prompt.

## 19. Mandatory Fields For Important Forms

| Form | Minimum required information |
| --- | --- |
| Order | parties/contacts, origin, destination, windows, packages/cargo, service, handling/restriction declaration |
| Shipment preparation | order/package IDs, SKU/contents, quantity, actual weight/dimensions, label, documents, readiness |
| Warehouse scan/pack | task/bin/item/package scans, quantities, condition, measurements, proof, staging lane |
| Tour plan | zone/date, ready shipments, stops/windows, capacity/compatibility, resources, route/risk, reason |
| Assignment | shipment/tour, driver/vehicle/carrier, availability/capacity checks, effective time, instructions |
| Pickup/delivery proof | shipment/package scan, time, GPS, identity, OTP/photo/signature as policy requires, notes |
| Exception/failure | entity, type, time/location, current custody, severity, evidence, action, owner, escalation |
| Return | order/item, reason, condition, outcome requested, pickup details, evidence |
| Dispute | affected transaction/order, issue, amount/outcome, timeline, evidence, contact history |
| Financial approval | transaction/account, action, amount/currency, policy, evidence, requester, reason, approval chain |
| Document/KYC review | subject, document/reference, issuer/dates, checks, risk, decision/reason, reviewer |
| AI provider | provider, base URL/model, new key input, allowed agents, budget, rate limit, status |
| Manual override | affected object, current/proposed state, operational reason, evidence, impact, confirmation |

The implemented forms may require additional domain fields, especially for oil/fuel, hazardous, regulated, or high-value logistics.

## 20. High-Risk Confirmation And Audit Reasons

The following actions require explicit confirmation and a reason:

- approve refund
- release disputed escrow
- manual route override
- manual delivery completion
- driver suspension
- merchant suspension
- AI high-risk approval

A useful audit reason answers: **What changed? Why is it necessary? What evidence supports it? What impact is expected?**

Good example: “Route R-104 manually changed because the verified bridge closure blocks Stop 3. Driver and customer were notified; alternate route adds 18 minutes and remains within the delivery window. Incident EVT-882 attached.”

Poor examples: “fix,” “urgent,” “AI said so,” or a copied password/secret.

## 21. Common Mistakes To Avoid

- Acting in the wrong organization, zone, warehouse, order, or shipment
- Entering estimated measurements as verified actual values
- Bypassing scans, proof, approval, or custody handover steps
- Using free-text notes instead of the exception/dispute/return workflow
- Marking a pickup or delivery complete before it happened
- Approving stale AI advice without checking current events
- Uploading unclear, altered, excessive, or unrelated evidence
- Creating duplicate records instead of correcting through approved workflows
- Treating a submitted approval request as an executed action
- Sharing secrets, OTPs, private keys, or full payment data

## 22. Implementation Follow-Up For This Guide

During UI implementation, each section will be linked to its final screen name, field labels, validation messages, role permissions, and backend state transitions. Screens will provide contextual help drawn from this guide. Final acceptance will verify that every enabled action has a real handler, every required form explains its mandatory fields, and every role can complete its primary workflow without relying on undocumented steps.
