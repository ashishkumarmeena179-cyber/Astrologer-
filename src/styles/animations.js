// Standard Page Transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic-bezier for "snappy" feel
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
    },
  },
};

// Staggered Children (for Lists/Grids)
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between each child
      delayChildren: 0.2,
    },
  },
};

// Individual Child Item (Slide Up)
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Fade In Only
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5 } 
  },
};

// Card Hover / Tap Effect
export const cardHover = {
  scale: 1.02,
  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)', // Glow
  transition: { duration: 0.2 },
};

export const cardTap = {
  scale: 0.95,
};

// Tarot Card Flip
export const cardFlip = {
  hidden: { rotateY: 180 },
  visible: { 
    rotateY: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
};
