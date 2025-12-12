'use client';

import { motion } from 'framer-motion';

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 transition-all";
const labelClasses = "block text-sm text-gray-400 mb-1.5 ml-1";

export function JoinGroupForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>Full Name</label>
                <input type="text" placeholder="e.g. John Doe" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>Phone Number</label>
                <input type="tel" placeholder="e.g. +91 98765 43210" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label className={labelClasses}>Address (Area)</label>
                <input type="text" placeholder="e.g. Hyderabad, Gachibowli" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="calls" className="w-4 h-4 rounded border-gray-600 text-church-gold focus:ring-church-gold bg-transparent" />
                <label htmlFor="calls" className="text-sm text-gray-300">I am willing to receive calls from the church</label>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-church-gold to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
                Join Group
            </motion.button>
        </form>
    );
}

export function VolunteerForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>Full Name</label>
                <input type="text" placeholder="e.g. Sarah Jones" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>Phone Number</label>
                <input type="tel" placeholder="e.g. +91 98765 43210" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label className={labelClasses}>I want to serve in</label>
                <select className={`${inputClasses} appearance-none cursor-pointer`}>
                    <option className="bg-[#1a1a1a]">Media Team</option>
                    <option className="bg-[#1a1a1a]">Church Volunteer</option>
                    <option className="bg-[#1a1a1a]">Welcome Team</option>
                    <option className="bg-[#1a1a1a]">Cleaning Team</option>
                </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="vol-calls" className="w-4 h-4 rounded border-gray-600 text-church-gold focus:ring-church-gold bg-transparent" />
                <label htmlFor="vol-calls" className="text-sm text-gray-300">Willing to receive calls from church</label>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-church-gold to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
                Sign Up to Serve
            </motion.button>
        </form>
    );
}

export function MissionsForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>Full Name</label>
                <input type="text" placeholder="e.g. Michael Smith" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>Phone Number</label>
                <input type="tel" placeholder="e.g. +91 98765 43210" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label className={labelClasses}>Address / Passport Country</label>
                <input type="text" placeholder="Address" className={inputClasses} required />
            </motion.div>

            <div className="space-y-3 pt-2">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3">
                    <input type="checkbox" id="miss-calls" className="w-4 h-4 rounded border-gray-600 text-church-gold focus:ring-church-gold bg-transparent" />
                    <label htmlFor="miss-calls" className="text-sm text-gray-300">Willing to receive calls from church</label>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex items-center gap-3">
                    <input type="checkbox" id="miss-travel" className="w-4 h-4 rounded border-gray-600 text-church-gold focus:ring-church-gold bg-transparent" />
                    <label htmlFor="miss-travel" className="text-sm text-gray-300">OK to travel anytime and place</label>
                </motion.div>
            </div>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-church-gold to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
                Register Interest
            </motion.button>
        </form>
    );
}

export function GiveOnlineView() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer flex items-center justify-between group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-church-gold/20 flex items-center justify-center text-church-gold group-hover:bg-church-gold group-hover:text-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">UPI Payment</h4>
                        <p className="text-sm text-gray-400">GPay, PhonePe, Paytm</p>
                    </div>
                </div>
                <div className="text-church-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer flex items-center justify-between group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-church-gold/20 flex items-center justify-center text-church-gold group-hover:bg-church-gold group-hover:text-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Bank Transfer</h4>
                        <p className="text-sm text-gray-400">Direct deposit details</p>
                    </div>
                </div>
                <div className="text-church-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            </motion.div>
        </div>
    );
}

export function PrayerRequestForm() {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>Full Name</label>
                <input type="text" placeholder="e.g. John Doe" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>Phone Number</label>
                <input type="tel" placeholder="e.g. +91 98765 43210" className={inputClasses} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label className={labelClasses}>Your Prayer Request</label>
                <textarea
                    rows={4}
                    placeholder="Share your prayer needs..."
                    className={`${inputClasses} resize-y min-h-[100px]`}
                    required
                />
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-church-gold to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
                Send Prayer Request
            </motion.button>
        </form>
    );
}
