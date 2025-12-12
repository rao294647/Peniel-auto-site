import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCByYWU5fQxMsqn2Rj8SQglQeYXUwwWMb4",
    authDomain: "peniel-auto-7392.firebaseapp.com",
    projectId: "peniel-auto-7392",
    storageBucket: "peniel-auto-7392.appspot.com",
    messagingSenderId: "78617378978",
    appId: "1:78617378978:web:797d2ed5b8881616b717fb"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
});

const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
