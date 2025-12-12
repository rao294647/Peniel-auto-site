'use client';

import { motion } from 'framer-motion';
import { textVariant } from './variants';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
    // Split text into words for staggered reveal if needed, 
    // but for simple use case using the textVariant on the block is cleaner.
    // If strict word-by-word is needed, we'd map split.
    return (
        <motion.h2
            variants={textVariant(delay)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.h2>
    );
}
