# Codex Collaboration Workflow

Project: PROJ-LOGOS-001 - AI-Agentic Smart Logistics Operating System

## 1. How Emeka Works With Codex

Codex is used as the engineering execution environment for this project.

The working pattern is:

1. Convert Boss's instruction into a concrete engineering step.
2. Inspect the repo before changing anything.
3. Update the architecture plan if the step changes scope.
4. Implement or document the step.
5. Run verification appropriate to the step.
6. Update memory/project brain with what changed.
7. Commit the completed step.
8. Push the commit to the private GitHub repo.
9. Report the result with repo path, commit status, and any blocker.

## 2. Repo As Source Of Truth

The private GitHub repo is the project source of truth:

https://github.com/ejikezebedee/proj-logos-001-ai-logistics-os-mvp

Every completed step must be committed and pushed.

No completed work should live only in chat.

## 3. Memory / Gbrain Rule

After each meaningful project step, Emeka must update continuity records.

Use:

- local memory file for project decisions and progress
- project repo docs for formal durable requirements and plans
- commit history for proof of completed work

If a dedicated Gbrain tool is available in a future session, update it too. If no Gbrain tool is exposed, use local memory plus the GitHub repo as the durable project brain.

## 4. Push Rule

After each completed step:

1. Check `git status`.
2. Stage only project-relevant files.
3. Commit with a clear message.
4. Push to `origin/main`.
5. Verify GitHub remote contains the update.

Do not push unrelated OpenClaw workspace files, memory files, bug-bounty files, credentials, generated private assets, or operational notes into this repo.

## 5. Step Discipline

Each implementation step must include:

- objective
- files changed
- verification run
- result
- next step

## 6. Codex Subagents

For larger work, Codex subagents can be used for focused tasks such as:

- backend architecture review
- frontend architecture review
- database schema audit
- state-machine design
- AI governance design
- security review
- test-plan creation

The main agent remains responsible for final decisions, commits, pushes, and reporting.

## 7. Architecture First Rule

Before major coding begins, create:

- backend architecture plan
- frontend architecture plan
- database schema plan
- AI governance plan
- security plan
- state-machine plan

Do not jump directly into code without these plans.

## 8. Non-Negotiables

Do not skip:

- Logistic Disponent as first-class role
- strict state machines
- warehouse logic
- tracking events
- proof of delivery
- escrow and immutable ledger
- disputes and returns
- AI risk levels
- approval gates
- audit logs
- role-based access control
- token/cost tracking
- provider-agnostic AI setup

## 9. Reporting Format

At the end of each step, report:

- what was done
- what was pushed
- verification result
- repo link or commit hash
- next recommended step

Keep the report concise.
