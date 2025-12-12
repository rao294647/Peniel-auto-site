
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

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

const fullDocs = [
    // Row 1
    {
        title: "Join Us Online",
        imageUrl: "https://i.ibb.co/VWLhf0yC/image-34.png",
        link: "https://youtube.com",
        order: 1,
        size: "normal", // 1x1
        published: true,
        description: "Stream our services live every Sunday."
    },
    {
        title: "Early Morning Prayers",
        imageUrl: "https://i.ibb.co/nNbcbTZ1/image-34-1.png",
        link: "/events",
        order: 2,
        size: "wide", // 2x1
        published: true,
        description: "Start your day with prayer and community."
    },
    // Row 2 / Mixed
    {
        title: "Check out our latest reel",
        imageUrl: "https://i.ibb.co/bgsDkvM/reel-placeholder.jpg", // Placeholder
        link: "https://instagram.com",
        order: 3,
        size: "tall", // 1x2 Vertical
        published: true,
        description: "Highlights from our recent worship gathering."
    },
    {
        title: "Service Timings",
        imageUrl: "https://i.ibb.co/Xz9t0yW/timings.jpg", // Placeholder
        link: "/timings",
        order: 4,
        size: "normal",
        published: true,
        description: "Find your best time to join with us."
    },
    {
        title: "Worship & Community",
        imageUrl: "https://i.ibb.co/K2Z3q4m/worship.jpg", // Placeholder
        link: "/gallery",
        order: 5,
        size: "tall", // Right side tall image
        published: true,
        description: "Experience the joy of fellowship."
    },
    // Bottom
    {
        title: "Missions & Giving",
        imageUrl: "https://i.ibb.co/5G11g0S/giving.jpg", // Placeholder
        link: "/giving",
        order: 6,
        size: "big", // 2x2 or wide depending on implementation, user said "Banner at bottom" implies wide
        published: true,
        description: "Support the vision and outreach."
    }
];

async function reseed() {
    console.log("Reseeding FULL Bento Grid...");
    try {
        const col = collection(db, "site/bento/cards");

        // Optional: Clear existing to prevent duplicates/confusion, 
        // or just add new ones. Given the user wants a specific set, 
        // clearing then re-adding is cleaner for this "fix" script.
        const snapshot = await getDocs(col);
        if (!snapshot.empty) {
            console.log(`Deleting ${snapshot.size} existing cards to ensure clean state...`);
            for (const d of snapshot.docs) {
                await deleteDoc(doc(db, "site/bento/cards", d.id));
            }
        }

        for (const d of fullDocs) {
            const ref = await addDoc(col, {
                ...d,
                createdAt: new Date().toISOString()
            });
            console.log(`Created: ${d.title} (${d.size}) -> ${ref.id}`);
        }
        console.log("Full Seed Complete.");
    } catch (e) {
        console.error("Seeding Failed:", e.message);
        process.exit(1);
    }
}

reseed();
