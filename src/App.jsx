import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Context & Hooks
import { useAppContext } from './context/AppContext';
import { useUserContext } from './context/UserContext';
import useBackHandler from './hooks/useBackHandler';

// Layouts & Global UI
import AppShell from './components/layout/AppShell';
import SplashScreen from './screens/SplashScreen';
import ExitConfirmationModal from './components/exit/ExitConfirmationModal';
import Toast from './components/ui/Toast';
import DisclaimerModal from './components/disclaimer/DisclaimerModal';
import Loader from './components/ui/Loader';

// Lazy Load Screens for Performance
const LanguageSelectionScreen = React.lazy(() => import('./screens/LanguageSelectionScreen'));
const OnboardingScreen = React.lazy(() => import('./screens/OnboardingScreen'));
const ProfileSetupScreen = React.lazy(() => import('./screens/ProfileSetupScreen'));
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const PalmScanScreen = React.lazy(() => import('./screens/PalmScanScreen'));
const PalmChatScreen = React.lazy(() => import('./screens/PalmChatScreen'));
const TarotReadingScreen = React.lazy(() => import('./screens/TarotReadingScreen'));
const LoveReadingScreen = React.lazy(() => import('./screens/LoveReadingScreen'));
const DailyGuidanceScreen = React.lazy(() => import('./screens/DailyGuidanceScreen'));
const HoroscopeScreen = React.lazy(() => import('./screens/HoroscopeScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const PrivacyPolicyScreen = React.lazy(() => import('./screens/PrivacyPolicyScreen'));

const App = () => {
  const { currentScreen, showSplash, setShowSplash, toast } = useAppContext();
  const { userProfile } = useUserContext();
  
  // Handle Android Hardware Back Button
  const { showExitModal, closeExitModal, confirmExit } = useBackHandler();

  // Handle Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // 3.5s Splash Duration
    return () => clearTimeout(timer);
  }, [setShowSplash]);

  // Screen Router Logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'language':
        return <LanguageSelectionScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'profile':
        return <ProfileSetupScreen />;
      case 'home':
        return <HomeScreen />;
      case 'palm-scan':
        return <PalmScanScreen />;
      case 'palm-chat':
        return <PalmChatScreen />;
      case 'tarot':
        return <TarotReadingScreen />;
      case 'love':
        return <LoveReadingScreen />;
      case 'guidance':
        return <DailyGuidanceScreen />;
      case 'horoscope':
        return <HoroscopeScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'privacy':
        return <PrivacyPolicyScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      {/* 1. Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {/* 2. Main App Content */}
      {!showSplash && (
        <AppShell>
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-cosmic-900"><Loader /></div>}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </AppShell>
      )}

      {/* 3. Global Overlays */}
      <AnimatePresence>
        {showExitModal && (
          <ExitConfirmationModal 
            isOpen={showExitModal} 
            onClose={closeExitModal} 
            onConfirm={confirmExit} 
          />
        )}
      </AnimatePresence>

      {/* 4. Global Toast Notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
      />

      {/* 5. First Time Disclaimer */}
      <DisclaimerModal />
    </>
  );
};

export default App;
