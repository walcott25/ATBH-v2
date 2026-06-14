import {ClerkProvider, useAuth} from '@clerk/react';
import { ui } from '@clerk/ui';
import {ConvexProviderWithClerk} from 'convex/react-clerk';
import {ConvexReactClient} from 'convex/react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!, {
  // Convex will use the Clerk issuer URL configured in convex/auth.config.ts
});

createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    ui={ui}
    publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    afterSignOutUrl="/"
    signInFallbackRedirectUrl="/"
    signUpFallbackRedirectUrl="/"
  >
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ConvexProviderWithClerk>
  </ClerkProvider>
);
