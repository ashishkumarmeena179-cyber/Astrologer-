import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Navigation State
  const [currentScreen, setCurrentScreen] = useState('home');
  const [history, setHistory] = useState(['home']); // Stack for back navigation

  // 2. UI States
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  // 3. Toast Notification State
  const [toast, setToast] = useState({
    message: '',
    type: 'info', // 'success', 'error', 'info'
    isVisible: false,
  });

  // --- Navigation Logic (History API Integration) ---

  const navigate = useCallback((screenName) => {
    if (screenName === currentScreen) return;

    // Push to browser history to support hardware back button
    window.history.pushState({ screen: screenName }, '', `#${screenName}`);
    
    setHistory((prev) => [...prev, screenName]);
    setCurrentScreen(screenName);
    
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const previousScreen = newHistory[newHistory.length - 1];
      
      setHistory(newHistory);
      setCurrentScreen(previousScreen);
      return true; // Handled
    }
    return false; // Not handled (exit app?)
  }, [history]);

  // Listen for browser back button (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      if (history.length > 1) {
        // Sync internal state with browser back
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory.pop();
          const prevScreen = newHistory[newHistory.length - 1];
          setCurrentScreen(prevScreen);
          return newHistory;
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [history]);

  // --- Toast Logic ---

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type, isVisible: true });
    
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  // --- Context Value ---

  const value = {
    currentScreen,
    navigate,
    goBack,
    isLoading,
    setLoading: setIsLoading,
    showSplash,
    setShowSplash,
    toast,
    showToast,
    hideToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for easy usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
