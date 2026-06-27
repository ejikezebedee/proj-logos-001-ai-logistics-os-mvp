# LOGOS Web

Frontend foundation for the PROJ-LOGOS-001 AI-Agentic Smart Logistics Operating System.

## Local Verification

Requires Node.js 20.9 or newer.

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

The development server opens the foundation route at `http://localhost:3000/disponent`.

Authentication uses a same-origin BFF. Access, refresh, session, and 2FA challenge values are stored only in `HttpOnly`, `SameSite=Strict` cookies. Copy `.env.example` to an ignored local file and set a unique `AUTH_SESSION_SECRET` of at least 32 characters before running authentication flows.

For explicit local mock mode, the email prefix selects a role (for example `customer@company.test`, `disponent@company.test`, or `finance@company.test`) and any password of at least eight characters is accepted. Prefix the local part with `2fa.` to exercise the 2FA flow; the mock-only verification code is `246810`. Production mode never uses these mock rules.

## Current Foundation Scope

- Next.js App Router with strict TypeScript and Tailwind CSS
- TanStack Query provider with conservative read retries and no mutation retries
- typed role, permission, and role-home registries for all required roles
- dedicated Logistic Disponent navigation and responsive command shell
- typed production and mock API adapter boundaries
- same-origin authentication routes with refresh rotation and signed role claims
- login, customer registration, password recovery, and 2FA-ready forms
- proxy and server-component permission enforcement with role-home redirects
- shared loading, empty, error, retry, and permission-denied foundations
- Vitest and Testing Library baseline

The production auth service expects the backend `/auth` contract described by `src/features/auth/types.ts`. Operational routes marked **Defined** are intentionally non-interactive in the current verified steps; they are not dead links or claims of completed functionality.

Copy `.env.example` to a local ignored environment file only when configuration is needed. Never place secrets in `NEXT_PUBLIC_*` variables or commit local environment files.
