import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import OnboardingModal from './components/OnboardingModal';
import MiniChat from './components/MiniChat';
import { ChatProvider } from './components/ChatContext';
import { getTheme } from './theme';

const AppContent = () => {
  // --- STATE MANAGEMENT ---
  const [mode, setMode] = useState('hr');
  const [modeSettling, setModeSettling] = useState(false);
  const modeSettleTimer = useRef(0);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false); // Track visibility of Onboarding Modal
  const canPortal = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const location = useLocation();

  const isProjectPage = location.pathname.startsWith('/projects/');

  // --- HELPER: THEME ENGINE ---
  const isWandering = mode === 'wandering';
  const theme = getTheme(mode);

  // --- AUDIO ENGINE ---
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      if (type === 'mode') {
        // Keyboard click sound using white noise
        const bufferSize = audioContext.sampleRate * 0.05; // 50ms
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise with envelope
        for (let i = 0; i < bufferSize; i++) {
          const envelope = Math.exp(-i / (audioContext.sampleRate * 0.01)); // Fast decay
          data[i] = (Math.random() * 2 - 1) * envelope;
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Lower volume

        // High-pass filter for crisp sound
        const filter = audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);

        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.start(audioContext.currentTime);
      }
    } catch (e) {
      console.error('Audio error', e);
    }
  };

  const releaseModeSettle = () => {
    window.clearTimeout(modeSettleTimer.current);
    modeSettleTimer.current = window.setTimeout(() => setModeSettling(false), 520);
  };

  const switchMode = () => {
    const next = isWandering ? 'hr' : 'wandering';
    playSound('mode');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setMode(next);
      return;
    }
    // The transition has to be on the tree before the palette classes change.
    if (modeSettling) {
      setMode(next);
      releaseModeSettle();
      return;
    }
    setModeSettling(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMode(next);
        releaseModeSettle();
      });
    });
  };

  // Hash links (/#about-section) are the navigation. Scroll once the home page is ready.
  useEffect(() => {
    const id = (location.hash || '').replace('#', '') || location.state?.scrollTo;
    if (location.pathname !== '/' || !id) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div
      className={`min-h-[100dvh] ${modeSettling ? 'mode-settling' : ''} ${theme.bg} ${theme.text} font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-charcoal pb-28 md:pt-20 ${isProjectPage ? 'is-project pt-20 md:pb-24' : 'md:pb-0'} ${isWandering ? 'mode-wandering' : 'mode-impact'}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-200 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-red-500 focus:text-cream focus:text-sm focus:font-sans focus:tracking-wide focus:border-2 focus:border-charcoal"
      >
        Skip to main content
      </a>

      {/* --- RESPONSIVE NAVIGATION --- */}
      <nav
        className={`
        site-nav fixed inset-x-0 flex flex-row items-center pointer-events-none transition-all duration-300
        ${isOnboardingVisible ? 'z-[105]' : 'z-50'}
        ${theme.navBg} ${theme.borderSoft} backdrop-blur-lg ${theme.text}
      `}
      >
        <div
          className={`pointer-events-auto w-full h-full flex flex-row items-center justify-evenly px-3 md:px-6 ${isOnboardingVisible ? '[&>a]:opacity-20 [&>a]:blur-[1px]' : ''}`}
        >
          {[
            ['Projects', 'project-section'],
            ['About', 'about-section'],
            ['Get in Touch', 'contact-section'],
          ].map(([item, targetScrollId]) => (
            <Link
              key={item}
              to={`/#${targetScrollId}`}
              className="relative group flex-1 flex items-center justify-center whitespace-nowrap text-inherit no-underline uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="cursor-pointer text-2xs xs:text-xs md:text-sm font-semibold uppercase tracking-widest">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bauhaus-circle absolute -bottom-2 transition-opacity opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 bg-red-500" />
            </Link>
          ))}

          {/* Mode switcher */}
          <div
            className={`flex-1 flex flex-col items-center justify-center relative ${isOnboardingVisible ? 'z-[105]' : ''}`}
          >
            <span
              className={`text-2xs font-semibold tracking-widest uppercase leading-none -mb-2 whitespace-nowrap ${theme.iconBlue}`}
            >
              Modes
            </span>
            <div className="relative flex items-center justify-center">
              {isOnboardingVisible && (
                <span className="absolute -inset-x-8 -inset-y-7 pointer-events-none z-10">
                  <svg
                    viewBox="0 0 200 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M10 50 C 10 20 190 20 190 50 C 190 80 10 80 10 50 M 15 52 C 15 25 185 25 185 50"
                      stroke="var(--color-accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      className="mobile-toggle-oval"
                    />
                  </svg>
                </span>
              )}

              <button
                type="button"
                role="switch"
                aria-checked={isWandering}
                aria-label="In-Depth mode"
                onClick={switchMode}
                className={`mode-toggle ${isWandering ? 'is-indepth' : ''}`}
              >
                <span className="mode-toggle__track" aria-hidden="true">
                  <span className="mode-toggle__thumb" />
                </span>
              </button>
            </div>
            <span
              className={`mode-tooltip text-2xs font-semibold tracking-widest uppercase leading-none -mt-2 whitespace-nowrap ${isOnboardingVisible ? 'text-charcoal bg-yellow-500 px-2 py-0.5' : theme.iconBlue}`}
            >
              {isWandering ? 'In-Depth' : 'Impact'}
            </span>
          </div>
        </div>
      </nav>

      {canPortal &&
        isProjectPage &&
        createPortal(
          <div className={`project-action-bar ${theme.navBg} backdrop-blur-lg ${theme.text}`}>
            <Link
              to="/#project-section"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest no-underline hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </Link>
            <Link
              to="/#contact-section"
              className="text-sm font-semibold uppercase tracking-widest no-underline hover:text-accent transition-colors"
            >
              Hire Me
            </Link>
          </div>,
          document.body
        )}

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="/projects/:slug" element={<ProjectDetail mode={mode} />} />
        </Routes>
      </main>

      <MiniChat mode={mode} />

      <OnboardingModal onVisibilityChange={setIsOnboardingVisible} />
    </div>
  );
};

const App = () => {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
};

export default App;
