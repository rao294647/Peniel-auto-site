
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Hardcoded config matching .env.local
const firebaseConfig = {
    apiKey: "AIzaSyCByYWU5fQxMsqn2Rj8SQglQeYXUwwWMb4",
    authDomain: "peniel-auto-7392.firebaseapp.com",
    projectId: "peniel-auto-7392",
    storageBucket: "peniel-auto-7392.firebasestorage.app",
    messagingSenderId: "78617378978",
    appId: "1:78617378978:web:797d2ed5b8881616b717fb"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

async function testUpload() {
    console.log("Starting Storage Test...");

    // Attempt anonymous upload first (unlikely to work if rules secure)
    // Then attempt signed-in upload if creds provided (we don't have them here, so we test basic public or connectivity)

    const testRef = ref(storage, `debug/test-${Date.now()}.txt`);
    const message = "This is a test upload from the diagnostic script.";

    try {
        console.log("Attempting upload...");
        const snapshot = await uploadString(testRef, message);
        console.log("Upload successful!");
        console.log("Ref:", snapshot.ref.fullPath);

        const url = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", url);
    } catch (error) {
        console.error("Upload Failed:", error.code, error.message);
        if (error.code === 'storage/unauthorized') {
            console.log("\nVERDICT: Permission Denied (403). Storage rules likely block writes.");
        }
    }
}

testUpload();
