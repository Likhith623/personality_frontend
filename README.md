# 🧠 Chatbot Frontend – CI/CD Deployment Guide

This repository contains the frontend for the chatbot application, automatically deployed to **Google Cloud Run** using **GitHub Actions**.

---

## 🚀 CI/CD Pipeline Overview

- **Trigger:** On every push or pull request to the `main` branch under `chatbot-new-frontend/`
- **Build Tool:** Node.js 18 (Next.js framework)
- **Hosting Platform:** Google Cloud Run (serverless)
- **Authentication:** Workload Identity Federation (no service account key file)

---

## 📂 Workflow Steps

1. **Checkout code**
2. **Set up Node.js**
3. **Install dependencies** using `npm install`
4. **Build project** using `npm run build`
5. **Authenticate with Google Cloud**
6. **Deploy to Cloud Run**

---

## ⚙️ Environment Variables

These secrets are securely stored in the GitHub repository:

| Variable Name             | Description                    |
|--------------------------|--------------------------------|
| `SUPABASE_URL`           | Supabase backend URL           |
| `SUPABASE_KEY`           | Supabase anonymous access key  |

---

## 🌐 Deployed URL

👉 [https://novife-frontend-3fpwwm2xna-uc.a.run.app](https://novife-frontend-3fpwwm2xna-uc.a.run.app)

This is the live frontend hosted on **Google Cloud Run**.

---

## 🔁 Rollback Instructions

1. Visit [Cloud Run Console](https://console.cloud.google.com/run)
2. Select the `novife-frontend` service
3. Go to the **Revisions** tab
4. Select a previously working revision
5. Click **Deploy**

---

## 🛠️ Troubleshooting Tips

| Problem                         | Solution                                                        |
|---------------------------------|-----------------------------------------------------------------|
| Build failing                   | Check for missing env variables or `next.config.mjs` issues     |
| Authentication error            | Reverify Workload Identity setup in GCP                         |
| Deployment not updating         | Clear cache or verify commit was pushed to the `main` branch    |
| GCP permissions denied          | Ensure correct IAM roles are assigned to service account        |

---

## 📁 File Structure

```bash
chatbot-new-frontend/
├── public/
├── pages/
├── components/
├── next.config.mjs
├── package.json
└── README.md
