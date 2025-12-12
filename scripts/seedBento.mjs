
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCByYWU5fQxMsqn2Rj8SQglQeYXUwwWMb4",
    authDomain: "peniel-auto-7392.firebaseapp.com",
    projectId: "peniel-auto-7392",
    storageBucket: "peniel-auto-7392.appspot.com",
    messagingSenderId: "78617378978",
    appId: "1:78617378978:web:797d2ed5b8881616b717fb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docs = [
    {
        title: "Join Us Online",
        imageUrl: "https://i.ibb.co/VWLhf0yC/image-34.png",
        link: "/online",
        order: 1,
        size: "normal",
        published: true,
        createdAt: new Date().toISOString()
    },
    {
        title: "Early Morning Prayers",
        imageUrl: "https://i.ibb.co/nNbcbTZ1/image-34-1.png",
        link: "/events",
        order: 2,
        size: "wide",
        published: true,
        createdAt: new Date().toISOString()
    }
];

async function seed() {
    console.log("Seeding Bento Cards to site/bento/cards...");
    try {
        const col = collection(db, "site/bento/cards");
        for (const d of docs) {
            const ref = await addDoc(col, d);
            console.log(`Created doc: ${ref.id}`);
        }
        console.log("Seeding Complete.");
    } catch (e) {
        console.error("Seeding Failed:", e.message);
        if (e.code === 'permission-denied') {
            console.log("\nACTION REQUIRED: Firestore Security Rules likely block public writes.");
            console.log("To fix for testing, go to Firebase Console -> Firestore -> Rules and allow write: if true; temporarily.");
        }
        process.exit(1);
    }
}

seed();
