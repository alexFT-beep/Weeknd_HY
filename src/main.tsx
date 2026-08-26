import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppLanding from './presentation/components/AppLanding.tsx';
import './presentation/styles/main.css';
import './presentation/styles/animations.css';
import './index.css';
import './presentation/main.js';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('UI Runtime Warning caught safely:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.children;
    }
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

