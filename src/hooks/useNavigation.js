import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useNavigation = () => {
  const { currentScreen, navigate, goBack } = useContext(AppContext);

  const goTo = (screenName, params = {}) => {
    // Future: Handle params via URL/State if needed
    navigate(screenName);
  };

  const back = () => {
    const success = goBack();
    // If no history, maybe go to Home or exit?
    if (!success) {
      // Logic handled by BackHandler component usually
    }
  };

  return {
    currentScreen,
    goTo,
    back,
    // Predefined routes for easy access
    toHome: () => goTo('home'),
    toPalmScan: () => goTo('palm-scan'),
    toTarot: () => goTo('tarot'),
    toSettings: () => goTo('settings'),
  };
};

export default useNavigation;
