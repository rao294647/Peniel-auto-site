'use client';

import { motion } from 'framer-motion';

export const fadeIn = (direction = 'up', delay = 0) => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1.25,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            } as const,
        },
    };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren,
                delayChildren,
            } as const,
        },
    };
};

export const textVariant = (delay = 0) => {
    return {
        hidden: {
            y: 50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1.25,
                delay: delay,
            } as const,
        },
    };
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
};
