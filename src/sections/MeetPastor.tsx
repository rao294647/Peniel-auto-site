'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function MeetPastor() {
    return (
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://i.ibb.co/Y4t68gK6/DSC06513-1-1.png"
                    alt="Pastor Satyam Yellasiri"
                    fill
                    className="object-cover object-top md:object-center"
                    priority
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-2xl"
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-serif tracking-tight mb-8"
                    >
                        <span className="text-white font-light">MEET</span>{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-church-gold to-orange-400 font-normal">
                            OUR PASTOR
                        </span>
                    </motion.h2>

                    <div className="space-y-6">
                        <motion.p variants={fadeInUp} className="text-gray-200 text-lg md:text-2xl leading-relaxed font-light">
                            Pastor Satyam Yellasiri is the dedicated and passionate leader of Peniel Church.
                        </motion.p>
                        <motion.p variants={fadeInUp} className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                            With over 20 years of ministry experience, Pastor Satyam has a heart for guiding individuals toward a deeper relationship with God.
                        </motion.p>
                    </div>

                    <motion.div variants={fadeInUp} className="mt-10">
                        <button className="group flex items-center gap-3 text-white hover:text-church-gold transition-colors">
                            <span className="text-sm font-bold tracking-widest uppercase border-b border-white/30 group-hover:border-church-gold pb-1 transition-all">
                                Read Full Story
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
