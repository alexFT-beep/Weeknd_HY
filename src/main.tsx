// @ts-nocheck
import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLanding from './presentation/components/AppLanding.tsx';
import './presentation/styles/main.css';
import './presentation/styles/animations.css';
import './index.css';
import './presentation/main.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: false }; // Mantener renderizado sin desmontar
  }

  componentDidCatch(error, errorInfo) {
    console.warn('UI Runtime Warning caught safely:', error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <AppLanding />
        </ErrorBoundary>
      </StrictMode>,
    );
  } catch (err) {
    console.error('Error mounting React AppLanding:', err);
  }
}

