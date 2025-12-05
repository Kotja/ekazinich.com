import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const App = () => {
  // --- STATE MANAGEMENT ---
  const [mode, setMode] = useState('hr');
  const [overDark, setOverDark] = useState({}); // Track which menu items are over dark section
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

  // --- SCROLL DETECTION FOR DYNAMIC MENU COLORS ---
  useEffect(() => {
    const handleScroll = () => {
      // Only check on Home page where contact section exists
      const contactSection = document.getElementById('contact-section');
      if (!contactSection) {
        setOverDark({});
        return;
      }

      const contactRect = contactSection.getBoundingClientRect();
      const newOverDark = {};

      ['Projects', 'About', 'Get in Touch'].forEach(item => {
        const btn = buttonRefs.current[item];
        if (btn) {
          const btnRect = btn.getBoundingClientRect();
          const btnCenterY = btnRect.top + btnRect.height / 2;
          const isOver = btnCenterY >= contactRect.top && btnCenterY <= contactRect.bottom;
          newOverDark[item] = isOver;
        }
      });

      setOverDark(prev => {
        const isDifferent = Object.keys(newOverDark).some(key => newOverDark[key] !== prev[key]);
        return isDifferent ? newOverDark : prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]); // Re-run if path changes

  return (
    <div className={`min-h-[100dvh] transition-colors duration-700 ${theme.bg} ${theme.text} font-lato overflow-x-hidden selection:bg-[#FFD1A3] selection:text-[#C25E00] pb-28 md:pb-0`}>

      {/* GLOBAL STYLES */}
      <style>{`
        ::-webkit-scrollbar-track { background: ${isWandering ? '#1A1A1A' : '#FDFBF7'}; }
      `}</style>

      {/* --- RESPONSIVE NAVIGATION --- */}
      <nav className={`
        fixed z-50 flex items-center justify-between pointer-events-none transition-all duration-300
        /* Mobile Styles (Bottom Bar) */
        bottom-0 left-0 w-full h-20 flex-row px-6 border-t backdrop-blur-lg ${theme.navBg} ${theme.borderSoft}
        /* Desktop Styles (Right Sidebar) */
        md:right-0 md:top-0 md:h-full md:w-32 md:flex-col md:py-10 md:bottom-auto md:left-auto md:px-0 md:border-t-0 md:bg-transparent md:backdrop-blur-none
        ${theme.text}
      `}>

        {/* Mode Switcher Group */}
        <div className="pointer-events-auto flex md:flex-col items-center gap-4 md:gap-2 md:mt-24 order-2 md:order-1">
          <div className="flex md:flex-col items-center gap-2 md:mb-8">
            <div
              className={`w-4 h-4 rounded-full border cursor-pointer transition-all duration-300 
                ${isWandering ? 'border-white' : 'border-black'} 
                ${mode === 'hr' ? (isWandering ? 'bg-white' : 'bg-black') : 'bg-transparent'}`}
              onClick={() => { setMode('hr'); playSound('mode'); }}
              title="HR Mode (Rushing)"
            />
            {/* Connector Line */}
            <div className={`w-8 h-[1px] md:h-8 md:w-[1px] transition-colors duration-300 ${mode === 'wandering' ? 'bg-[#C25E00]' : (isWandering ? 'bg-white/20' : 'bg-black/20')}`}></div>
            <div
              className={`w-4 h-4 rounded-full border cursor-pointer transition-all duration-300 
                ${isWandering ? 'border-white' : 'border-black'} 
                ${mode === 'wandering' ? (isWandering ? 'bg-white' : 'bg-black') : 'bg-transparent'}`}
              onClick={() => { setMode('wandering'); playSound('mode'); }}
              title="Wandering Mode (Curious)"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="pointer-events-auto flex flex-row md:flex-col gap-6 md:gap-12 text-sm font-bold tracking-widest order-1 md:order-2">
          {['Projects', 'About', 'Get in Touch'].map((item, idx) => {
            const initial = item.charAt(0);
            const targetId = item.toLowerCase().replace(/ /g, '-');
            const targetScrollId = targetId === 'projects' ? 'project-section' : targetId === 'about' ? 'about-section' : 'contact-section';

            return (
              <button
                key={item}
                ref={el => buttonRefs.current[item] = el}
                onClick={() => scrollToSection(targetScrollId)}
                onMouseEnter={() => { if (mode === 'wandering') setMenuHover(initial); }}
                onMouseLeave={() => setMenuHover(null)}
                className="relative group flex items-center justify-center md:justify-end md:w-32 md:pr-8"
                style={{
                  // In HR mode: if over dark section, use Cream. Else use default (Charcoal).
                  // In Wandering mode: always Cream (default text color is already cream/white-ish).
                  color: (mode === 'hr' && overDark[item]) ? COLOURS.cream : 'inherit'
                }}
              >
                {/* Desktop Label Logic */}
                <span className="cursor-pointer hidden md:block transition-all duration-500 origin-right">
                  {mode === 'wandering' && menuHover !== initial ? initial : item}
                </span>

                {/* Mobile Label Logic */}
                <span className="md:hidden block text-xs">
                  {mode === 'wandering' ? initial : item}
                </span>

                {/* Active/Hover Dot - Simplified for Router: just show on hover or if over dark */}
                <span className={`w-1.5 h-1.5 rounded-full absolute -bottom-2 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100 ${isWandering ? 'bg-white' : (overDark[item] ? 'bg-white' : 'bg-black')}`} />
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

    </div>
  );
};

export default App;