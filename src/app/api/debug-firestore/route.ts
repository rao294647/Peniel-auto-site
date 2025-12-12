
import { NextResponse } from 'next/server';
import { collection, getDocs, doc, getDoc, query, limit, getFirestore } from 'firebase/firestore';
import { dbClient, firebaseApp } from '@/lib/firebaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
    const report: any = {
        envCheck: {
            apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        },
        paths: {},
        debug: {}
    };

    try {
        let activeDb = dbClient;

        // Debug info about dbClient
        report.debug.dbClientType = typeof dbClient;
        report.debug.isDbClientNull = dbClient === null;
        report.debug.dbClientKeys = dbClient ? Object.keys(dbClient) : [];

        // Fallback if suspect
        if (!activeDb || !activeDb.type) {
            try {
                activeDb = getFirestore(firebaseApp);
                report.debug.fallbackUsed = true;
            } catch (e: any) {
                report.debug.fallbackError = e.message;
            }
        }

        if (!activeDb) throw new Error("dbClient and fallback failed");

        // Helper to read path
        const readPath = async (path: string, type: 'doc' | 'collection') => {
            try {
                if (type === 'doc') {
                    const ref = doc(activeDb, path);
                    const snap = await getDoc(ref);
                    return {
                        exists: snap.exists(),
                        data: snap.exists() ? snap.data() : null
                    };
                } else {
                    // Collection
                    const ref = collection(activeDb, path);
                    const q = query(ref, limit(5)); // limit 5 for sample
                    const snap = await getDocs(q);
                    return {
                        count: snap.size,
                        empty: snap.empty,
                        samples: snap.docs.map(d => ({ id: d.id, ...d.data() }))
                    };
                }
            } catch (err: any) {
                return { error: err.message, code: err.code };
            }
        };

        // 1. Check site/hero (doc)
        report.paths['site/hero'] = await readPath('site/hero', 'doc');

        // 2. Check site/bento/cards (collection) - PRIMARY TARGET
        report.paths['site/bento/cards'] = await readPath('site/bento/cards', 'collection');

        // 3. Alternative paths
        report.paths['bento'] = await readPath('bento', 'collection');
        report.paths['home/bento'] = await readPath('home/bento', 'collection');
        report.paths['home/cards'] = await readPath('home/cards', 'collection');

        // 4. Other collections for context
        report.paths['site/announcements'] = await readPath('site/announcements/items', 'collection');
        report.paths['site/gallery'] = await readPath('site/gallery/items', 'collection');
        report.paths['site/banner'] = await readPath('site/banner', 'doc');

    } catch (err: any) {
        report.globalError = err.message;
    }

    return NextResponse.json(report, { status: 200 });
}
