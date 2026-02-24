import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const useBackHandler = () => {
  const { currentScreen, goBack, showToast } = useAppContext();
  const [showExitModal, setShowExitModal] = useState(false);
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const handleBackButton = (event) => {
      // Prevent default browser behavior
      event.preventDefault();

      if (currentScreen === 'home') {
        const now = Date.now();
        // If pressed twice within 2 seconds
        if (now - lastBackPress < 2000) {
          setShowExitModal(true);
        } else {
          setLastBackPress(now);
          showToast('Press back again to exit', 'info', 2000);
        }
      } else {
        // Normal Back Navigation
        goBack();
      }
    };

    // Attach listener
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [currentScreen, lastBackPress, goBack, showToast]);

  const confirmExit = () => {
    // Actual App Exit (if PWA installed)
    if (navigator.app && navigator.app.exitApp) {
      navigator.app.exitApp();
    } else {
      // Fallback for browser
      window.close();
    }
  };

  const closeExitModal = () => setShowExitModal(false);

  return {
    showExitModal,
    confirmExit,
    closeExitModal,
  };
};

export default useBackHandler;
