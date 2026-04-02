# Supabase + Vercel Deployment

## 1. Create Supabase values

From Supabase:

- `Connect` -> `Direct` -> `Transaction pooler` -> copy URI into `DATABASE_URL`
- `Connect` -> `Direct` -> `Direct connection` -> copy URI into `DIRECT_URL`
- `Settings` -> `API Keys` -> copy `Project URL` into `SUPABASE_URL`
- `Settings` -> `API Keys` -> copy `anon` key into `SUPABASE_ANON_KEY`

## 2. Add Vercel environment variables

In Vercel Project Settings -> `Environment Variables`, add:

- `DATABASE_URL`
- `DIRECT_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Optional for local-only admin bypass:

- `ALLOW_ADMIN_BYPASS=true`

Do not enable `ALLOW_ADMIN_BYPASS` in production.

## 3. Create database schema

Run this from the project root with the production env vars available:

```bash
npx prisma db push
node scripts/seed.mjs
```

`db push` creates the tables in Supabase. The seed script loads the city and service content used by the marketing and admin pages.

## 4. Deploy on Vercel

- Redeploy the project after the environment variables are saved
- Ensure the production deployment uses the same environment variables
- Verify:
  - homepage loads
  - `/admin/login` works
  - lead form submits
  - `/admin/cities/[city]` updates city pricing and phone numbers
