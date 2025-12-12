'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-cinzel font-bold tracking-wider text-church-gold">
                            PENIEL CHURCH
                        </h2>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Discover the Life, Family & Purpose of God. Join us as we grow together in faith and community.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            {['facebook', 'instagram', 'youtube', 'twitter'].map((social) => (
                                <motion.a
                                    key={social}
                                    href={`#${social}`}
                                    whileHover={{ y: -5 }}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-church-gold hover:text-black transition-colors"
                                >
                                    <span className="sr-only">{social}</span>
                                    {/* Simple placeholder icons */}
                                    <div className="w-4 h-4 bg-current rounded-sm" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About Us', href: '#about' },
                                { label: 'Announcements', href: '#announcements' },
                                { label: 'Gallery', href: '#gallery' },
                                { label: 'Giving', href: '#giving' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-church-gold transition-colors block w-fit">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-church-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>123 Church Street,<br />City Name, State 560000</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-church-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-church-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>contact@penielchurch.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Service Times (Optional but good) */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Service Times</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li>
                                <span className="block text-white font-medium">Sunday Worship</span>
                                09:00 AM - 11:00 AM
                            </li>
                            <li>
                                <span className="block text-white font-medium">Wednesday Prayer</span>
                                07:00 PM - 08:30 PM
                            </li>
                            <li>
                                <span className="block text-white font-medium">Youth Meet</span>
                                Saturday 05:00 PM
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} Peniel Church. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
