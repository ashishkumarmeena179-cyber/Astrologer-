import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useToast = () => {
  const { showToast, hideToast, toast } = useContext(AppContext);

  return {
    toast,
    show: (message, type = 'info', duration = 3000) => showToast(message, type, duration),
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    info: (message) => showToast(message, 'info'),
    hide: hideToast,
  };
};

export default useToast;
