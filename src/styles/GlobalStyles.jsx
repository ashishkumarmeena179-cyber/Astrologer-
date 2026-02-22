import { useEffect } from 'react';

const GlobalStyles = () => {
  useEffect(() => {
    // 1. Mobile Viewport Height Fix
    // Calculates 1% of the actual viewport height (minus address bar)
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initially
    setVh();

    // Reset on resize or orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // 2. Prevent Pitch-to-Zoom (Accessibility precaution needed, but often requested for App-feel)
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // Note: Passive: false is required to call preventDefault
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default GlobalStyles;
