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
          <div className="text-center px-6 border-[2px] border-charcoal p-10 bg-cream max-w-md">
            <div className="bauhaus-error mb-6">System Error</div>
            <h1 className="font-serif mb-4">Something went wrong</h1>
            <p className="font-sans text-base text-gray-500 mb-8">
              An unexpected error occurred. Reloading the page should fix it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bauhaus-btn px-6 py-2 text-xs"
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
