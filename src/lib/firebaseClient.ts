"use client";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = !getApps().length ? initializeApp(cfg) : getApp();

let db;
if (typeof window === 'undefined') {
    // Server-side / SSG / API Routes
    db = getFirestore(app);
} else {
    // Client-side
    try {
        db = initializeFirestore(app, {
            experimentalForceLongPolling: true
        });
    } catch (err) {
        db = getFirestore(app);
    }
}

export const firebaseApp = app;
export const auth = getAuth(app);
export const dbClient = db;
export const storageClient = getStorage(app);
