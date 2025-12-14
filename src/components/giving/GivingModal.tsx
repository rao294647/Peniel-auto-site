'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { uploadToImgBB } from '@/lib/imgbb';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';

interface GivingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'form' | 'payment' | 'proof' | 'success';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.9, y: 20 },
};

const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export default function GivingModal({ isOpen, onClose }: GivingModalProps) {
    const [step, setStep] = useState<Step>('form');
    const [loading, setLoading] = useState(false);
    const [qrUrl, setQrUrl] = useState("https://i.ibb.co/397rX5dZ/qr-code.png"); // Default
    const [proofFile, setProofFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        purpose: 'Ministry',
    });

    // Fetch QR Code Config
    useEffect(() => {
        if (isOpen) {
            getDoc(doc(db, 'site', 'giving')).then((snap) => {
                if (snap.exists() && snap.data().qrUrl) {
                    setQrUrl(snap.data().qrUrl);
                }
            }).catch(err => console.error("Error fetching Giving config:", err));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNext = () => {
        // Basic validation
        if (!formData.name || !formData.phone) {
            alert("Please fill in Name and Phone.");
            return;
        }
        setStep('payment');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProofFile(e.target.files[0]);
        }
    };

    const handleSubmitProof = async () => {
        if (!proofFile) {
            alert("Please select a screenshot first.");
            return;
        }

        setLoading(true);
        try {
            // 1. Upload to ImgBB
            const screenshotUrl = await uploadToImgBB(proofFile);

            // 2. Save to Firestore
            await addDoc(collection(db, 'site/giving/submissions'), {
                ...formData,
                screenshotUrl,
                submittedAt: serverTimestamp(),
                status: 'pending' // For admin review
            });

            setStep('success');
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to upload. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-lg bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                            <h3 className="text-xl font-serif text-white">
                                {step === 'form' && 'Support Our Ministry'}
                                {step === 'payment' && 'Scan to Give'}
                                {step === 'proof' && 'Confirm Payment'}
                                {step === 'success' && 'Thank You!'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">

                                {/* STEP 1: FORM */}
                                {step === 'form' && (
                                    <motion.div
                                        key="form"
                                        variants={slideVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all"
                                                placeholder="+91 ..."
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Address (Optional)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all"
                                                placeholder="City, State"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Purpose of Giving</label>
                                            <select
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all appearance-none"
                                                value={formData.purpose}
                                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                            >
                                                <option value="Ministry">Ministry</option>
                                                <option value="Tithe">Tithe</option>
                                                <option value="Offering">Offering</option>
                                                <option value="Food">Food</option>
                                                <option value="Church Equipment">Church Equipment</option>
                                                <option value="New Land Needs">New Land Needs</option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={handleNext}
                                            className="w-full mt-4 bg-gradient-to-r from-church-gold to-yellow-600 text-black font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all transform hover:scale-[1.02]"
                                        >
                                            Proceed to Pay
                                        </button>
                                    </motion.div>
                                )}

                                {/* STEP 2: PAYMENT (QR) */}
                                {step === 'payment' && (
                                    <motion.div
                                        key="payment"
                                        variants={slideVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="p-4 bg-white rounded-2xl shadow-xl">
                                            <div className="relative w-48 h-48">
                                                <Image
                                                    src={qrUrl}
                                                    alt="QR Code"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium mb-1">Scan to pay using UPI.</p>
                                            <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm, etc.</p>
                                        </div>

                                        <button
                                            onClick={() => setStep('proof')}
                                            className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-all"
                                        >
                                            Upload Payment Screenshot
                                        </button>
                                        <button
                                            onClick={() => setStep('form')}
                                            className="text-sm text-gray-500 hover:text-white transition-colors"
                                        >
                                            Back to details
                                        </button>
                                    </motion.div>
                                )}

                                {/* STEP 3: PROOF (UPLOAD) */}
                                {step === 'proof' && (
                                    <motion.div
                                        key="proof"
                                        variants={slideVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-6 text-center"
                                    >
                                        <label className="block border-2 border-dashed border-white/20 rounded-2xl p-8 hover:border-church-gold/50 transition-colors cursor-pointer bg-white/5 relative">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                                <span className="text-sm text-gray-300">
                                                    {proofFile ? proofFile.name : "Click to upload screenshot"}
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">Images only (JPG, PNG)</span>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>

                                        <button
                                            onClick={handleSubmitProof}
                                            disabled={loading}
                                            className="w-full bg-church-gold text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                                        >
                                            {loading && <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
                                            {loading ? 'Uploading...' : 'Upload Proof'}
                                        </button>
                                        <button
                                            onClick={() => setStep('payment')}
                                            className="text-sm text-gray-500 hover:text-white transition-colors"
                                        >
                                            Back to QR
                                        </button>
                                    </motion.div>
                                )}

                                {/* SUCCESS */}
                                {step === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-2xl font-serif text-white mb-2">Thank You!</h4>
                                        <p className="text-gray-400 mb-8">Your contribution has been recorded. May God bless you abundantly.</p>
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
