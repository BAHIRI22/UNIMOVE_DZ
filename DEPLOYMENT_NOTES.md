# UNIMOVE-DZ — Production Deployment Notes

## Variables Vercel (Environment Variables)

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Example | Required |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `unimove-dz.firebaseapp.com` | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `unimove-dz` | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `unimove-dz.appspot.com` | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789` | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123...:web:abc...` | Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `your-cloud-name` | Yes |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `unimove_unsigned` | Yes |

> For production, replace Cloudinary unsigned upload preset with a **signed upload** server route.

---

## Git Push & Deploy

1. Ensure all changes are committed:
   ```bash
   git add .
   git commit -m "Phase 16: Production Security + QA"
   ```

2. Push to your remote (GitHub / GitLab):
   ```bash
   git push origin main
   ```

3. Vercel auto-deploys on push. Check the build log in the Vercel dashboard.

---

## Redeploy Steps

If you need to redeploy manually:

1. Vercel Dashboard → Your Project → Deployments
2. Click **Redeploy** on the latest production deployment
3. Or trigger via CLI:
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Tests

Run these checks immediately after deploy:

- [ ] `/login` loads without 500 error
- [ ] `/dashboard` loads for authenticated user
- [ ] `/admin-panel` blocks non-admin users
- [ ] `/subscriptions` shows plans
- [ ] `/payments` shows user payment history
- [ ] `/qa-checklist` loads and shows green env checks
- [ ] Mobile viewport looks acceptable (test via browser dev tools)
- [ ] Firestore rules are deployed (separate Firebase CLI step)

---

## Demo Accounts (Development Only)

| Role | Phone | OTP |
|---|---|---|
| Admin | `0550000000` | `123456` |
| Driver | `0550000001` | `123456` |
| Test User | `0551234567` | `123456` |

> Demo OTP only works in `development` mode.

---

## Firestore Rules Deployment

```bash
firebase deploy --only firestore:rules
```

Make sure `firebase/firestore.rules` is deployed before public launch.

---

## Signed Upload (Production Checklist)

- [ ] Create a Cloudinary signed-upload API route (e.g. `/api/upload`)
- [ ] Replace frontend `uploadToCloudinary` to call your signed endpoint
- [ ] Remove or restrict the unsigned upload preset in Cloudinary dashboard

---

## Build Command

```bash
npm run build
```

Expected output: `Compiled successfully` with Exit code 0.

---

## Last Updated

Phase 16 — May 2026
