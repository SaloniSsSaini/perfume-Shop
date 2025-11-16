
# Deployment Guide

Two simple ways to deploy the app: Render (full-stack) and Vercel/Netlify (frontend) + Render (backend).

Option A — Deploy both on Render (recommended)
1. Create a Render account.
2. Create a Web Service for backend:
   - Connect repo.
   - Root: backend
   - Build Command: npm install
   - Start Command: node server.js
   - Set Environment: PORT (Render provides) and ADMIN_KEY if desired.
3. Create a Static Site for frontend:
   - Root: frontend
   - Build Command: npm install && npm run build
   - Publish Directory: build
   - Set environment variable REACT_APP_API_BASE to your backend URL like https://your-backend.onrender.com/api

Option B — Vercel (frontend) + Render (backend)
1. Deploy backend on Render (as above).
2. Deploy frontend on Vercel:
   - Connect repo.
   - Build Command: npm install && npm run build
   - Output Directory: build
   - Add env var REACT_APP_API_BASE pointing to backend URL.

Notes:
- For admin endpoints, set x-admin-key header to ADMIN_KEY value.
- For emails, configure SMTP in backend and enable nodemailer settings.
