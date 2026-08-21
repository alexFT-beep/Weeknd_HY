// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLanding from './presentation/components/AppLanding.tsx';
import './presentation/styles/main.css';
import './presentation/styles/animations.css';
import './index.css';
import './presentation/main.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <AppLanding />
      </StrictMode>,
    );
  } catch (err) {
    console.error('Error mounting React AppLanding:', err);
  }
}

