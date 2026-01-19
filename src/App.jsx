import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import OnboardingModal from './components/OnboardingModal';

const App = () => {
  // --- STATE MANAGEMENT ---
  const [mode, setMode] = useState('hr');
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false); // Track visibility of Onboarding Modal
  const [menuHover, setMenuHover] = useState(null); // Track which menu item is being hovered
  const buttonRefs = useRef({}); // Refs for menu buttons

  const location = useLocation();
  const navigate = useNavigate();

  // --- AUDIO ASSETS ---
  const GENERAL_SOUND_URL = "https://www.soundjay.com/mechanical/sounds/typewriter-key-1.mp3";
  const MODE_SOUND_URL = "https://www.soundjay.com/buttons/sounds/button-30.mp3";

  // --- HELPER: THEME ENGINE ---
  const isWandering = mode === 'wandering';
  const theme = {
    bg: isWandering ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]',
    text: isWandering ? 'text-[#FDFBF7]' : 'text-[#1A1A1A]',
    navBg: isWandering ? 'bg-[#1A1A1A]/90' : 'bg-[#FDFBF7]/90',
    borderSoft: isWandering ? 'border-[#FDFBF7]/20' : 'border-[#1A1A1A]/20',
  };

  const COLOURS = {
    cream: '#FDFBF7',
  };

  // --- AUDIO ENGINE ---
  const playSound = (type) => {
    try {
      const url = type === 'mode' ? MODE_SOUND_URL : GENERAL_SOUND_URL;
      const audio = new Audio(url);
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Audio play prevented:", error));
      }
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // --- NAVIGATION LOGIC ---
  const scrollToSection = (id) => {
    playSound('general');

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
          // Clear state to prevent scroll on refresh? 
          // navigate(location.pathname, { replace: true, state: {} }); // This might trigger re-render or effect loop if not careful
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className={`min-h-[100dvh] transition-colors duration-700 ${theme.bg} ${theme.text} font-lato overflow-x-hidden selection:bg-[#FFD1A3] selection:text-[#C25E00] pb-28 md:pb-0`}>

      {/* GLOBAL STYLES */}
      <style>{`
        ::-webkit-scrollbar-track { background: ${isWandering ? '#1A1A1A' : '#FDFBF7'}; }
      `}</style>

      {/* --- RESPONSIVE NAVIGATION --- */}
      <nav className={`
        fixed flex items-center justify-between pointer-events-none transition-all duration-300 ${isOnboardingVisible ? 'z-[105]' : 'z-50'}
        /* Mobile Styles (Bottom Bar) */
        bottom-0 left-0 w-full h-20 flex-row px-4 border-t backdrop-blur-lg ${theme.navBg} ${theme.borderSoft}
        /* Desktop Styles (Right Sidebar) */
        md:right-0 md:top-0 md:h-full md:w-32 md:flex-col md:py-10 md:bottom-auto md:left-auto md:px-0 md:border-t-0 md:bg-transparent md:backdrop-blur-none
        ${theme.text}
      `}>

        {/* Mode Switcher Group */}
        <div className={`pointer-events-auto flex md:flex-col items-center gap-2 md:mt-24 order-2 md:order-1 flex-shrink-0 relative transition-all duration-300 ${isOnboardingVisible ? 'z-[105]' : 'z-auto'}`}>
          <div className="flex md:flex-col items-center gap-2 md:mb-8 relative group/mode">

            {/* Focus Mode Button -> Impact Mode */}
            <div className="relative group/btn">
              <div
                className={`w-4 h-4 rounded-full border cursor-pointer transition-all duration-300 
                    ${isWandering ? 'border-white' : 'border-black'} 
                    ${mode === 'hr' ? (isWandering ? 'bg-white' : 'bg-black') : 'bg-transparent'}`}
                onClick={() => { setMode('hr'); playSound('mode'); }}
                aria-label="Impact Mode"
              />
              {/* Desktop Tooltip */}
              <span className="hidden md:block absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none text-[#E6944C]">
                Impact Mode
              </span>
            </div>

            {/* Connector Line - Flexible in Mobile */}
            <div className={`h-[1px] w-2 flex-grow md:flex-grow-0 md:w-[1px] md:h-8 transition-colors duration-300 ${mode === 'wandering' ? 'bg-[#C25E00]' : (isWandering ? 'bg-white/20' : 'bg-black/20')}`}></div>

            {/* Explore Mode Button -> In-Depth Mode */}
            <div className="relative group/btn">
              <div
                className={`w-4 h-4 rounded-full border cursor-pointer transition-all duration-300 
                    ${isWandering ? 'border-white' : 'border-black'} 
                    ${mode === 'wandering' ? (isWandering ? 'bg-white' : 'bg-black') : 'bg-transparent'}`}
                onClick={() => { setMode('wandering'); playSound('mode'); }}
                aria-label="In-Depth Mode"
              />
              {/* Desktop Tooltip */}
              <span className={`hidden md:block absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none 
                ${isOnboardingVisible
                  ? 'opacity-100 bg-[#FDFBF7] text-[#E6944C] px-5 py-3 rounded-full font-bold shadow-lg leading-none'
                  : 'opacity-0 group-hover/btn:opacity-100 text-[#E6944C]'
                }`}>
                In-Depth Mode
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`pointer-events-auto flex flex-row md:flex-col md:gap-12 text-sm font-bold tracking-widest order-1 md:order-2 md:w-full flex-grow md:justify-start pr-6 md:pr-0 transition-opacity duration-300 ${isWandering ? 'justify-start gap-8' : 'justify-between'} ${isOnboardingVisible ? 'opacity-20 blur-[1px]' : 'opacity-100'}`}>
          {['Projects', 'About', 'Ask AI', 'Get in Touch'].map((item) => {
            const initial = item.charAt(0);
            const targetId = item.toLowerCase().replace(/ /g, '-');
            const sectionMap = {
              'projects': 'project-section',
              'about': 'about-section',
              'ask-ai': 'chat-section',
              'get-in-touch': 'contact-section',
            };
            const targetScrollId = sectionMap[targetId] || 'project-section';

            return (
              <button
                key={item}
                ref={el => buttonRefs.current[item] = el}
                onClick={() => scrollToSection(targetScrollId)}
                onMouseEnter={() => { if (mode === 'wandering') setMenuHover(item); }}
                onMouseLeave={() => setMenuHover(null)}
                className={`relative group flex items-center justify-center md:w-auto md:pt-[4px] md:pr-[10px] md:pb-[4px] md:pl-[10px] md:rounded-[16px] whitespace-nowrap ${isWandering ? 'md:self-end md:mr-12 md:justify-end md:bg-[#1A1A1A]' : 'md:self-end md:justify-end md:mr-8 md:bg-[#FDFBF7]'}`}
                style={{
                  color: 'inherit'
                }}
              >
                {/* Desktop Label Logic */}
                <span className="cursor-pointer hidden md:block transition-all duration-500 origin-right">
                  {mode === 'wandering' && menuHover !== item ? initial : item}
                </span>

                {/* Mobile Label Logic */}
                <span className="md:hidden block text-[10px] xs:text-xs">
                  {mode === 'wandering' ? initial : item}
                </span>

                {/* Active/Hover Dot - Repositioned to be clearly visible outside the tight padding */}
                <span className={`w-1.5 h-1.5 rounded-full absolute -bottom-2 md:bottom-auto md:-right-3 md:top-1/2 md:-translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100 ${isWandering ? 'bg-white' : 'bg-black'}`} />
              </button>
            );
          })}
        </div>

        {/* Spacer for Desktop Layout */}
        <div className="hidden md:block h-10 order-3"></div>
      </nav>

      <Routes>
        <Route path="/" element={<Home mode={mode} playSound={playSound} scrollToSection={scrollToSection} />} />
        <Route path="/projects/:slug" element={<ProjectDetail mode={mode} playSound={playSound} />} />
      </Routes>

      <OnboardingModal onVisibilityChange={setIsOnboardingVisible} />

    </div>
  );
};

export default App;