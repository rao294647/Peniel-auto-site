const smoothEase = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: smoothEase }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: smoothEase }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: smoothEase }
    }
};

export const textReveal = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: { duration: 0.8, ease: smoothEase }
    }
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};
