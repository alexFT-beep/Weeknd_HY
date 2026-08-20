// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLanding from './presentation/components/AppLanding.tsx';
import './presentation/main.js';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppLanding />
    </StrictMode>,
  );
}
