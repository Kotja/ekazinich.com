import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cvFile from '../assets/Katerina (Eka) Zinich Product designer CV.pdf';
import {
  ArrowDown,
  Check,
  Copy,
  Linkedin,
  Mail,
  ArrowRight,
  AlertCircle,
  X,
  Download,
} from 'lucide-react';
import profileImage from '../assets/profile.webp';
import { PROJECTS } from '../data/projects';
import emailjs from '@emailjs/browser';
import AskChat from '../components/AskChat';
import { getTheme } from '../theme';

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

const HeroCard = ({ proj, idx, openProject, isWandering }) => {
  const videoRef = useRef(null);
  const titleLines = CASE_TITLE_LINES[proj.title] || [proj.title];
  const side = idx % 2 === 0 ? 'hero-card-left' : 'hero-card-right';
  const clip = proj.heroVideo || proj.video;
  const phones = proj.heroPhones;
  const cover = proj.heroScreen || proj.images?.[0];

  const playClip = () => {
    videoRef.current?.play().catch(() => {});
  };

  const resetClip = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <button
      type="button"
      className={`hero-card ${side} group`}
      onClick={() => openProject(proj)}
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
                className={`hero-screen-still${proj.placeholder ? ' is-placeholder' : ''}`}
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
    </button>
  );
};

