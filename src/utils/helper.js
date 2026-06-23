// helper.js
// Shared Framer Motion animation variants used across all sections.
// Import these instead of redefining animations in each component.

// containerVariants — applied to parent motion.div elements
// Staggers children animations so they appear one after another
// rather than all at once. Used with animate={isInView ? "visible" : "hidden"}
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,  // each child starts 0.2s after the previous
            delayChildren: 0.3,    // wait 0.3s before starting any children
        },
    },
};

// itemVariants — applied to individual child motion elements
// Slides up from 30px below and fades in
// Works with containerVariants stagger when parent uses variants prop
export const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};