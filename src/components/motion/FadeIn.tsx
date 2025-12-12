'use client';

import { motion } from 'framer-motion';
import { fadeIn } from './variants';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    fullWidth?: boolean;
}

export default function FadeIn({ children, delay = 0, direction = 'up', className = '', fullWidth = false }: FadeInProps) {
    return (
        <motion.div
            variants={fadeIn(direction, delay)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
}
