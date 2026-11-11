# Swing Force Ohio

Sales demo for a redesigned Swing Force Ohio site. Hitting instruction is appointment-only. Lesson requests go through the contact form — online booking and payments are not enabled.

```bash
npm install
npm run dev
```

Search engines are blocked (`noindex` plus `robots.txt`). Flip `NEXT_PUBLIC_ALLOW_INDEXING` only when the owner asks for the site to be indexed, then redeploy.

Copy `.env.example` to `.env.local` and add Resend keys to deliver lesson requests. Without those keys the form still submits and shows a labeled demo confirmation.

This project does not share environment variables, a database, or a deployment with any other client site.
