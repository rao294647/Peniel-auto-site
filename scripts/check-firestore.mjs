
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, limit } from "firebase/firestore";

// Hardcoded config from .env.local (verified in previous steps)
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

async function check() {
    const report = {};

    const readPath = async (path, type) => {
        try {
            if (type === 'doc') {
                const ref = doc(db, path);
                const snap = await getDoc(ref);
                return { exists: snap.exists(), data: snap.exists() ? snap.data() : null };
            } else {
                const ref = collection(db, path);
                // For verification of small collections like Bento (6 items), we remove limit to confirm total count.
                // If we expect large datasets, we'd use getCountFromServer, but here getAll is fine for verification.
                const q = path.includes('bento') ? query(ref) : query(ref, limit(5));
                const snap = await getDocs(q);
                return { count: snap.size, empty: snap.empty, samples: snap.docs.slice(0, 2).map(d => ({ id: d.id, ...d.data() })) };
            }
        } catch (e) {
            return { error: e.message, code: e.code };
        }
    };

    console.log("Checking paths...");
    const paths = [
        ['site/hero', 'doc'],
        ['site/bento/cards', 'collection'],
        ['bento', 'collection'],
        ['home/bento', 'collection'],
        ['home/cards', 'collection'],
        ['site/announcements', 'collection'], // incorrect path, likely empty or error usually `items` subcoll
        ['site/announcements/items', 'collection'],
    ];

    for (const [p, t] of paths) {
        console.log(`Checking ${p}...`);
        report[p] = await readPath(p, t);
    }

    console.log(JSON.stringify(report, null, 2));
}

check().catch(console.error);
