import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

const OnboardingModal = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        if (onVisibilityChange) onVisibilityChange(true);
        setTimeout(() => setIsVisible(true), 10);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [onVisibilityChange]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onVisibilityChange) onVisibilityChange(false);

    localStorage.setItem('hasSeenOnboarding', 'true');
    setTimeout(() => setShouldRender(false), 150);
  }, [onVisibilityChange]);

  useEffect(() => {
    if (!shouldRender) return undefined;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll('button')];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [shouldRender, handleClose]);

  if (!shouldRender) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-contain transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close introduction"
        onClick={handleClose}
      />

      <div className="relative z-10 bg-cream max-w-md w-full p-8 md:p-10 border-[2px] border-charcoal flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-3 flex">
          <span className="flex-1 bg-red-500" />
          <span className="flex-1 bg-yellow-500" />
          <span className="flex-1 bg-blue-500" />
        </div>

        {/* Decorative Bauhaus shapes */}
        <div
          className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-500 border-[2px] border-charcoal"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-red-500 border-[2px] border-charcoal"
          aria-hidden="true"
        />
        <div className="absolute top-10 -right-2 flex flex-col gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-charcoal" />
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-charcoal" />
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-4 text-charcoal hover:text-red-500 transition-colors duration-50"
          aria-label="Close introduction"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2 id="onboarding-title" className="dialog-title text-charcoal mb-4 mt-2">
          Designed in Layers
        </h2>

        <p className="font-sans text-charcoal/80 leading-relaxed mb-6 font-normal">
          Start with the results in <span className="font-semibold">Impact Mode</span>. When you are
          ready for the full story, switch to{' '}
          <span className="font-semibold text-red-500">In-Depth Mode</span> to uncover the strategy
          and design rationale.
        </p>

        <div className="mt-4 text-blue-500 text-sm font-medium uppercase tracking-widest">
          (Use the Modes toggle in the menu)
        </div>

        <button type="button" onClick={handleClose} className="mt-2 bauhaus-btn px-6 py-2 text-xs">
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default OnboardingModal;
