# Security Policy

## Reporting a Vulnerability

Please report suspected vulnerabilities privately to the repository owner rather than opening a public issue. Include the affected page or component, reproduction steps, and potential impact. Do not include real credentials, personal data, or exploit payloads that could harm users.

Reports will be reviewed as time and availability permit. Please allow a reasonable opportunity to investigate and remediate before publicly disclosing a vulnerability.

## Secrets and Environment Configuration

- Never commit `.env`, `.env.local`, `.env.development`, or `.env.production` files.
- Use `.env.example` only for variable names and safe placeholder values.
- Configure deployment variables in the hosting provider's environment settings.
- Treat any credential committed to a public repository as exposed. Rotate it with its provider; deleting the file in a later commit does not remove it from Git history.
- Values prefixed with `VITE_` are bundled into client-side code and must never contain server-side secrets.
- Supabase publishable keys are intended for client use, but database access must be protected by appropriate Row Level Security policies.
- Keep privileged service-role keys, payment secret keys, and other server credentials in trusted server-side environments only.

## Supported Versions

Security fixes target the current default branch. Older commits may not receive security updates.
