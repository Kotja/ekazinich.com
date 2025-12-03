import React, { useState, useEffect, useRef } from 'react';
import { Send, Copy, Linkedin, ArrowRight, Circle, AlertCircle, ArrowLeft, Grid, ArrowDown, Check, Mail, X } from 'lucide-react';
import profileImage from './assets/profile.png';
import projectBooking from './assets/booking-automation.png';
import projectB2B from './assets/b2b-platform.png';
import projectCollector from './assets/platform.png';
import projectCollectorChallenge from './assets/platform-challenge.png';
import projectCollectorProcess from './assets/platform-process.png';
import projectPortfolio from './assets/client-converting-portfolio.png';
import projectPortfolioChallenge from './assets/portfolio-challenge.png';
import projectPortfolioProcess from './assets/portfolio-process.png';

const Portfolio = () => {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState('home'); // 'home' or 'project-detail'
  const [mode, setMode] = useState('hr');
  const [hoverHero, setHoverHero] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox overlay
  const [emailCopied, setEmailCopied] = useState(false);
  const [overDark, setOverDark] = useState({}); // Track which menu items are over dark section
  const [menuHover, setMenuHover] = useState(null); // Track which menu item is being hovered
  const buttonRefs = useRef({}); // Refs for menu buttons

  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  // Colours
  const COLOURS = {
    highlight: '#C25E00', // Burnt Orange - Error/Active
    suggestion: '#FFD1A3', // Peach - Hover/Suggestion
    cream: '#FDFBF7',
    charcoal: '#1A1A1A',
    confirmation: '#10B981', // Emerald Green - Success
    mustard: '#E5B700',
    deepOrange: '#EA8C10',
  };

  // --- AUDIO ASSETS ---
  const GENERAL_SOUND_URL = "https://www.soundjay.com/mechanical/sounds/typewriter-key-1.mp3";
  const MODE_SOUND_URL = "https://www.soundjay.com/buttons/sounds/button-30.mp3";

  // --- DATA ---
  const PROJECTS = [
    {
      id: 3,
      title: "Client-Converting Portfolio",
      desc: "A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.",
      tags: ["UX/UI Design", "Mobile First", "CMS Integration"],
      challenge: "The client’s existing portfolio was actively hindering their business. A cluttered, disorganised structure made it nearly impossible for potential leads to find relevant work, while a dated, non-responsive design created a lack of trust. This friction meant the photographer was losing opportunities simply because their digital presence couldn't keep up with the quality of their photography.",
      role: "I led the complete UX/UI overhaul, transforming the product from a source of frustration into a primary business tool. I began by auditing and restructuring the information architecture into a logical, category-based hierarchy. Then, I designed a minimalist, \"frame-less\" aesthetic that prioritises the artwork. Finally, I worked closely with developers to implement a custom CMS, empowering the client to manage their own content independently.",
      process: "My goal was invisibility—creating a design that steps back so the photography can step forward. I started by abandoning the ambiguous layout in favour of a strict category-based navigation, ensuring Art Directors could find relevant examples in under three clicks. Adopting a mobile-first strategy, I designed the grid system for vertical screens to guarantee that the high-resolution imagery remained immersive on any device. Ultimately, by stripping away decorative elements and utilising generous white space, I crafted an interface that acts as a quiet gallery wall, focusing all attention purely on the work.",
      impact: "The redesign transformed the portfolio into a high-converting asset. The intuitive structure and seamless mobile experience capture previously lost traffic, while the custom CMS empowers the client to independently manage their content.",
      images: [
        projectPortfolio,
        projectPortfolioChallenge,
        projectPortfolioProcess
      ]
    },
    {
      id: 0,
      title: "Automated Studio Booking",
      desc: "A streamlined SaaS solution reducing admin time by 40% for creative studios.",
      tags: ["UX Research", "UI Design", "React Native"],
      challenge: "Mid-sized creative studios were losing 40% of billable hours to administrative overhead. The legacy booking systems were fragmented, causing double-bookings and payment delays.",
      role: "Lead Product Designer. Responsible for user research, wireframing, and high-fidelity prototyping. Collaborated closely with two developers.",
      process: "We started with shadow sessions at three partner studios to understand the friction points. The key insight was that 'booking' wasn't just a calendar event, but a financial agreement. We redesigned the flow to treat bookings as tentative contracts until payment, reducing conflict.",
      impact: "Post-launch, admin time dropped by 40% within the first month. The 'tentative contract' model reduced payment disputes by 90%.",
      images: [
        projectBooking,
        "/api/placeholder/800/800?text=Mobile+Calendar+Flow",
        "/api/placeholder/800/800?text=User+Journey+Map"
      ]
    },
    {
      id: 1,
      title: "B2B Mobile Layout Change",
      desc: "Optimizing complex data tables for mobile viewports without losing fidelity.",
      tags: ["Mobile First", "Data Viz", "Figma"],
      challenge: "The existing B2B dashboard was density-heavy and relied on wide spreadsheets, making it unusable for field agents on mobile devices who needed real-time data.",
      role: "UI Specialist. Focused on responsive behaviour, component systems, and accessibility standards.",
      process: "We utilised a card-based collapsing system. Instead of shrinking the table, we transformed rows into expandable cards that prioritised actionable metrics while keeping granular data accessible via drill-downs.",
      impact: "Field agents reported a 50% increase in data entry speed. The new mobile layout was adopted as the standard pattern for the entire product suite.",
      images: [
        projectB2B,
        "/api/placeholder/800/800?text=Card+System+UI",
        "/api/placeholder/800/800?text=Responsive+Grid+Layout"
      ]
    },
    {
      id: 2,
      title: "Direct-to-Collector Platform",
      desc: "Created the brand identity and designed the full digital platform for the artist to exhibit and sell her work independently. The site enabled her to reach collectors directly and retain earnings that would otherwise be lost to nearly 50% gallery commission fees.",
      tags: ["Web Design", "E-commerce", "Strategy"],
      challenge: "The primary challenge was twofold: solving both a critical business problem and a core user problem. For the artist, the challenge was overcoming the traditional gallery model that claimed 40-50% of her revenue and severed her connection to collectors. For the user, the challenge was the \"context barrier\"; art collectors were highly hesitant to purchase expensive pieces online because they couldn't accurately judge a work's scale, texture, or how it would look in their own home, a problem a physical gallery naturally solves.",
      role: "As the Lead UX/UI Designer and Brand Strategist, I was responsible for the entire end-to-end process. My work extended beyond just visual design to include conducting the initial stakeholder and user research, defining the brand identity, and architecting the complete user experience. A key part of my role was designing the complex, multi-step user flow for successful purchases, adding the AR \"View in Room\" feature, taking it from an initial concept to a fully-realised, high-fidelity interactive prototype.",
      process: "I followed a structured design thinking framework to ensure the solution was user-centric and effective. The Discover phase involved deep interviews with the artist and qualitative research with collectors, which identified the \"context barrier\" as the primary purchasing blocker. After Defining this challenge with user personas, I moved to Design, where I developed the full brand identity and high-fidelity UI. A critical part of this phase was the strategic integration of an existing AR tool into the customer journey. I focused on mapping a frictionless user flow that bridged the gap between the bespoke shop interface and the external visualisation technology. Finally, after Delivering a comprehensive design system, the result is a cohesive e-commerce platform. The seamlessly embedded \"View in Room\" feature directly solves the collector's context problem by allowing them to render true-to-scale artwork in their space, while the immersive bio page and secure checkout solidify the trust needed to complete the purchase.",
      impact: "The platform transformed the artist's business model, doubling her profit margins by retaining 100% of sales. The AR 'View in Room' feature directly increased conversion rates, driving $21k in revenue and four major sales in the first three months, proving the D2C model's success.",
      images: [
        projectCollector,
        projectCollectorChallenge,
        projectCollectorProcess
      ]
    }
  ];

  // --- HELPER: THEME ENGINE ---
  const isWandering = mode === 'wandering';
  const theme = {
    // Wandering = Charcoal BG (#1A1A1A), HR = Cream BG (#FDFBF7)
    bg: isWandering ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]',
    // Wandering = Cream Text, HR = Charcoal Text
    text: isWandering ? 'text-[#FDFBF7]' : 'text-[#1A1A1A]',
    subText: isWandering ? 'text-[#FDFBF7]/60' : 'text-[#1A1A1A]/60',
    borderSolid: isWandering ? 'border-[#FDFBF7]' : 'border-[#1A1A1A]',
    borderSoft: isWandering ? 'border-[#FDFBF7]/20' : 'border-[#1A1A1A]/20',
    // Mobile Nav Bar
    navBg: isWandering ? 'bg-[#1A1A1A]/90' : 'bg-[#FDFBF7]/90',
    projectSectionBg: isWandering ? 'bg-[#121212]' : 'bg-[#F5F3ED]',
    // Cards remain light/cream in both modes for contrast, or flip? 
    // Let's keep cards consistent or slightly inverted. 
    // Decision: In Dark Mode, cards are Charcoal Lighter (#2A2A2A) to fit theme.
    cardBg: isWandering ? 'bg-[#2A2A2A]' : 'bg-white',
    imagePlaceholderBg: isWandering ? 'bg-[#333]' : 'bg-gray-100',
    // Tags
    tagBg: isWandering ? 'bg-[#333] text-[#FDFBF7] border-[#444]' : 'bg-[#F5F3ED] text-gray-500 border-gray-200',
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
  const openProject = (idx) => {
    playSound('general');
    setActiveProjectIdx(idx);
    setView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToProjectList = () => {
    playSound('general');
    setView('home');
    setTimeout(() => {
      const element = document.getElementById('project-section');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const scrollToSection = (id) => {
    playSound('general');
    const targetView = id === 'contact-section' || id === 'about-section' || id === 'project-section' ? 'home' : view;

    if (view !== targetView) {
      setView(targetView);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // --- SCROLL DETECTION FOR DYNAMIC MENU COLORS ---
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact-section');
      if (!contactSection) return;

      const contactRect = contactSection.getBoundingClientRect();
      const newOverDark = {};

      ['Projects', 'About', 'Get in Touch'].forEach(item => {
        const btn = buttonRefs.current[item];
        if (btn) {
          const btnRect = btn.getBoundingClientRect();
          const btnCenterY = btnRect.top + btnRect.height / 2;

          // Check if button center is inside the contact section (vertically)
          // Since contact section is at the bottom, we mainly care if we've scrolled past its top
          // But strictly speaking, it's if the button is physically over the section
          const isOver = btnCenterY >= contactRect.top && btnCenterY <= contactRect.bottom;
          newOverDark[item] = isOver;
        }
      });

      setOverDark(prev => {
        // Only update if changed to avoid re-renders
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
  }, [view]); // Re-run if view changes (though menu is mostly for home)

  // --- SCROLL TO TOP ON PROJECT CHANGE ---
  useEffect(() => {
    if (view === 'project-detail') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeProjectIdx, view]);

  // --- LIGHTBOX KEYBOARD CONTROL ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const copyEmail = () => {
    playSound('general');
    const textArea = document.createElement("textarea");
    textArea.value = "ekazinich@gmail.com";
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 1000);
      }
    } catch (err) {
      console.error('Unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playSound('general');
    const newErrors = {};
    if (!formState.name) newErrors.name = true;
    if (!formState.email) newErrors.email = true;
    if (!formState.message) newErrors.message = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Message sent!");
      setFormState({ name: '', email: '', message: '' });
    }
  };

  // --- RENDER HELPERS ---
  const heroWords = {
    hr: ['Clarity.', 'Precision.', 'Impact.'],
    wandering: ['Canvas.', 'Perspective.', 'Insights.']
  };
  const currentWords = (mode === 'wandering' && hoverHero) ? heroWords.wandering : heroWords.hr;
  const project = PROJECTS[activeProjectIdx];

  return (
    <div className={`min-h-[100dvh] transition-colors duration-700 ${theme.bg} ${theme.text} font-lato overflow-x-hidden selection:bg-[#FFD1A3] selection:text-[#C25E00] pb-28 md:pb-0`}>

      {/* GLOBAL STYLES */}
      <style>{`
        ::-webkit-scrollbar-track { background: ${isWandering ? '#1A1A1A' : '#FDFBF7'}; }
      `}</style>

      {/* --- RESPONSIVE NAVIGATION --- */}
      {/* Desktop: Right Fixed. Mobile: Bottom Fixed. */}
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
            return (

              <button
                key={item}
                ref={el => buttonRefs.current[item] = el}
                onClick={() => scrollToSection(targetId === 'projects' ? 'project-section' : targetId === 'about' ? 'about-section' : 'contact-section')}
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

                {/* Active/Hover Dot */}
                <span className={`w-1.5 h-1.5 rounded-full absolute -bottom-2 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 transition-opacity ${view === 'home' ? `opacity-0 group-hover:opacity-100 ${isWandering ? 'bg-white' : (overDark[item] ? 'bg-white' : 'bg-black')}` : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Spacer for Desktop Layout */}
        <div className="hidden md:block h-10 order-3"></div>
      </nav>

      {/* --- CONDITIONAL VIEW RENDERING --- */}
      {view === 'home' ? (
        <>
          {/* ================= HOME VIEW ================= */}

          <section id="project-section" className="min-h-[100dvh] w-full flex flex-col md:flex-row relative pt-20 md:pt-0">

            {/* Left Column: Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-24 relative z-20">
              <div
                className="cursor-default"
                onMouseEnter={() => { setHoverHero(true); if (mode === 'wandering') playSound('general'); }}
                onMouseLeave={() => setHoverHero(false)}
              >
                {currentWords.map((word, i) => (
                  <h1
                    key={i}
                    className={`font-playfair md:text-[8vw] text-[15vw] leading-[1.1] md:leading-[0.9] duration-700 ease-in-out
                      ${mode === 'wandering' ? 'italic opacity-90' : ''}
                      ${hoverHero && mode === 'wandering' ? 'translate-x-2 md:translate-x-12 opacity-80' : ''}
                    `}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {word}
                  </h1>
                ))}
              </div>

              <p className={`mt-8 md:mt-12 font-lato text-xs md:text-[13px] tracking-widest uppercase animate-fade-in-up ${theme.subText}`}>
                Strategic design that works for the user and the bottom line.
              </p>
            </div>

            {/* Right Column: Geometric Project Navigation */}
            {/* Adjusted padding and gap to push cluster closer to center. Reduced gap/padding on mobile to fit 2x2. */}
            <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-16 p-2 md:pr-48 relative z-20 mt-12 md:mt-0 content-center justify-items-center">

              {PROJECTS.slice(0, 4).map((proj, idx) => {
                // Rename B2B project on the fly
                let displayTitle = proj.title;
                if (proj.id === 1) displayTitle = "B2B Mobile Layout Redesign";

                const geometricConfig = [
                  {
                    front: 'rounded-full', back: 'rounded-none',
                    gradient: 'linear-gradient(to bottom, #CC9900, #FFD700)', // Dark to Light Yellow
                    className: 'md:-mt-48', // Moved even higher (First 1/3)
                    // Mobile: Shape (ml-10 mt-10) | Frame (0)
                    mobileMargin: 'ml-10 mt-10',
                    frameMobileMargin: '',
                    // Desktop: Shape (ml-10 mt-10) | Frame (0)
                    desktopMargin: 'md:ml-10 md:mt-10',
                    frameDesktopMargin: '',
                    textPos: 'items-start justify-start text-left pl-4 pt-4' // Matches desktop
                  }, // TL: Client Converting Portfolio
                  {
                    front: 'rounded-none', back: 'rounded-full',
                    gradient: 'linear-gradient(to bottom, #FFA500, #C27000)', // Light to Dark Orange
                    className: 'md:translate-y-20', // Moved up by ~half size
                    // Mobile: Shape (0) | Frame (ml-10 mt-[5.5rem])
                    mobileMargin: 'ml-0 mt-0',
                    frameMobileMargin: 'ml-10 mt-[5.5rem]',
                    // Desktop: Shape (0) | Frame (ml-10 mt-[4.5rem]) (18 = 4.5rem)
                    desktopMargin: 'md:ml-0 md:mt-0',
                    frameDesktopMargin: 'md:ml-10 md:mt-[4.5rem]',
                    textPos: 'items-end justify-end text-right pr-12 pb-6 md:pr-12' // Matches desktop
                  }, // TR: Studio Booking
                  {
                    front: 'rounded-none', back: 'rounded-none',
                    gradient: 'linear-gradient(to bottom, #C27000, #FFA500)', // Dark to Light Orange
                    className: '',
                    // Mobile: Shape (ml-10 mt-0) | Frame (mt-16)
                    mobileMargin: 'ml-10 mt-0',
                    frameMobileMargin: 'mt-16',
                    // Desktop: Shape (ml-10 mt-0) | Frame (mt-16) (16 = 4rem)
                    desktopMargin: 'md:ml-10 md:mt-0',
                    frameDesktopMargin: 'md:mt-16',
                    textPos: 'items-end justify-start text-left pl-4 pb-4' // Matches desktop
                  }, // BL: B2B
                  {
                    front: 'rounded-full', back: 'rounded-none',
                    gradient: 'linear-gradient(to bottom, #FFD700, #CC9900)', // Light to Dark Yellow
                    className: 'md:translate-y-[15.4rem]', // Moved up ~10px (was 64=16rem. 15.4rem is ~0.6rem less = ~10px)
                    // Mobile: Shape (0) | Frame (ml-10 mt-12)
                    mobileMargin: 'ml-0 mt-0',
                    frameMobileMargin: 'ml-10 mt-12',
                    // Desktop: Shape (0) | Frame (ml-10 mt-16) (16 = 4rem)
                    desktopMargin: 'md:ml-0 md:mt-0',
                    frameDesktopMargin: 'md:ml-10 md:mt-16',
                    textPos: 'items-end justify-end text-right pr-4 pb-4' // Matches desktop
                  }, // BR: Collector
                ];

                const config = geometricConfig[idx];

                // Determine responsive order
                // Mobile: Client(0) -> B2B(2) -> Booking(1) -> Collector(3)
                // Desktop: Client(0) -> Booking(1) -> B2B(2) -> Collector(3)
                let orderClass = '';
                if (idx === 0) orderClass = 'order-1';
                if (idx === 1) orderClass = 'order-3 md:order-2';
                if (idx === 2) orderClass = 'order-2 md:order-3';
                if (idx === 3) orderClass = 'order-4';

                return (
                  <div
                    key={proj.id}
                    // Mobile & Desktop: Grid layout, fit content.
                    className={`relative grid grid-cols-1 grid-rows-1 w-fit h-fit group cursor-pointer ${config.className} ${orderClass}`}
                    onClick={() => openProject(idx)}
                    onMouseEnter={() => playSound('general')}
                  >
                    {/* Back Frame (Outline + Title) */}
                    {/* Grid Item (col-1 row-1), relative, fixed size (w-36 mobile, w-48 desktop), MARGINS. */}
                    <div className={`col-start-1 row-start-1 w-36 h-36 md:w-48 md:h-48 relative border-2 ${theme.borderSolid} ${config.back} flex ${config.textPos} transition-transform duration-500 group-hover:scale-105 z-0 ${config.frameMobileMargin || ''} ${config.frameDesktopMargin || ''}`}>
                      <span className={`font-playfair italic text-sm ${theme.text} leading-tight max-w-[90%]`}>
                        {displayTitle}
                      </span>
                    </div>

                    {/* Front Shape (Color -> Image) */}
                    {/* Grid Item (col-1 row-1), relative, fixed size (w-36 mobile, w-48 desktop), MARGIN offsets. */}
                    <div
                      className={`col-start-1 row-start-1 w-36 h-36 md:w-48 md:h-48 relative ${config.front} overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-95 z-10 bg-white ${config.mobileMargin} ${config.desktopMargin}`}
                    >
                      {/* Image (Always present, revealed on hover) */}
                      <img
                        src={proj.images[0]}
                        alt={displayTitle}
                        className="w-full h-full object-cover grayscale"
                      />

                      {/* Color Overlay (Fades out on hover) */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center"
                        style={{ background: config.gradient }}
                      >
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Wandering Decorations */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${mode === 'wandering' ? 'opacity-100' : 'opacity-0'}`}>
              {/* Line hidden on mobile to prevent layout issues, visible on desktop */}
              <div className="hidden md:block absolute top-[50%] right-[8%] w-96 h-[2px] bg-[#C25E00]/30 rotate-0" />
            </div>

            {/* Scroll Down Arrow */}
            <button
              onClick={() => scrollToSection('about-section')}
              className="relative md:absolute mt-32 md:mt-0 bottom-auto md:bottom-8 left-auto md:left-1/2 translate-x-0 md:-translate-x-1/2 self-center animate-bounce text-[#C25E00] cursor-pointer hover:scale-110 transition-transform z-30"
              aria-label="Scroll to About"
            >
              <ArrowDown size={32} strokeWidth={1} />
            </button>
          </section>





          {/* About Section */}
          <section id="about-section" className="min-h-[80vh] w-full flex flex-col md:flex-row items-center px-6 md:px-24 py-24 relative overflow-hidden">
            <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-20 z-10 mb-12 md:mb-0">
              <h2 className="font-playfair text-5xl md:text-7xl mb-8">About.</h2>
              <p className={`font-lato text-lg leading-relaxed mb-6 max-w-md ${theme.subText}`}>
                Hi, I’m Eka. I’m a Product Designer who turns complex business requirements into clean, effective interfaces. I&nbsp;focus on removing friction for the user -analysing where they get stuck and fixing the flow to improve your bottom&nbsp;line.
              </p>
              <p className="font-lato text-sm text-gray-500 border-l-2 border-[#C25E00] pl-4 italic">
                "Design is intelligence made visible."
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
              <div className={`w-64 h-80 border-2 relative ${theme.borderSolid}`}>
                <div className="absolute top-4 left-4 w-full h-full bg-gray-200 z-0">
                  <img
                    src={profileImage}
                    alt="Eka Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 border rounded-full flex items-center justify-center z-10 
                     ${theme.borderSolid} ${theme.bg} ${theme.text}`}>
                  <span className="font-playfair italic text-xl">me</span>
                </div>
              </div>
              {mode === 'wandering' && (
                <>
                  <div className="absolute top-0 right-0 w-[2px] h-32 bg-[#C25E00] animate-pulse" />
                </>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact-section" className="min-h-[60vh] w-full flex flex-col justify-center items-center px-6 md:px-24 pt-32 pb-40 md:pb-24" style={{ backgroundColor: COLOURS.charcoal, color: COLOURS.cream }}>
            <h2 className="font-playfair text-5xl md:text-7xl mb-12 text-center">Let's Connect.</h2>
            <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
              <div className="flex-1">
                <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors
                          ${errors.name ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                        `}
                      style={{
                        borderColor: errors.name ? COLOURS.highlight : `${COLOURS.cream}4D`, // 4D is approx 30% alpha
                        color: COLOURS.cream
                      }}
                    />
                    {errors.name && <AlertCircle className="absolute right-0 top-3" size={16} style={{ color: COLOURS.highlight }} />}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors
                          ${errors.email ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                        `}
                      style={{
                        borderColor: errors.email ? COLOURS.highlight : `${COLOURS.cream}4D`,
                        color: COLOURS.cream
                      }}
                    />
                    {errors.email && <AlertCircle className="absolute right-0 top-3" size={16} style={{ color: COLOURS.highlight }} />}
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Message"
                      rows="2"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors resize-none
                          ${errors.message ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                        `}
                      style={{
                        borderColor: errors.message ? COLOURS.highlight : `${COLOURS.cream}4D`,
                        color: COLOURS.cream
                      }}
                    ></textarea>
                    {errors.message && <AlertCircle className="absolute right-0 top-3" size={16} style={{ color: COLOURS.highlight }} />}
                  </div>
                  <button
                    className="self-start mt-4 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors hover:opacity-80"
                    style={{ color: COLOURS.cream }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLOURS.highlight}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLOURS.cream}
                  >
                    Send Message <ArrowRight size={16} />
                  </button>
                </form>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-8 md:pl-12 border-l-0 md:border-l border-white/10">
                <a
                  href="https://www.linkedin.com/in/katerina-eka-zinich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-playfair italic hover:translate-x-2 transition-transform duration-300"
                  style={{ color: COLOURS.cream }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLOURS.highlight}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLOURS.cream}
                  onClick={() => playSound('general')}
                >
                  <Linkedin size={24} />
                  <span>LinkedIn Profile</span>
                </a>
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:ekazinich@gmail.com"
                    className="flex items-center gap-4 text-xl font-playfair italic hover:translate-x-2 transition-transform duration-300"
                    style={{ color: COLOURS.cream }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLOURS.highlight}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLOURS.cream}
                  >
                    <Mail size={24} />
                    <span className="break-all">ekazinich@gmail.com</span>
                  </a>
                  <button
                    onClick={copyEmail}
                    className={`p-2 transition-colors duration-300`}
                    style={{ color: emailCopied ? COLOURS.confirmation : COLOURS.cream }}
                    onMouseEnter={(e) => !emailCopied && (e.currentTarget.style.color = COLOURS.highlight)}
                    onMouseLeave={(e) => !emailCopied && (e.currentTarget.style.color = COLOURS.cream)}
                    aria-label="Copy email address"
                  >
                    {emailCopied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* ================= PROJECT DETAIL VIEW ================= */
        <div className={`min-h-screen animate-fade-in relative flex flex-col ${theme.bg} pb-24 md:pb-0`}>
          {/* Top Bar Navigation */}
          <div className={`w-full px-6 py-6 flex justify-between items-center border-b ${theme.borderSoft}`}>
            <button
              onClick={backToProjectList}
              className={`flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C25E00] transition-colors ${theme.text}`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className={`text-sm uppercase tracking-widest hover:text-[#C25E00] transition-colors ${theme.text}`}
            >
              Hire Me
            </button>
          </div>

          {/* Expanded Content Layout */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">

            {/* Header & Hero */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className={`font-playfair text-4xl md:text-7xl mb-6 leading-tight ${theme.text}`}>{project.title}</h1>
              <div className="flex justify-center gap-3 flex-wrap">
                {project.tags.map(tag => (
                  <span key={tag} className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest ${theme.tagBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`w-full aspect-video overflow-hidden shadow-lg ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[0])}>
              <img src={project.images[0]} alt="Hero" draggable="false" className="w-full h-full object-contain" />
            </div>

            {/* Section: Impact (Moved Up) */}
            <div className="max-w-5xl mx-auto text-center py-12">
              <h3 className="font-lato text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">The Solution Impact</h3>
              <p className={`font-playfair text-2xl md:text-5xl leading-tight italic ${theme.text}`} style={{ textWrap: 'balance' }}>
                "{project.impact}"
              </p>
            </div>

            {/* Section 1: Challenge (Text Left, Img Right) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="font-playfair text-3xl mb-4 text-[#C25E00] border-b border-[#C25E00] inline-block pb-2">The Challenge.</h3>
                <p className={`font-lato text-lg leading-relaxed ${theme.subText}`}>{project.challenge}</p>
              </div>
              <div className={`aspect-square overflow-hidden shadow-sm order-1 md:order-2 ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[1])}>
                <img src={project.images[1]} alt="Challenge Detail" draggable="false" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Section 2: Role (Text Block) */}
            <div className={`p-8 md:p-12 text-center border-y border-[#FFD1A3] ${theme.projectSectionBg}`}>
              <h3 className={`font-playfair text-3xl mb-4 ${theme.text}`}>My Role.</h3>
              <p className={`font-lato text-lg max-w-2xl mx-auto leading-relaxed ${theme.subText}`}>{project.role}</p>
            </div>

            {/* Section 3: Process (Img Left, Text Right) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`aspect-square overflow-hidden ${(project.id === 2 || project.id === 3) ? '' : 'shadow-sm'} ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[2])}>
                <img src={project.images[2]} alt="Process Detail" draggable="false" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="font-playfair text-3xl mb-4 text-[#C25E00] border-b border-[#C25E00] inline-block pb-2">The Process.</h3>
                <p className={`font-lato text-lg leading-relaxed ${theme.subText}`}>{project.process}</p>
              </div>
            </div>


          </div>

          {/* Bottom Navigation (Explore Others) */}
          <div className={`w-full py-12 px-6 mt-12 ${theme.projectSectionBg}`}>
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Explore Other Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PROJECTS.filter((_, idx) => idx !== activeProjectIdx).map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => openProject(PROJECTS.indexOf(proj))}
                    className={`text-left p-4 border transition-all duration-300 border-transparent hover:border-[#FFD1A3] hover:shadow-md ${isWandering ? 'bg-[#2A2A2A]' : 'bg-white'}`}
                  >
                    <div className="text-xs text-gray-400 mb-2">0{PROJECTS.indexOf(proj) + 1}</div>
                    <div className={`font-playfair text-lg italic leading-tight ${theme.text}`}>{proj.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {
        selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Full Screen View"
                draggable="false"
                className="w-full h-full object-contain shadow-2xl"
              />
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Portfolio;