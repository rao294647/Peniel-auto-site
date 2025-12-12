'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import Modal from '@/components/ui/Modal';
import { JoinGroupForm, VolunteerForm, MissionsForm, GiveOnlineView, PrayerRequestForm } from '@/components/forms/GetInvolvedForms';

type ActiveModal = 'join' | 'volunteer' | 'missions' | 'give' | 'prayer' | null;

export default function GetInvolved() {
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);

    const openModal = (type: ActiveModal) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const menuItems = [
        { id: 'join', label: 'Join House group nearby', action: () => openModal('join') },
        { id: 'volunteer', label: 'Volunteer and Serve.', action: () => openModal('volunteer') },
        { id: 'missions', label: 'Go on a missions trip.', action: () => openModal('missions') },
        { id: 'give', label: 'Give online.', action: () => openModal('give') },
        { id: 'prayer', label: 'Prayer Request', action: () => openModal('prayer') },
    ];

    const getModalContent = () => {
        switch (activeModal) {
            case 'join': return { title: 'Join a House Group', component: <JoinGroupForm /> };
            case 'volunteer': return { title: 'Volunteer & Serve', component: <VolunteerForm /> };
            case 'missions': return { title: 'Missions Trip Interest', component: <MissionsForm /> };
            case 'give': return { title: 'Give Online', component: <GiveOnlineView /> };
            case 'prayer': return { title: 'Prayer Request', component: <PrayerRequestForm /> };
            default: return { title: '', component: null };
        }
    };

    const { title, component } = getModalContent();

    return (
        <section className="relative w-full py-24 px-4 overflow-hidden min-h-[800px] flex items-center justify-center">
            {/* Background Image - Blurred */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://i.ibb.co/Hfn4DDQ1/Group-2212.jpg"
                    alt="Background"
                    fill
                    className="object-cover blur-sm opacity-50"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/80" /> {/* Dark overlay */}
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-2">
                    <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" className="text-4xl md:text-5xl font-bold text-white">
                        Get Involved
                    </motion.h2>
                    <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }} className="text-gray-400 font-light tracking-wide">
                        Find your purpose to join our team
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Featured Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] cursor-pointer"
                        onClick={() => openModal('missions')}
                    >
                        <div className="absolute top-6 left-6 z-20">
                            <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-white">
                                Missions
                            </span>
                        </div>

                        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>

                        <Image
                            src="https://i.ibb.co/DfZnm5gs/Whats-App-Image-2025-11-03-at-09-23-24.jpg"
                            alt="Mission Trip to Singapore"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Card Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                            <h3 className="text-3xl font-bold text-white mb-2">Mission Trip to Singapore</h3>
                            <div className="flex justify-between items-end">
                                <p className="text-gray-300 text-sm">Join us for missions trip in 2025.</p>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sudheer&apos;s S25 Ultra</p>
                                    <p className="text-[10px] text-gray-500">03 November 2025 11:02 am</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    {/* Right Column: Menu List */}
                    <div className="flex flex-col gap-6 p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm">
                        {menuItems.map((item, idx) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={item.action}
                                className="group relative w-full text-left p-1 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="relative flex items-center h-12 md:h-14 px-2">
                                    {/* Dot Indicator */}
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 group-hover:bg-church-gold/20 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-church-gold transition-colors" />
                                    </div>

                                    <span className="text-gray-200 group-hover:text-white font-medium text-sm md:text-base tracking-wide transition-colors">
                                        {item.label}
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                </div>
            </div>

            {/* Modal Integration */}
            <Modal isOpen={!!activeModal} onClose={closeModal} title={title}>
                {activeModal && component}
            </Modal>

        </section>
    );
}
