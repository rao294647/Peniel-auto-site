'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { fadeIn } from '@/components/motion/variants';

interface BannerData {
    imageUrl: string;
    title: string;
    link: string;
    published: boolean;
    buttonText?: string;
}

export default function Banner() {
    const [banner, setBanner] = useState<BannerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBanner() {
            try {
                const docRef = doc(db, 'site', 'banner');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBanner(docSnap.data() as BannerData);
                }
            } catch (error) {
                console.error("Error fetching banner:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBanner();
    }, []);

    if (loading) return null; // Or a subtle skeleton
    if (!banner || !banner.published) return null;

    return (
        <section className="relative w-full py-20 overflow-hidden bg-black text-white">
            {/* Background Image with Parallax-like fixed attachment or absolute */}
            <div className="absolute inset-0 z-0">
                {/* Use a dark overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={banner.imageUrl || "https://i.ibb.co/Hn8qw8G/worship-bg.jpg"}
                    alt="Banner Background"
                    className="w-full h-full object-cover opacity-50"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center">
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                        {banner.title || "Join Us This Sunday"}
                    </h2>

                    <div className="pt-4">
                        <Link href={banner.link || "/#giving"} className="inline-block">
                            <button className="px-8 py-4 bg-church-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                {banner.buttonText || "Learn More"}
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
