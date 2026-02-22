import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import Global Context Providers
import { LanguageProvider } from './context/LanguageContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

// Import Service Worker Registration Logic
import { registerSW } from './registerSW.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>,
);

// Initialize PWA Service Worker
registerSW();
