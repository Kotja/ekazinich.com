import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false); // Track visibility of Onboarding Modal
  const [menuHover, setMenuHover] = useState(null); // Track which menu item is being hovered
  const canPortal = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const buttonRefs = useRef({}); // Refs for menu buttons

  const location = useLocation();
  const navigate = useNavigate();

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

  // --- NAVIGATION LOGIC ---
  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle scroll from navigation state
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div
      className={`min-h-[100dvh] transition-colors duration-150 ${theme.bg} ${theme.text} font-sans overflow-x-hidden selection:bg-yellow-500 selection:text-charcoal pb-28 md:pt-20 ${isProjectPage ? 'pt-20 md:pb-24' : 'md:pb-0'} ${isWandering ? 'mode-wandering' : 'mode-impact'}`}
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
          className={`pointer-events-auto w-full h-full flex flex-row items-center justify-evenly px-3 md:px-6 ${isOnboardingVisible ? '[&>button]:opacity-20 [&>button]:blur-[1px]' : ''}`}
        >
          {['Projects', 'About', 'Get in Touch'].map((item) => {
            const targetId = item.toLowerCase().replace(/ /g, '-');
            const sectionMap = {
              projects: 'project-section',
              about: 'about-section',
              'get-in-touch': 'contact-section',
            };
            const targetScrollId = sectionMap[targetId] || 'project-section';

            return (
              <button
                key={item}
                ref={(el) => (buttonRefs.current[item] = el)}
                onClick={() => scrollToSection(targetScrollId)}
                onMouseEnter={() => {
                  if (mode === 'wandering') setMenuHover(item);
                }}
                onMouseLeave={() => setMenuHover(null)}
                className="relative group flex-1 flex items-center justify-center whitespace-nowrap text-inherit uppercase tracking-widest"
              >
                <span className="cursor-pointer text-2xs xs:text-xs md:text-sm font-semibold uppercase tracking-widest">
                  {item}
                </span>
                <span
                  className={`w-2 h-2 rounded-full bauhaus-circle absolute -bottom-2 transition-opacity opacity-0 group-hover:opacity-100 ${isWandering ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </button>
            );
          })}

          {/* Mode switcher */}
          <div
            className={`flex-1 flex flex-col items-center justify-center relative ${isOnboardingVisible ? 'z-[105]' : ''}`}
          >
            <span
              className={`text-2xs font-semibold tracking-widest uppercase leading-none mb-1 whitespace-nowrap ${theme.iconBlue}`}
            >
              Modes
            </span>
            <div className="flex items-center gap-2 relative group/mode">
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

              <div
                className={`w-4 h-4 rounded-full bauhaus-circle border-2 cursor-pointer transition-all duration-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                    ${isWandering ? 'border-cream focus:ring-offset-charcoal' : 'border-charcoal focus:ring-offset-cream'}
                    ${mode === 'hr' ? (isWandering ? 'bg-cream' : 'bg-charcoal') : 'bg-transparent'}`}
                onClick={() => {
                  setMode('hr');
                  playSound('mode');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMode('hr');
                    playSound('mode');
                  }
                }}
                onPointerEnter={() => setMenuHover('Impact')}
                onPointerLeave={() => setMenuHover(null)}
                onPointerCancel={() => setMenuHover(null)}
                role="button"
                tabIndex={0}
                aria-label="Impact Mode"
                aria-pressed={mode === 'hr'}
              />

              <div
                className={`h-[2px] w-2 transition-colors duration-50 ${mode === 'wandering' ? 'bg-red-500' : isWandering ? 'bg-cream/40' : 'bg-charcoal/40'}`}
              />

              <div
                className={`w-4 h-4 rounded-full bauhaus-circle border-2 cursor-pointer transition-all duration-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                    ${isWandering ? 'border-cream focus:ring-offset-charcoal' : 'border-charcoal focus:ring-offset-cream'}
                    ${mode === 'wandering' ? (isWandering ? 'bg-cream' : 'bg-charcoal') : 'bg-transparent'}`}
                onClick={() => {
                  setMode('wandering');
                  playSound('mode');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMode('wandering');
                    playSound('mode');
                  }
                }}
                onPointerEnter={() => setMenuHover('In-Depth')}
                onPointerLeave={() => setMenuHover(null)}
                onPointerCancel={() => setMenuHover(null)}
                role="button"
                tabIndex={0}
                aria-label="In-Depth Mode"
                aria-pressed={mode === 'wandering'}
              />
            </div>
            <span
              className={`mode-tooltip text-2xs font-semibold tracking-widest uppercase leading-none mt-1 translate-y-[2px] whitespace-nowrap ${isOnboardingVisible ? 'text-charcoal bg-yellow-500 px-2 py-0.5' : theme.iconBlue}`}
            >
              {menuHover === 'Impact' || menuHover === 'In-Depth'
                ? menuHover
                : isWandering
                  ? 'In-Depth'
                  : 'Impact'}
            </span>
          </div>
        </div>
      </nav>

      {canPortal &&
        isProjectPage &&
        createPortal(
          <div className={`project-action-bar ${theme.navBg} backdrop-blur-lg ${theme.text}`}>
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'project-section' } })}
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'contact-section' } })}
              className="text-sm font-semibold uppercase tracking-widest hover:text-accent transition-colors"
            >
              Hire Me
            </button>
          </div>,
          document.body
        )}

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home mode={mode} scrollToSection={scrollToSection} />} />
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
