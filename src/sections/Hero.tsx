'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'site', 'hero'), (doc) => {
            if (doc.exists()) {
                setHeroData(doc.data());
            }
        });
        return () => unsub();
    }, []);

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Default Fallback
    const bgImage = heroData?.image || "https://i.ibb.co/B5v368sz/herosectionimage.png";
    const title = heroData?.title || "Join Us";
    const subtitle = heroData?.subtitle || "This Sunday";
    const body = heroData?.body || "Discover the Life, Family & Purpose of God in a community waiting to welcome you.";

    // Logic: If admin sets "published" to false, maybe fall back to default? 
    // Assuming if data exists we show it, otherwise fallback.

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden">
            {/* Background Image - Parallax */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 will-change-transform"
            >
                <Image
                    src={bgImage}
                    alt="Worship Service"
                    fill
                    priority
                    className="object-cover scale-110"
                    sizes="100vw"
                    quality={85}
                />
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-24 md:pb-32">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl"
                >
                    <div className="flex flex-col border-l-4 border-white pl-8 md:pl-12 py-2 overflow-hidden bg-gradient-to-r from-black/50 to-transparent backdrop-blur-sm rounded-r-2xl">
                        <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white uppercase tracking-widest leading-tight">
                            <motion.span variants={fadeInUp} className="block origin-left">{title}</motion.span>
                            {/* Shine Effect Text */}
                            <motion.span
                                variants={fadeInUp}
                                className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-church-gold to-white bg-[length:200%_auto] animate-shine"
                            >
                                {subtitle}
                            </motion.span>
                        </motion.h1>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        className="pl-8 md:pl-12 mt-6"
                    >
                        <p className="text-gray-200 text-lg md:text-xl font-light tracking-wide mb-10 max-w-xl">
                            {body}
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative overflow-hidden rounded-full border border-gray-400 px-8 py-3 transition-all hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-black/30 backdrop-blur-sm"
                        >
                            <span className="relative z-10 text-white font-medium tracking-wider group-hover:text-black transition-colors duration-300">
                                Get Directions
                            </span>
                            <div className="absolute inset-0 -z-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