const Home = ({ mode, scrollToSection }) => {
  const navigate = useNavigate();
  const [emailCopied, setEmailCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showCV, setShowCV] = useState(false);
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

  const heroWords = {
    hr: ['Clarity.', 'Precision.', 'Impact.'],
    wandering: ['Canvas.', 'Perspective.', 'Insights.'],
  };
  const currentWords = isWandering ? heroWords.wandering : heroWords.hr;

  const openProject = (project) => {
    const slug = project.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    navigate(`/projects/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    if (Object.keys(newErrors).length === 0) {
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
    }
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
          <div className="overflow-visible pr-4 min-[1440px]:pr-0">
            {currentWords.map((word, i) => (
              <h1
                key={word}
                className="font-serif hero-display opacity-0 animate-fade-word-in"
                style={{ '--word-delay': `${i * 80}ms` }}
              >
                {word}
              </h1>
            ))}
          </div>

          <p
            className={`mt-8 md:mt-12 min-[1440px]:mt-8 font-sans text-xs md:text-sm tracking-widest uppercase font-medium animate-fade-in-up ${theme.subText}`}
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
              <HeroCard proj={proj} idx={idx} openProject={openProject} isWandering={isWandering} />
            </div>
          ))}
        </div>

        {/* Wandering Decorations */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${mode === 'wandering' ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        {/* Scroll Down Arrow */}
        <button
          onClick={() => scrollToSection('about-section')}
          className="relative lg:absolute mt-16 lg:mt-0 bottom-auto lg:bottom-6 left-auto lg:left-1/2 min-[1440px]:left-[var(--ring-cx)] translate-x-0 lg:-translate-x-1/2 self-center text-accent cursor-pointer hover:scale-110 transition-transform z-30"
          aria-label="Scroll to About"
        >
          <ArrowDown size={32} strokeWidth={1} />
        </button>
      </section>

      {/* About Section */}
      <section
        id="about-section"
        className="min-h-[80vh] w-full flex flex-col md:flex-row items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto"
      >
        <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-20 z-10 mb-12 md:mb-0">
          <h2 className="font-serif mb-8">About</h2>
          {mode === 'wandering' ? (
            <>
              <p
                className={`font-sans text-lg leading-relaxed mb-4 max-w-md font-normal ${theme.subText}`}
              >
                Hi, I'm Eka. I'm a Product Designer who believes the best solutions come from living
                the problem yourself, or at least getting close enough to feel the friction.
              </p>
              <p
                className={`font-sans text-lg leading-relaxed mb-4 max-w-md font-normal ${theme.subText}`}
              >
                I'm fascinated by the invisible work: the research that uncovers what users can't
                articulate, the priority battles that separate "must-haves" from "nice-to-haves,"
                and the small design decisions that prevent cognitive overload. I don't just want to
                make things look good; I want to understand why someone would abandon a flow at 2am,
                or why they'd trust one interface over another.
              </p>
              <p
                className={`font-sans text-lg leading-relaxed mb-6 max-w-md font-normal ${theme.subText}`}
              >
                My process starts with validation: Does this problem actually exist? Is solving it
                worth the cost? From there, I involve technical teams early, treat constraints as
                creative challenges, and measure outcomes obsessively. When something fails, I don't
                see a dead end. I see data that points toward a better iteration.
              </p>
            </>
          ) : (
            <p
              className={`font-sans text-lg leading-relaxed mb-6 max-w-md font-normal ${theme.subText}`}
            >
              Hi, I'm Eka. I'm a Product Designer who asks "why are we building this?" before
              opening Figma. I validate problems through research, prioritize ruthlessly for MVPs,
              and measure success through real user behavior: heatmaps, session recordings, and task
              completion rates. My goal is simple: design that works for both the user and the
              business.
            </p>
          )}
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
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Blue rectangle accent */}
            <div className="absolute left-0 top-0 w-16 h-16 bg-blue-500 z-0" aria-hidden="true" />
            {/* Red circle */}
            <div
              className="absolute -right-2 top-16 w-14 h-14 rounded-full bauhaus-circle bg-red-500 z-20"
              aria-hidden="true"
            />
            {/* Black vertical line */}
            <div
              className="absolute left-2 top-20 w-[2px] h-40 bg-charcoal z-20"
              aria-hidden="true"
            />
            {/* Dot cluster */}
            <div className="absolute right-4 bottom-8 flex gap-2 z-20" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bauhaus-dot bg-charcoal" />
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
            <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 focus:outline-none transition-colors text-cream
                      ${errors.name ? 'border-accent' : 'border-cream/30 focus:border-cream/60'}
                    `}
                />
                {errors.name && (
                  <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />
                )}
                {errors.name && <p className="text-accent text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 focus:outline-none transition-colors text-cream
                      ${errors.email ? 'border-accent' : 'border-cream/30 focus:border-cream/60'}
                    `}
                />
                {errors.email && (
                  <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />
                )}
                {errors.email && <p className="text-accent text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <textarea
                  placeholder="Message"
                  rows="2"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full bg-transparent border-b-[2px] py-3 focus:outline-none transition-colors resize-none text-cream
                      ${errors.message ? 'border-accent' : 'border-cream/30 focus:border-cream/60'}
                    `}
                ></textarea>
                {errors.message && (
                  <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />
                )}
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-accent text-xs">{errors.message}</p>
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
                {isSending ? 'Sending...' : 'Send Message'} {!isSending && <ArrowRight size={16} />}
              </button>
              {submitStatus === 'success' && (
                <p className="bauhaus-success text-sm mt-2">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="bauhaus-error text-sm mt-2">
                  Failed to send. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-8 md:pl-12 border-l-0 md:border-l-[2px] border-white/10">
            <div className="flex items-center gap-4">
              <a
                href="mailto:ekazinich@gmail.com"
                className="flex items-center gap-4 text-xl font-serif text-cream hover:text-accent hover:translate-x-2 transition-all duration-300"
              >
                <Mail size={24} />
                <span className="break-all">ekazinich@gmail.com</span>
              </a>
              <button
                onClick={copyEmail}
                className={`p-2 transition-colors duration-300 ${emailCopied ? 'text-success' : 'text-cream hover:text-accent'}`}
                aria-label="Copy email address"
              >
                {emailCopied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <a
              href="https://www.linkedin.com/in/katerina-eka-zinich"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-xl font-serif text-cream hover:text-accent hover:translate-x-2 transition-all duration-300"
            >
              <Linkedin size={24} />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
          <div className="relative w-full max-w-5xl h-[90vh] bg-cream border-[2px] border-charcoal flex flex-col overflow-hidden animate-snap-in">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-charcoal text-cream border-b-[2px] border-charcoal">
              <h3 className="font-serif">Curriculum Vitae</h3>
              <div className="flex items-center gap-4">
                <a
                  href={cvFile}
                  download="Katerina_(Eka)_Zinich_Product_designer_CV.pdf"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors"
                >
                  <Download size={18} />
                  <span className="hidden md:inline">Download</span>
                </a>
                <button
                  onClick={() => setShowCV(false)}
                  className="hover:text-accent transition-colors"
                >
                  <X size={24} />
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
