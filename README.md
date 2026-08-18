## 🚀 Auto-Deploy (GitHub Actions)

A push to the `main` branch automatically builds and deploys the app to the
production server (PM2 process: `automart-frontend`, port `3000`).

The workflow lives at `.github/workflows/deploy.yml`.

### One-time setup

1. **Add these secrets** at
   `Repo → Settings → Secrets and variables → Actions`:

   | Secret name | Value |
   |---|---|
   | `SERVER_HOST` | `187.52.116.124` |
   | `SERVER_USERNAME` | `root` |
   | `SERVER_PASSWORD` | your server root password |
   | `SERVER_SSH_PORT` | `22` |
   | `APP_PORT` | `3000` |
   | `NEXT_PUBLIC_API_BASE_URL` | your backend API base URL |
   | `NEXT_PUBLIC_MAIN_DOMAIN` | your frontend domain / host |

   > ⚠️ Never commit `.env.local` — it is git-ignored. The workflow rebuilds
   > the env file from the secrets above automatically.

2. **Push to `main`** — the workflow will build and deploy automatically.
   You can also run it manually from the **Actions** tab.

The first time it runs, the workflow auto-installs Node.js 20 and PM2 on the
server if they are missing.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


