'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navItems = [
        { name: 'Home', href: '#' },
        { name: 'Latest Sermons', href: '#' },
        { name: 'Service Timings', href: '#' },
        { name: 'Contact Us', href: '#' },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
                ? 'py-4 bg-black/60 backdrop-blur-xl border-white/10 shadow-lg'
                : 'py-6 bg-transparent border-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Ambient background glow for header */}
            {isScrolled && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-[50%] left-[20%] w-[60%] h-[200%] bg-church-gold/5 blur-[80px] rounded-full opacity-50" />
                </div>
            )}

            <div className="container mx-auto px-4 flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            src="https://i.ibb.co/vxmTn6xr/peniel-logo-1.png"
                            alt="Peniel Church Logo"
                            width={120}
                            height={50}
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Navigation & CTA */}
                <div className="flex items-center gap-8">
                    {/* Nav Links */}
                    <nav className="hidden md:flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative group py-2"
                            >
                                <span className="text-white text-sm font-medium tracking-wide transition-colors group-hover:text-church-gold">
                                    {item.name}
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-church-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Pill */}
                    <div className={`hidden lg:flex items-center rounded-full pl-4 pr-1 py-1 border transition-all duration-300 ${isScrolled ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20 backdrop-blur-md'
                        }`}>
                        <div className="flex items-center gap-2 mr-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                            <span className="text-gray-200 text-xs font-medium">We pray for your needs</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#3B5998] hover:bg-[#2d4373] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors uppercase tracking-wider shadow-lg relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10">GIVE GENEROUSLY</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
