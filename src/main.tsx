import {ClerkProvider} from '@clerk/react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    afterSignOutUrl="/"
    signInFallbackRedirectUrl="/"
    signUpFallbackRedirectUrl="/"
  >
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ClerkProvider>
);
