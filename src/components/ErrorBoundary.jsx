import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex items-center justify-center bg-cream text-charcoal">
          <div className="text-center px-6">
            <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
            <p className="font-sans text-base text-charcoal/60 mb-8">
              An unexpected error occurred. Reloading the page should fix it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors rounded-full"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
