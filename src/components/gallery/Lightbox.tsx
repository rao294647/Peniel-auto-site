'use client';

import { motion } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LightboxProps {
    images: { id: string; name: string; thumbnailLink: string; webContentLink?: string; }[];
    selectedIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function Lightbox({ images, selectedIndex, onClose, onNavigate }: LightboxProps) {
    const currentImage = images[selectedIndex];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onNavigate(selectedIndex - 1);
        if (e.key === 'ArrowRight') onNavigate(selectedIndex + 1);
    }, [onClose, onNavigate, selectedIndex]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [handleKeyDown]);

    if (!currentImage) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Nav Left */}
            {selectedIndex > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex - 1); }}
                    className="absolute left-4 md:left-8 text-white/50 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
            )}

            {/* Image Container */}
            <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-h-[90vh] max-w-7xl flex items-center justify-center"
            >
                <div className="relative w-full h-full">
                    <Image
                        src={currentImage.thumbnailLink || currentImage.webContentLink || ''}
                        alt={currentImage.name}
                        fill
                        className="object-contain"
                        quality={90}
                        priority
                    />
                </div>

                {/* Caption Removed per user request */}
            </motion.div>

            {/* Nav Right */}
            {selectedIndex < images.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex + 1); }}
                    className="absolute right-4 md:right-8 text-white/50 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            )}

        </motion.div>
    );
}
