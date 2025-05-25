# 🧠 Chatbot Frontend – CI/CD Deployment Guide

This repository contains the frontend for the chatbot application, automatically deployed to **Google Cloud Run** using **GitHub Actions**.

---

## 🚀 CI/CD Pipeline Overview

- **Trigger:** On every push or pull request to the `main` branch under `chatbot-new-frontend/`
- **Build Tool:** Node.js 18 (Next.js framework)
- **Hosting Platform:** Google Cloud Run (serverless)
- **Authentication:** Workload Identity Federation (no service account key file)

---

## 📂 Workflow Stages

1. **Build Stage:**
   - Checkout code
   - Install dependencies
   - Build the frontend app with `npm run build`

2. **Deploy to Dev:**
   - Auto-deploys to **Cloud Run Dev** after successful build

3. **Manual Approval for Prod:**
   - Requires manual approval for production deployment

4. **Deploy to Prod:**
   - Deploys to **Cloud Run Prod** after approval

---

## 🌐 Deployed URLs

| Environment   | URL                                                                 |
|---------------|----------------------------------------------------------------------|
| Development   | 👉 [https://novife-frontend-dev-3fpwwm2xna-uc.a.run.app](https://novife-frontend-dev-3fpwwm2xna-uc.a.run.app) |
| Production    | 👉 [https://novife-frontend-prod-3fpwwm2xna-uc.a.run.app](https://novife-frontend-prod-3fpwwm2xna-uc.a.run.app) |

---

## ⚙️ Environment Variables

These are securely stored in **GitHub Actions Secrets**:

| Variable Name    | Description                         |
|------------------|-------------------------------------|
| `SUPABASE_URL`   | Supabase backend URL                |
| `SUPABASE_KEY`   | Supabase anonymous access key       |

These are injected into the deployment automatically.

---

## 🔁 Rollback Instructions

1. Open [Google Cloud Run Console](https://console.cloud.google.com/run)
2. Select either `novife-frontend-dev` or `novife-frontend-prod`
3. Click on the **Revisions** tab
4. Select a previous working revision
5. Click **Deploy**

---

## 🛠️ Troubleshooting Tips

| Issue                          | Possible Solution                                                |
|-------------------------------|------------------------------------------------------------------|
| Build failing                 | Check for missing `env` variables or `next.config.mjs` issues    |
| Auth error in GitHub Actions | Ensure correct GCP Workload Identity Federation setup            |
| Prod not deploying           | Make sure manual approval is given after dev deployment          |
| GCP permission errors         | Check IAM roles assigned to the GitHub Actions service identity  |

---

## 📁 File Structure

```bash
chatbot-new-frontend/
├── public/               # Static assets
├── pages/                # Next.js routes
├── components/           # Reusable components
├── next.config.mjs       # Next.js config
├── package.json          # Scripts & dependencies
├── .env.local            # Local environment variables (gitignored)

