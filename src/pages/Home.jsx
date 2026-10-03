import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cvFile from '../assets/Katerina (Eka) Zinich Product designer CV.pdf';
import { Check, Copy, Linkedin, Mail, ArrowRight, AlertCircle, X, Download } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import { PROJECTS } from '../data/projects';
import emailjs from '@emailjs/browser';
import AskChat from '../components/AskChat';
import { getTheme } from '../theme';

// Fade copy out, swap it, then fade the new lines in. Colors ease on their own.
function useSoftMode(mode) {
  const [shown, setShown] = useState(mode);
  const [dim, setDim] = useState(false);

  useEffect(() => {
    if (mode === shown) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fade = reduceMotion ? 0 : window.setTimeout(() => setDim(true), 0);
    const swap = window.setTimeout(
      () => {
        setShown(mode);
        setDim(false);
      },
      reduceMotion ? 0 : 180
    );
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(swap);
    };
  }, [mode, shown]);

  return { shown, dim };
}

function HeroLines({ words, intro = false }) {
  return (
    <h1 className="font-serif hero-display">
      {words.map((word, i) => (
        <span
          key={word}
          className={`block${intro ? ' opacity-0 animate-fade-word-in' : ''}`}
          style={intro ? { '--word-delay': `${i * 80}ms` } : undefined}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

const projectPath = (project) =>
  `/projects/${project.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')}`;

// --- SUB-COMPONENT: PROJECT ITEM ---
// Fixed 3-line titles — no orphan / hangover letters
const CASE_TITLE_LINES = {
  'Brand Scaling & Client Acquisition Platform': [
    'Brand Scaling &',
    'Client Acquisition',
    'Platform',
  ],
  'Behavioural Product Strategy in Job Search': [
    'Behavioural',
    'Product Strategy',
    'In Job Search',
  ],
  'Optimising B2B Workflow & Retention': ['Optimising B2B', 'Workflow &', 'Retention'],
  'Service Automation: Zero-Touch Model': ['Service', 'Automation:', 'Zero-Touch Model'],
  'Visa Rights & Workforce Matching Platform': ['Visa Rights &', 'Workforce', 'Matching'],
  'Custom Configurator: Instant Quotes': ['Custom', 'Configurator:', 'Instant Quotes'],
};

const PhoneFace = ({ phone, className, loading }) => {
  if (!phone.frame) {
    return (
      <img
        src={phone.src}
        alt={phone.alt}
        width={phone.width}
        height={phone.height}
        loading={loading}
        className={`hero-phone ${className}`}
      />
    );
  }

  return (
    <span className={`hero-phone hero-phone-shell ${className}`}>
      <img
        src={phone.src}
        alt={phone.alt}
        width={phone.width}
        height={phone.height}
        loading={loading}
        className="hero-phone-screen"
      />
    </span>
  );
};

const HeroCard = ({ proj, idx, isWandering }) => {
  const videoRef = useRef(null);
  const titleLines = CASE_TITLE_LINES[proj.title] || [proj.title];
  const side = idx % 2 === 0 ? 'hero-card-left' : 'hero-card-right';
  const clip = proj.heroVideo || proj.video;
  const phones = proj.heroPhones;
  const cover = proj.heroScreen || proj.images?.[0];

  const playClip = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    videoRef.current?.play().catch(() => {});
  };

  const resetClip = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <Link
      to={projectPath(proj)}
      className={`hero-card ${side} group`}
      onMouseEnter={playClip}
      onMouseLeave={resetClip}
      onFocus={playClip}
      onBlur={resetClip}
    >
      {phones?.length >= 2 ? (
        <span className="hero-phone-stage">
          <span className="hero-phone-second-wrap">
            <PhoneFace phone={phones[1]} className="hero-phone-second" />
          </span>
          <PhoneFace
            phone={phones[0]}
            className="hero-phone-first"
            loading={idx > 1 ? 'lazy' : 'eager'}
          />
        </span>
      ) : (
        <span className={`hero-screen${proj.heroFrame === 'wide' ? ' hero-screen-wide' : ''}`}>
          <span className="hero-screen-track">
            {cover && (
              <img
                src={cover}
                alt=""
                width="800"
                height="500"
                loading={idx > 1 ? 'lazy' : 'eager'}
                className={`hero-screen-still${proj.placeholder ? ' is-placeholder' : ''}${proj.heroFit === 'contain' || proj.heroScreenFit === 'contain' ? ' is-contain' : ''}`}
              />
            )}
          </span>
          {clip ? (
            <video
              ref={videoRef}
              className="hero-screen-video"
              src={clip}
              poster={cover}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
        </span>
      )}
      <span
        className={`hero-card-copy transition-colors duration-50 group-hover:text-red-500 group-focus-visible:text-red-500 ${isWandering ? 'text-cream' : 'text-charcoal'}`}
      >
        {titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </Link>
  );
};

const Home = ({ mode }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showCV, setShowCV] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const cvDialogRef = useRef(null);
  const cvCloseRef = useRef(null);
  const heroProjects = [...PROJECTS];
  const swapHeroSlots = (firstId, secondId) => {
    const first = heroProjects.findIndex((p) => p.id === firstId);
    const second = heroProjects.findIndex((p) => p.id === secondId);
    if (first === -1 || second === -1) return;
    [heroProjects[first], heroProjects[second]] = [heroProjects[second], heroProjects[first]];
  };
  swapHeroSlots(3, 6);
  swapHeroSlots(0, 5);

  // --- THEME ENGINE ---
  const isWandering = mode === 'wandering';
  const theme = getTheme(mode);
  const { shown: shownMode, dim: modeDim } = useSoftMode(mode);
  const shownWandering = shownMode === 'wandering';
  const [heroIntro, setHeroIntro] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setHeroIntro(false), 480);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (mode === shownMode) return undefined;
    const id = window.setTimeout(() => setHeroIntro(false), 0);
    return () => window.clearTimeout(id);
  }, [mode, shownMode]);

  useEffect(() => {
    if (!showCV) return undefined;
    const previouslyFocused = document.activeElement;
    cvCloseRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowCV(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = cvDialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll('a, button')].filter(
        (node) => !node.hasAttribute('disabled')
      );
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
  }, [showCV]);

  const heroWords = {
    hr: ['Clarity.', 'Precision.', 'Impact.'],
    wandering: ['Canvas.', 'Perspective.', 'Insights.'],
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ekazinich@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1000);
    } catch {
      // Fallback for browsers without Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = 'ekazinich@gmail.com';
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 1000);
      } catch (fallbackErr) {
        console.error('Unable to copy email:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formState.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or fewer';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length > 1000) {
      newErrors.message = 'Message must be 1000 characters or fewer';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalid = ['name', 'email', 'message'].find((field) => newErrors[field]);
      const fieldRefs = { name: nameRef, email: emailRef, message: messageRef };
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }

    setIsSending(true);

    const SERVICE_ID = 'service_wq60eto';
    const TEMPLATE_ID = 'template_1df4kxc';
    const PUBLIC_KEY = '37ejt9ZKC30gtKM3h';

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
      to_email: 'ekazinich@gmail.com',
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      () => {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setIsSending(false);
        setTimeout(() => setSubmitStatus(null), 4000);
      },
      (err) => {
        console.error('EmailJS failed:', err);
        setSubmitStatus('error');
        setIsSending(false);
      }
    );
  };

  return (
    <>
      {/* ================= HOME VIEW ================= */}

      <section
        id="project-section"
        className="min-h-[100dvh] w-full flex flex-col min-[1440px]:block relative pt-20 md:pt-10 max-w-screen-2xl mx-auto"
      >
        {/* Hero text: stacked until xl, then the centre of the ring */}
        <div className="hero-ring-copy w-full flex flex-col justify-center px-6 md:px-16 relative z-20 overflow-visible">
          <div
            className={`hero-mode-swap${isWandering ? ' is-indepth' : ''} pr-4 min-[1440px]:pr-0`}
          >
            <div className="hero-mode-swap__set" data-set="hr" aria-hidden={isWandering}>
              <HeroLines words={heroWords.hr} intro={heroIntro && !isWandering} />
            </div>
            <div className="hero-mode-swap__set" data-set="wandering" aria-hidden={!isWandering}>
              <HeroLines words={heroWords.wandering} />
            </div>
          </div>

          <p
            className={`hero-tagline mt-3 md:mt-4 min-[1440px]:mt-3 font-sans text-xs md:text-sm tracking-widest uppercase font-medium ${theme.subText}`}
          >
            Strategic design that works for the user and the bottom line.
          </p>
        </div>

        {/* Product screens around the hero. Titles sit beside the cards — no title blocks. */}
        <div className="w-full min-[1440px]:contents grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-12 py-8 relative z-20 mt-10 min-[1440px]:mt-0 content-center justify-items-center">
          {heroProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`hero-card-slot hero-card-slot-${idx} flex justify-center`}
            >
              <HeroCard proj={proj} idx={idx} isWandering={isWandering} />
            </div>
          ))}
        </div>

        {/* Wandering Decorations */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${mode === 'wandering' ? 'opacity-100' : 'opacity-0'}`}
        ></div>
      </section>

      {/* About Section */}
      <section
        id="about-section"
        className="min-h-[80vh] w-full flex flex-col md:flex-row items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto"
      >
        <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-20 z-10 mb-12 md:mb-0">
          <h2 className="font-serif mb-8">About</h2>
          <div className={`mode-fade ${modeDim ? 'is-dim' : ''}`}>
            {shownWandering ? (
              <>
                <p
                  className={`font-sans text-lg leading-relaxed mb-4 max-w-md font-normal ${theme.subText}`}
                >
                  Hi, I'm Eka. I'm a Product Designer who believes the best solutions come from
                  living the problem yourself, or at least getting close enough to feel the
                  friction.
                </p>
                <p
                  className={`font-sans text-lg leading-relaxed mb-4 max-w-md font-normal ${theme.subText}`}
                >
                  I'm fascinated by the invisible work: the research that uncovers what users can't
                  articulate, the priority battles that separate "must-haves" from "nice-to-haves,"
                  and the small design decisions that prevent cognitive overload. I don't just want
                  to make things look good; I want to understand why someone would abandon a flow at
                  2am, or why they'd trust one interface over another.
                </p>
                <p
                  className={`font-sans text-lg leading-relaxed mb-6 max-w-md font-normal ${theme.subText}`}
                >
                  My process starts with validation: Does this problem actually exist? Is solving it
                  worth the cost? From there, I involve technical teams early, treat constraints as
                  creative challenges, and measure outcomes obsessively. When something fails, I
                  don't see a dead end. I see data that points toward a better iteration.
                </p>
              </>
            ) : (
              <p
                className={`font-sans text-lg leading-relaxed mb-6 max-w-md font-normal ${theme.subText}`}
              >
                Hi, I'm Eka. I'm a Product Designer who asks "why are we building this?" before
                opening Figma. I validate problems through research, prioritize ruthlessly for MVPs,
                and measure success through real user behavior: heatmaps, session recordings, and
                task completion rates. My goal is simple: design that works for both the user and
                the business.
              </p>
            )}
          </div>
          <p
            className={`font-sans text-sm font-medium ${theme.subText} border-l-[2px] border-accent pl-4 italic`}
          >
            "Design is intelligence made visible."
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
          {/* Bauhaus geometric composition around portrait */}
          <div className="relative w-72 h-[22rem]">
            {/* Yellow portrait block */}
            <div className="absolute left-6 top-6 w-64 h-80 overflow-hidden z-10 about-portrait-block">
              <img
                src={profileImage}
                alt="Eka Profile"
                width="300"
                height="400"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Blue rectangle accent */}
            <div className="absolute left-0 top-0 w-16 h-16 bg-blue-500 z-0" aria-hidden="true" />
            {/* Red circle */}
            <div
              className="absolute -right-2 top-16 w-14 h-14 rounded-full bauhaus-circle bg-red-500 z-20"
              aria-hidden="true"
            />
            {/* Vertical line: white on the In-Depth ground, black on Impact */}
            <div
              className={`absolute left-2 top-20 w-[2px] h-40 z-20 ${isWandering ? 'bg-cream' : 'bg-charcoal'}`}
              aria-hidden="true"
            />
            {/* Dot the annotation pointed to, on the portrait */}
            <span
              className="absolute left-[66px] top-[259px] z-20 h-3 w-3 rounded-full bauhaus-dot bg-blue-500"
              aria-hidden="true"
            />
            {/* Dot cluster */}
            <div className="absolute right-4 bottom-8 flex gap-2 z-20" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bauhaus-dot bg-charcoal" />
              <span className="w-3 h-3 rounded-full bauhaus-dot bg-blue-500" />
              <span className="w-3 h-3 rounded-full bauhaus-dot bg-red-500" />
            </div>
            {/* Yellow square behind */}
            <div
              className="absolute -left-4 bottom-12 w-12 h-12 bg-yellow-500 z-0"
              aria-hidden="true"
            />

            {/* CV — circle button */}
            <button
              type="button"
              className={`about-cv absolute -bottom-2 -right-2 w-20 h-20 rounded-full bauhaus-circle flex items-center justify-center z-30
                                border-[2px] border-charcoal bg-cream text-charcoal cursor-pointer bauhaus-interactive group`}
              onClick={() => setShowCV(true)}
              aria-label="Open curriculum vitae"
            >
              <span className="font-serif text-xl font-semibold group-hover:text-red-500 transition-colors duration-50">
                CV
              </span>
            </button>
          </div>
          {mode === 'wandering' && (
            <div className="absolute top-0 right-0 w-[2px] h-32 bg-red-500" aria-hidden="true" />
          )}
        </div>
      </section>

      {/* Ask Chat Section */}
      <AskChat mode={mode} />

      {/* Contact Section */}
      <section
        id="contact-section"
        className="min-h-[60vh] w-full flex flex-col justify-center items-center px-6 md:px-24 pt-32 pb-40 md:pb-24 bg-charcoal text-cream"
      >
        <h2 className="font-serif mb-12 text-center">Let's Connect</h2>
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
          <div className="flex-1">
            <form className="flex flex-col gap-6" onSubmit={handleFormSubmit} noValidate>
              <div className="relative">
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  ref={nameRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                  value={formState.name}
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 transition-colors text-cream
                      ${errors.name ? 'border-accent' : 'border-cream/30 focus-visible:border-cream/60'}
                    `}
                />
                {errors.name && (
                  <AlertCircle
                    className="absolute right-0 top-3 text-accent"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                {errors.name && (
                  <p id="contact-name-error" className="text-accent text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="Email"
                  value={formState.email}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 transition-colors text-cream
                      ${errors.email ? 'border-accent' : 'border-cream/30 focus-visible:border-cream/60'}
                    `}
                />
                {errors.email && (
                  <AlertCircle
                    className="absolute right-0 top-3 text-accent"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                {errors.email && (
                  <p id="contact-email-error" className="text-accent text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  ref={messageRef}
                  name="message"
                  autoComplete="off"
                  placeholder="Message"
                  rows="2"
                  value={formState.message}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 transition-colors resize-none text-cream
                      ${errors.message ? 'border-accent' : 'border-cream/30 focus-visible:border-cream/60'}
                    `}
                ></textarea>
                {errors.message && (
                  <AlertCircle
                    className="absolute right-0 top-3 text-accent"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p id="contact-message-error" className="text-accent text-xs">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    className={`text-xs tabular-nums ${formState.message.length > 900 ? (formState.message.length > 1000 ? 'text-accent' : 'text-yellow-400') : 'text-cream/30'}`}
                  >
                    {formState.message.length}/1000
                  </p>
                </div>
              </div>
              <button
                className="self-start mt-4 flex items-center gap-2 text-sm uppercase tracking-widest text-cream transition-colors enabled:hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSending}
              >
                {isSending ? 'Sending…' : 'Send Message'}{' '}
                {!isSending && <ArrowRight size={16} aria-hidden="true" />}
              </button>
              <div role="status" aria-live="polite">
                {submitStatus === 'success' && (
                  <p className="bauhaus-success text-sm mt-2">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="bauhaus-error text-sm mt-2">
                    Failed to send. Please try again or email directly.
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-8 md:pl-12 border-l-0 md:border-l-[2px] border-white/10">
            <div className="flex items-center gap-4">
              <a
                href="mailto:ekazinich@gmail.com"
                className="flex items-center gap-4 text-xl font-serif text-cream hover:text-accent hover:translate-x-2 transition-colors duration-300"
              >
                <Mail size={24} aria-hidden="true" />
                <span className="break-all">ekazinich@gmail.com</span>
              </a>
              <button
                onClick={copyEmail}
                className={`p-2 transition-colors duration-300 ${emailCopied ? 'text-success' : 'text-cream hover:text-accent'}`}
                aria-label="Copy email address"
              >
                {emailCopied ? (
                  <Check size={20} aria-hidden="true" />
                ) : (
                  <Copy size={20} aria-hidden="true" />
                )}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {emailCopied ? 'Email address copied' : ''}
              </span>
            </div>
            <a
              href="https://www.linkedin.com/in/katerina-eka-zinich"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-xl font-serif text-cream hover:text-accent hover:translate-x-2 transition-all duration-300"
            >
              <Linkedin size={24} aria-hidden="true" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full text-center mt-20 opacity-40 font-sans text-xs tracking-widest uppercase">
          © 2026 Eka Zinich. All rights reserved.
        </div>
      </section>

      {/* CV Overlay */}
      {showCV && (
        <div
          ref={cvDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 overscroll-contain"
        >
          <div className="relative w-full max-w-5xl h-[90vh] bg-cream border-[2px] border-charcoal flex flex-col overflow-hidden animate-snap-in">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-charcoal text-cream border-b-[2px] border-charcoal">
              <h2 id="cv-title" className="dialog-title">
                Curriculum Vitae
              </h2>
              <div className="flex items-center gap-4">
                <a
                  href={cvFile}
                  download="Katerina_(Eka)_Zinich_Product_designer_CV.pdf"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors"
                >
                  <Download size={18} aria-hidden="true" />
                  <span className="hidden md:inline">Download</span>
                </a>
                <button
                  ref={cvCloseRef}
                  type="button"
                  onClick={() => setShowCV(false)}
                  className="hover:text-accent transition-colors"
                  aria-label="Close curriculum vitae"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 w-full h-full bg-gray-100 overflow-hidden">
              <iframe src={cvFile} className="w-full h-full" title="CV Preview" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
