'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/gallery/Lightbox';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fadeIn } from '@/components/motion/variants';

interface GalleryItem {
    id: string;
    url: string;
    title?: string; // Optional per user request to not show it, but good to have in data
    published: boolean;
}


export default function GallerySection() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Robust placeholders for when DB is empty
    const placeholders = Array(12).fill(null).map((_, i) => ({
        id: `placeholder-${i}`,
        name: "Community Moment",
        thumbnailLink: "https://i.ibb.co/Hsn4NHN/prayer.jpg", // High quality fallback
        webContentLink: "https://i.ibb.co/Hsn4NHN/prayer.jpg"
    }));

    useEffect(() => {
        async function fetchGallery() {
            try {
                const galleryRef = collection(db, 'site', 'gallery');
                const q = query(
                    galleryRef,
                    where("published", "==", true),
                    orderBy("uploadedAt", "desc"),
                    limit(50)
                );

                const querySnapshot = await getDocs(q);
                const fetchedImages = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.title || '',
                        thumbnailLink: data.url,
                        webContentLink: data.url
                    };
                });

                setImages(fetchedImages);
            } catch (err) {
                console.error("Failed to load gallery from Firestore", err);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, []);

    // Determine what to show: DB images or Placeholders
    // If loading, we verify later, but usually we just show skeletons. 
    // If loaded and empty, show placeholders.
    const displayImages = (!loading && images.length === 0) ? placeholders : images;

    return (
        <section className="relative w-full py-24 px-4 bg-[#050505]" id="gallery">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Our <span className="text-church-gold italic">Gallery</span>
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto">
                        Capturing moments of faith, community, and joy at Peniel Church.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                {loading ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="break-inside-avoid w-full bg-white/5 rounded-xl aspect-[4/5]" />
                        ))}
                    </div>
                ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                        {displayImages.map((img, idx) => (
                            <motion.div
                                key={img.id}
                                variants={fadeIn("up", 0.05 * (idx % 10))} // Stagger nice and slight
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "50px" }}
                                className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in border border-white/5 bg-gray-900 shadow-lg"
                                onClick={() => setLightboxIndex(idx)}
                            >
                                <Image
                                    src={img.thumbnailLink}
                                    alt={img.name || 'Gallery Image'}
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />

                                {/* Subtle Darken on Hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={displayImages}
                        selectedIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onNavigate={(newIndex) => {
                            if (newIndex >= 0 && newIndex < displayImages.length) {
                                setLightboxIndex(newIndex);
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
