'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '@/lib/animations';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ArrowIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300", className)}
    >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

// Specific Card Component for Uniformity
const DashboardCard = ({
    children,
    className = "",
    href,
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    href?: string;
    delay?: number;
}) => {
    const Content = (
        <div className="relative w-full h-full bg-[#1a1a1a] rounded-3xl border border-white/5 overflow-hidden group hover:border-white/10 transition-colors">
            {children}
        </div>
    );

    return (
        <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={cn("relative", className)}
        >
            {href ? (
                <Link href={href} className="block w-full h-full">
                    {Content}
                </Link>
            ) : Content}
        </motion.div>
    );
};

export default function BentoGrid() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "site/bento/cards"));
        const unsub = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Order doesn't exist in DB yet, so we just take up to 5 items for the slots
            setCards(items.filter((i: any) => i.published !== false));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    // Placeholder data to match the design if DB is empty
    const placeholders = [
        { title: "JOIN US ONLINE", subtitle: "Streaming live every Sunday @ 9am & 11AM", image: "https://i.ibb.co/Hsn4NHN/prayer.jpg", link: "#" },
        { title: "EARLY MORNING PRAYERS", subtitle: "Join us daily @4AM", image: "https://i.ibb.co/Hsn4NHN/prayer.jpg", link: "#" },
        { title: "Checkout our latest reel", subtitle: "Discover more in our social media pages", image: "https://i.ibb.co/Hsn4NHN/prayer.jpg", link: "#" },
        { title: "LIVING IN THE NEW", subtitle: "6 DAY BIBLE PLAN BY SARAT YELLASIRI", image: "https://i.ibb.co/Hsn4NHN/prayer.jpg", link: "#" },
        { image: "https://i.ibb.co/Hsn4NHN/prayer.jpg", link: "#" } // Side image
    ];

    const getCard = (index: number) => cards[index] || placeholders[index];

    return (
        <section className="bg-[#0a0a0a] py-24 px-4">
            <div className="container mx-auto max-w-5xl">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">

                    {/* 1. Top Banner [Span 4] */}
                    <DashboardCard className="md:col-span-4 row-span-1" href={getCard(0).link}>
                        <div className="absolute inset-0">
                            <Image src={getCard(0).image} alt="Banner" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-center items-start">
                            <h3 className="text-3xl font-bold text-white mb-2 uppercase">{getCard(0).title}</h3>
                            <p className="text-gray-300">{getCard(0).subtitle}</p>
                            <ArrowIcon className="absolute top-6 right-6" />
                        </div>
                    </DashboardCard>

                    {/* 2. Sub Banner [Span 4] */}
                    <DashboardCard className="md:col-span-4 row-span-1" href={getCard(1).link} delay={0.1}>
                        <div className="absolute inset-0">
                            <Image src={getCard(1).image} alt="Banner" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-center items-start">
                            <h3 className="text-3xl font-bold text-white mb-2 uppercase">{getCard(1).title}</h3>
                            <p className="text-gray-300">{getCard(1).subtitle}</p>
                            <ArrowIcon className="absolute top-6 right-6" />
                        </div>
                    </DashboardCard>

                    {/* 3. Reels Card [Span 1, Row 2] -> actually Row 3, span 1, tall?? Image shows standard height but stacking vertically with side image? 
                        Let's check image: Reels is tall (vertical). Schedule is tall. Side image is tall.
                        They all occupy the same height row, maybe 2 rows height?
                        Let's make them row-span-2.
                    */}
                    <DashboardCard className="md:col-span-1 md:row-span-2" href={getCard(2).link} delay={0.2}>
                        <div className="absolute inset-0">
                            <Image src={getCard(2).image} alt="Reels" fill className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        </div>
                        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                            <ArrowIcon className="absolute top-4 right-4" />
                            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{getCard(2).title}</h3>
                            <p className="text-xs text-gray-400">{getCard(2).subtitle}</p>
                        </div>
                    </DashboardCard>

                    {/* 4. Schedule Card [Span 2, Row 2] */}
                    <DashboardCard className="md:col-span-2 md:row-span-2 bg-[#1a1a1a] !border-none" delay={0.3}>
                        <div className="p-8 h-full flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">Find your best time to join with us</h3>
                            <p className="text-gray-400 text-xs mb-6">Every week we gather for various ways of praising</p>

                            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { txt: "Wake Up Hyd Pastors Prayer: Every Monday @ 5:00AM" },
                                    { txt: "Tuesday: Men's Meeting @ 07:00 PM (1st Tuesday Of The Month)" },
                                    { txt: "Wednesday: Bible Study @ 07:00-09:00 PM" }, // & Thursday
                                    { txt: "Friday: Women's Meeting @ 12:30 PM & Whole Night Prayer @ 08:30 PM" },
                                    { txt: "Friday Mid-Week Service: Worship Service @ 7:00 PM" },
                                    { txt: "Saturday; Prayer Walk @ 05:00 AM (Every Month 1st Saturday)" }
                                ].map((item, i) => (
                                    <div key={i} className="px-4 py-3 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default whitespace-normal">
                                        {item.txt}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DashboardCard>

                    {/* 5. Side Image [Span 1, Row 2] */}
                    <DashboardCard className="md:col-span-1 md:row-span-2" href={getCard(4).link} delay={0.4}>
                        <div className="absolute inset-0">
                            <Image src={getCard(4).image} alt="Atmosphere" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </DashboardCard>

                    {/* 6. Bottom Banner [Span 4] */}
                    <DashboardCard className="md:col-span-4 row-span-1" href={getCard(3).link} delay={0.5}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-red-900">
                            {/* Fallback gradient if no image, or if image exists overlay it */}
                            <Image src={getCard(3).image} alt="Footer Banner" fill className="object-cover mix-blend-overlay opacity-60" />
                        </div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-center items-start">
                            <h3 className="text-4xl md:text-5xl font-black text-white/20 uppercase absolute inset-0 flex items-center justify-center pointer-events-none select-none tracking-tighter overflow-hidden">
                                LIVING IN THE NEW
                            </h3>
                            <div className="relative z-20">
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">LIVING IN THE NEW</h3>
                                <p className="text-gray-300 text-sm tracking-widest mt-1">6 DAY BIBLE PLAN BY SARAT YELLASIRI</p>
                            </div>
                            <ArrowIcon className="absolute top-6 right-6" />
                        </div>
                    </DashboardCard>

                </div>
            </div>
        </section>
    );
}
