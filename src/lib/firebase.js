'use client';

// Firebase client initialization. Reads public config from env.
// When the config is absent (dev/no-Firebase), everything downstream
// falls back to a local mock — the app never crashes on missing keys.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

let app = null;
let auth = null;

if (isFirebaseConfigured && typeof window !== 'undefined') {
  app = getApps().length ? getApp() : initializeApp(config);
  auth = getAuth(app);
}

export { app, auth };
