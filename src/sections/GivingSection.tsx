'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GivingModal from '@/components/giving/GivingModal';

export default function GivingSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative w-full py-24 bg-[#080808]" id="giving">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-church-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-6xl px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: QR Code Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                    >
                        <div className="relative p-4 bg-white rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="relative w-72 h-72 lg:w-96 lg:h-96 border-4 border-black rounded-2xl overflow-hidden">
                                {/* Using a placeholder for the Main Display QR, simulating the look */}
                                <Image
                                    src="https://i.ibb.co/397rX5dZ/qr-code.png" /* Giving QR */
                                    alt="Giving QR Code"
                                    fill
                                    className="object-cover"
                                />

                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        <h2 className="text-5xl lg:text-7xl font-serif text-white mb-6">
                            GIVING
                        </h2>

                        <div className="space-y-6 text-gray-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                            <p>
                                At Peniel Church, your generosity helps us fulfill our mission of spreading the Gospel,
                                serving the community, and empowering lives through faith. Your contributions directly
                                support our outreach programs, discipleship training, worship services, and various
                                ministries that bring hope and transformation to individuals and families.
                            </p>
                            <p>
                                We believe in giving as an act of worship, reflecting our gratitude to God for His
                                abundant blessings. Together, we can make a difference, extending the love of Christ
                                to those in need and building a thriving, faith-filled community.
                            </p>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-10 py-4 bg-church-gold text-black font-bold text-lg rounded-full hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all transform hover:scale-105"
                            >
                                Support our ministry
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            <GivingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    );
}
