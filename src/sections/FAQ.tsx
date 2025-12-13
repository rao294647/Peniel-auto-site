'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/components/motion/variants';

const faqs = [
    {
        question: "What is Peniel’s mission?",
        answer: "Our mission is to lead people into a life-changing, face-to-face encounter with God. Through worship, teaching, prayer, and community, we help individuals grow spiritually and walk confidently in the purpose God has for them."
    },
    {
        question: "How can I get involved in Peniel’s ministries?",
        answer: "There are many ways to serve and grow at Peniel! You can join a ministry team, participate in prayer groups, volunteer at events, help with worship or media, or join one of our fellowship groups. Speak to our team on Sunday or contact us anytime—we’d love to help you get connected."
    },
    {
        question: "When and where are the weekly services held?",
        answer: (
            <>
                We gather every week at our Kompally campus behind Cine Planet, Hyderabad.<br />
                <strong>Sunday Worship:</strong> 8:00 AM & 11:00 AM<br />
                <strong>Youth Service:</strong> First Sunday at 7:00 PM<br />
                We also host weekly Bible studies, prayer meetings, and special gatherings throughout the month.
            </>
        )
    },
    {
        question: "Does Peniel offer any resources for spiritual growth?",
        answer: "Yes! We offer Bible studies, prayer gatherings, sermon archives, early morning prayers, and special teaching series that help you grow deeper in faith. Our YouTube channel also has weekly messages and worship sessions you can revisit anytime."
    },
    {
        question: "Can I submit a prayer request?",
        answer: "Absolutely. We believe in the power of prayer, and our team is committed to praying for you. You can submit a prayer request through our website, app, or speak to one of our leaders during any service."
    },
    {
        question: "How can I stay updated on Peniel’s events and news?",
        answer: "The best way to stay connected is through our website, social media pages, and YouTube channel. We also share regular announcements during services. If you're part of the Peniel Church Connect app, you’ll receive instant updates and notifications for all upcoming events."
    }
];

const AccordionItem = ({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={cn("text-lg md:text-xl font-medium transition-colors", isOpen ? "text-white" : "text-gray-400 group-hover:text-white")}>
                    {item.question}
                </span>
                <span className={cn("ml-4 relative flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300", isOpen ? "rotate-45" : "rotate-0")}>
                    {/* Plus Icon made of spans for cleaner animation if needed, or simple SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-gray-400 font-light leading-relaxed pr-8">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default, or null

    return (
        <section className="relative w-full py-24 bg-[#050505] overflow-hidden" id="faq">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Header */}
                    <motion.div
                        variants={fadeIn('right', 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col justify-start pt-4"
                    >
                        <h2 className="text-[5rem] md:text-[8rem] font-serif leading-none tracking-tight mb-8 bg-gradient-to-br from-[#7B61FF] via-[#FF9F9F] to-[#FF5F5F] text-transparent bg-clip-text">
                            FAQ
                        </h2>

                        <p className="text-gray-400 leading-relaxed text-lg max-w-md">
                            Here you’ll find answers to some common questions about Peniel’s mission, services, and community activities.
                            We’re here to support and guide you in every step of your spiritual journey.
                            If you have more questions, feel free to reach out. We’re excited to connect with you!
                        </p>
                    </motion.div>

                    {/* Right Column: Accordion */}
                    <motion.div
                        variants={fadeIn('left', 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className="flex flex-col">
                            {faqs.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    item={item}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
