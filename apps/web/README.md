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

## Current Foundation Scope

- Next.js App Router with strict TypeScript and Tailwind CSS
- TanStack Query provider with conservative read retries and no mutation retries
- typed role, permission, and role-home registries for all required roles
- dedicated Logistic Disponent navigation and responsive command shell
- typed production and mock API adapter boundaries
- shared loading, empty, error, retry, and permission-denied foundations
- Vitest and Testing Library baseline

The current session adapter is deliberately isolated in `src/lib/auth/session.ts`. Replace it at that boundary when the backend authentication contract is available. Operational routes marked **Defined** are intentionally non-interactive in this foundation step; they are not dead links or claims of completed functionality.

Copy `.env.example` to a local ignored environment file only when configuration is needed. Never place secrets in `NEXT_PUBLIC_*` variables or commit local environment files.
