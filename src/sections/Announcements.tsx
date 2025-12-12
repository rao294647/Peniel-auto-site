'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Announcements() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const q = query(collection(db, "site/announcements/items"), orderBy("startDate", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Filter only published
            setEvents(items.filter((i: any) => i.published !== false));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    // Helper to format date badges
    const getBadgeDate = (dateStr: string) => {
        if (!dateStr) return { month: "DEC", day: "01" };
        const d = new Date(dateStr);
        const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
        const day = d.getDate().toString().padStart(2, '0');
        return { month, day };
    };

    if (loading) {
        return (
            <section className="relative w-full py-24 px-4 bg-[#0a0a0a]">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-[400px] bg-white/5 rounded-3xl" />)}
                </div>
            </section>
        )
    }

    if (events.length === 0) return null;

    return (
        <section className="relative w-full py-24 px-4 bg-[#0a0a0a]">
            <div className="container mx-auto max-w-7xl">

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {events.map((event) => {
                        // Determine fallback image if none provided
                        const image = event.image || "https://i.ibb.co/Hsn4NHN/prayer.jpg";
                        const startBadge = getBadgeDate(event.startDate);

                        return (
                            <motion.div
                                key={event.id}
                                variants={fadeInUp}
                                className="group relative h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
                            >
                                {/* Background Image */}
                                <Image
                                    src={image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Date Badges (Top Left) */}
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <div className="flex flex-col items-center justify-center w-12 h-14 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white shadow-lg">
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{startBadge.month}</span>
                                        <span className="text-lg font-bold leading-none">{startBadge.day}</span>
                                    </div>
                                    {event.endDate && event.endDate !== event.startDate && (
                                        <div className="flex flex-col items-center justify-center w-12 h-14 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white shadow-lg">
                                            <div className="text-[8px] text-white/50">TO</div>
                                            <span className="text-lg font-bold leading-none">{getBadgeDate(event.endDate).day}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Arrow Icon (Top Right) */}
                                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5M5 5h14v14" /></svg>
                                </div>

                                {/* Card Content (Bottom) */}
                                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{event.title}</h3>
                                    <p className="text-gray-300 text-sm font-light line-clamp-2">{event.body}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* View All Events Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-16"
                >
                    <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/5">
                        View All Events
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
