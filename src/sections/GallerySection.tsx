'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/gallery/Lightbox';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fadeIn } from '@/components/motion/variants';
import { cn } from '@/lib/utils';

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
                const galleryRef = collection(db, 'site/gallery/items');
                const q = query(
                    galleryRef,
                    where("published", "==", true),
                    orderBy("createdAt", "desc"),
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

    // Pattern Logic: Returns class names for Grid Spans
    const getItemSpan = (index: number) => {
        // We define a repeating pattern of 6 items
        const i = index % 6;
        if (i === 0) return "md:col-span-2 md:row-span-2"; // Big Square
        if (i === 1) return "md:col-span-1 md:row-span-1"; // Small
        if (i === 2) return "md:col-span-1 md:row-span-2"; // Tall
        if (i === 3) return "md:col-span-1 md:row-span-1"; // Small
        if (i === 4) return "md:col-span-2 md:row-span-1"; // Wide
        return "md:col-span-1 md:row-span-1";              // Small
    };

    return (
        <section className="relative w-full py-24 px-4 bg-[#050505]" id="gallery">
            <div className="container mx-auto max-w-7xl">



                {/* Grid Layout */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={cn("bg-white/5 rounded-2xl", getItemSpan(i))} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 grid-flow-dense">
                        {displayImages.map((img, idx) => (
                            <motion.div
                                key={img.id}
                                variants={fadeIn("up", 0.05 * (idx % 10))} // Stagger nice and slight
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "50px" }}
                                className={cn(
                                    "relative group rounded-2xl overflow-hidden cursor-zoom-in border border-white/5 bg-gray-900 shadow-lg",
                                    getItemSpan(idx)
                                )}
                                onClick={() => setLightboxIndex(idx)}
                            >
                                <Image
                                    src={img.thumbnailLink}
                                    alt={img.name || 'Gallery Image'}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
