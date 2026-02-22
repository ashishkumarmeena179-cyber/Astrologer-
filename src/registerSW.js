import { registerSW } from 'virtual:pwa-register';

export function register() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        // Triggered when a new version is available
        // In a production UI, this would show a "New Update Available" toast
        // For now, we will use a native confirm dialog to ensure the user gets the update
        if (confirm("New cosmic energy available (App Update). Reload to refresh?")) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        // Triggered when the app is fully cached
        console.log('✨ AI Palm Reader is ready for offline use.');
      },
      onRegisterError(error) {
        console.error('❌ Service Worker registration failed:', error);
      },
    });
  }
}
