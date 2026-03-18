import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cvFile from '../assets/Katerina (Eka) Zinich Product designer CV.pdf';
import { ArrowDown, Check, Copy, Linkedin, Mail, ArrowRight, AlertCircle, X, Download } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import { PROJECTS } from '../data/projects';
import emailjs from '@emailjs/browser';
import AskChat from '../components/AskChat';
import { getTheme, COLOURS } from '../theme';

// --- SUB-COMPONENT: PROJECT ITEM ---
const ProjectItem = ({ proj, idx, openProject, theme }) => {
    const videoRef = useRef(null);
    let displayTitle = proj.title;

    const geometricConfig = [
        {
            front: 'rounded-full', back: 'rounded-none',
            gradient: 'linear-gradient(to bottom, var(--color-gradient-gold-dark), var(--color-gradient-gold-light))',
            className: 'lg:-mt-32',
            mobileMargin: 'ml-[3rem] mt-[3rem]',
            frameMobileMargin: '-ml-4 -mt-4',
            desktopMargin: 'lg:ml-10 lg:mt-10',
            frameDesktopMargin: '',
            textPos: 'items-start justify-start text-left pl-3 pt-3'
        }, // TL
        {
            front: 'rounded-none', back: 'rounded-full',
            gradient: 'linear-gradient(to bottom, var(--color-gradient-orange-light), var(--color-gradient-orange-dark))',
            className: 'lg:translate-y-10',
            mobileMargin: 'ml-0 mt-0',
            frameMobileMargin: 'ml-14 mt-[94px]',
            desktopMargin: 'lg:ml-5 lg:-mt-4',
            frameDesktopMargin: 'lg:ml-14 lg:mt-[4.5rem] lg:translate-x-4',
            textPos: 'items-end justify-end text-right pb-6 pr-12',
            titleContainer: 'absolute -bottom-20 -right-10 w-64 text-right z-20',
            titleStyle: 'font-sans text-2xl leading-tight'
        }, // TR
        {
            front: 'rounded-none', back: 'rounded-none',
            gradient: 'linear-gradient(to bottom, var(--color-gradient-orange-dark), var(--color-gradient-orange-light))',
            className: '',
            mobileMargin: 'ml-10 mt-0',
            frameMobileMargin: 'mt-16',
            desktopMargin: 'lg:ml-10 lg:mt-0',
            frameDesktopMargin: 'lg:mt-16',
            textPos: 'items-end justify-start text-left pl-4 pb-4'
        }, // BL
        {
            front: 'rounded-full', back: 'rounded-none',
            gradient: 'linear-gradient(to bottom, var(--color-gradient-gold-light), var(--color-gradient-gold-dark))',
            className: 'lg:translate-y-36',
            mobileMargin: 'ml-0 mt-0',
            frameMobileMargin: 'ml-10 mt-16',
            desktopMargin: 'lg:ml-0 lg:mt-0',
            frameDesktopMargin: 'lg:ml-10 lg:mt-16',
            textPos: 'items-end justify-end text-right pr-4 pb-4'
        }, // BR
    ];

    const config = geometricConfig[idx];

    let orderClass = '';
    if (idx === 0) orderClass = 'order-1';
    if (idx === 1) orderClass = 'order-3 md:order-2';
    if (idx === 2) orderClass = 'order-2 md:order-3';
    if (idx === 3) orderClass = 'order-4';



    const handleMouseEnter = () => {
        if (proj.video && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const handleMouseLeave = () => {
        if (proj.video && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to start
        }
    };

    return (
        <div
            className={`relative grid grid-cols-1 grid-rows-1 w-fit h-fit group cursor-pointer ${config.className} ${orderClass}`}
            onClick={() => openProject(proj)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Back Frame */}
            <div className={`col-start-1 row-start-1 w-48 h-48 relative border-2 ${theme.borderSolid} ${config.back} flex ${config.textPos} transition-colors duration-500 group-hover:border-accent z-0 ${config.frameMobileMargin || ''} ${config.frameDesktopMargin || ''}`}>
                <span className={`font-sans text-sm ${theme.text} leading-tight max-w-[95%] break-words text-balance`}>
                    {displayTitle}
                </span>
            </div>

            {/* Front Shape */}
            <div
                className={`col-start-1 row-start-1 w-48 h-48 relative ${config.front} overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-95 z-10 bg-white ${config.mobileMargin} ${config.desktopMargin}`}
                style={{ background: 'white' }}
            >
                {/* Video - Visible on Mobile (Static First Frame) & Desktop (Hover Play) */}
                {proj.video ? (
                    <video
                        ref={videoRef}
                        src={`${proj.video}#t=0.001`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-all duration-500 grayscale md:grayscale group-hover:grayscale-0"
                    />
                ) : (
                    <img
                        src={proj.images[0]}
                        alt={displayTitle}
                        loading={idx > 1 ? "lazy" : "eager"}
                        width="800"
                        height="600"
                        className="w-full h-full object-cover transition-all duration-500 grayscale md:grayscale group-hover:grayscale-0"
                    />
                )}
            </div>

            {/* Title Outside - REMOVED as title is now in frame */}
            {/* <div className={titleContainerClass}> ... </div> */}
        </div>
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

    // --- THEME ENGINE ---
    const isWandering = mode === 'wandering';
    const theme = getTheme(mode);

    const heroWords = {
        hr: ['Clarity.', 'Precision.', 'Impact.'],
        wandering: ['Canvas.', 'Perspective.', 'Insights.']
    };
    const currentWords = isWandering ? heroWords.wandering : heroWords.hr;

    const openProject = (project) => {
        // Slugify title for URL: Remove special chars/punctuation, then space to dash
        const slug = project.title.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
        navigate(`/projects/${slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("ekazinich@gmail.com");
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 1000);
        } catch {
            // Fallback for browsers without Clipboard API
            const textArea = document.createElement("textarea");
            textArea.value = "ekazinich@gmail.com";
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formState.name) newErrors.name = true;
        if (!formState.email) newErrors.email = true;
        if (!formState.message) newErrors.message = true;
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSending(true);

            // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
            const SERVICE_ID = 'service_wq60eto';
            const TEMPLATE_ID = 'template_1df4kxc';
            const PUBLIC_KEY = '37ejt9ZKC30gtKM3h';

            const templateParams = {
                from_name: formState.name,
                from_email: formState.email,
                message: formState.message,
                to_email: 'ekazinich@gmail.com'
            };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
                .then(() => {
                    setSubmitStatus('success');
                    setFormState({ name: '', email: '', message: '' });
                    setIsSending(false);
                    setTimeout(() => setSubmitStatus(null), 4000);
                }, (err) => {
                    console.error('EmailJS failed:', err);
                    setSubmitStatus('error');
                    setIsSending(false);
                });
        }
    };

    const borderDefault = 'color-mix(in srgb, var(--color-cream) 30%, transparent)';

    return (
        <>
            {/* ================= HOME VIEW ================= */}

            <section id="project-section" className="min-h-[100dvh] w-full flex flex-col lg:flex-row relative pt-20 md:pt-0 max-w-screen-2xl mx-auto">

                {/* Left Column: Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-24 relative z-20">
                    <div>
                        {currentWords.map((word, i) => (
                            <h1
                                key={word}
                                className="font-serif text-display opacity-0 animate-fade-word-in"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                {word}
                            </h1>
                        ))}
                    </div>

                    <p className={`mt-8 md:mt-12 font-sans text-xs md:text-sm tracking-widest uppercase animate-fade-in-up ${theme.subText}`}>
                        Strategic design that works for the user and the bottom line.
                    </p>
                </div>

                {/* Right Column: Geometric Project Navigation */}
                <div className="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-8 p-[10px] md:pr-48 relative z-20 mt-12 md:mt-24 lg:mt-0 content-center justify-items-center">

                    {PROJECTS.slice(0, 4).map((proj, idx) => (
                        <ProjectItem
                            key={proj.id}
                            proj={proj}
                            idx={idx}
                            openProject={openProject}
                            theme={theme}
                        />
                    ))}

                </div>

                {/* Wandering Decorations */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${mode === 'wandering' ? 'opacity-100' : 'opacity-0'}`}>
                </div>

                {/* Scroll Down Arrow */}
                <button
                    onClick={() => scrollToSection('about-section')}
                    className="relative md:absolute mt-32 md:mt-0 bottom-auto md:bottom-8 left-auto md:left-1/2 translate-x-0 md:-translate-x-1/2 self-center animate-bounce text-accent cursor-pointer hover:scale-110 transition-transform z-30"
                    aria-label="Scroll to About"
                >
                    <ArrowDown size={32} strokeWidth={1} />
                </button>
            </section>

            {/* About Section */}
            <section id="about-section" className="min-h-[80vh] w-full flex flex-col md:flex-row items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto">
                <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-20 z-10 mb-12 md:mb-0">
                    <h2 className="font-serif text-5xl md:text-7xl mb-8">About</h2>
                    {mode === 'wandering' ? (
                        <>
                            <p className={`font-sans text-lg leading-relaxed mb-4 max-w-md ${theme.subText}`}>
                                Hi, I'm Eka. I'm a Product Designer who believes the best solutions come from living the problem yourself, or at least getting close enough to feel the friction.
                            </p>
                            <p className={`font-sans text-lg leading-relaxed mb-4 max-w-md ${theme.subText}`}>
                                I'm fascinated by the invisible work: the research that uncovers what users can't articulate, the priority battles that separate "must-haves" from "nice-to-haves," and the small design decisions that prevent cognitive overload. I don't just want to make things look good; I want to understand why someone would abandon a flow at 2am, or why they'd trust one interface over another.
                            </p>
                            <p className={`font-sans text-lg leading-relaxed mb-6 max-w-md ${theme.subText}`}>
                                My process starts with validation: Does this problem actually exist? Is solving it worth the cost? From there, I involve technical teams early, treat constraints as creative challenges, and measure outcomes obsessively. When something fails, I don't see a dead end. I see data that points toward a better iteration.
                            </p>
                        </>
                    ) : (
                        <p className={`font-sans text-lg leading-relaxed mb-6 max-w-md ${theme.subText}`}>
                            Hi, I'm Eka. I'm a Product Designer who asks "why are we building this?" before opening Figma. I validate problems through research, prioritize ruthlessly for MVPs, and measure success through real user behavior: heatmaps, session recordings, and task completion rates. My goal is simple: design that works for both the user and the business.
                        </p>
                    )}
                    <p className={`font-sans text-sm ${theme.subText} border-l-2 border-accent pl-4 italic`}>
                        "Design is intelligence made visible."
                    </p>
                </div>
                <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
                    <div className={`w-64 h-80 border-2 relative ${theme.borderSolid}`}>
                        <div className="absolute top-4 left-4 w-full h-full bg-gray-200 z-0">
                            <img
                                src={profileImage}
                                alt="Eka Profile"
                                width="300"
                                height="400"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            className={`absolute -bottom-4 -right-4 w-24 h-24 border rounded-full flex items-center justify-center z-10 
                                ${theme.borderSolid} ${theme.bg} ${theme.text} cursor-pointer hover:scale-105 transition-transform duration-300 group`}
                            onClick={() => setShowCV(true)}
                        >
                            <span className="font-serif text-xl group-hover:text-accent transition-colors">CV</span>
                        </div>
                    </div>
                    {mode === 'wandering' && (
                        <>
                            <div className="absolute top-0 right-0 w-[2px] h-32 bg-accent animate-pulse" />
                        </>
                    )}
                </div>
            </section>

            {/* Ask Chat Section */}
            <AskChat mode={mode} />

            {/* Contact Section */}
            <section id="contact-section" className="min-h-[60vh] w-full flex flex-col justify-center items-center px-6 md:px-24 pt-32 pb-40 md:pb-24 bg-charcoal text-cream">
                <h2 className="font-serif text-5xl md:text-7xl mb-12 text-center">Let's Connect</h2>
                <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
                    <div className="flex-1">
                        <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors text-cream
                      ${errors.name ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                    `}
                                    style={{
                                        borderColor: errors.name ? COLOURS.accent : borderDefault,
                                    }}
                                />
                                {errors.name && <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />}
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors text-cream
                      ${errors.email ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                    `}
                                    style={{
                                        borderColor: errors.email ? COLOURS.accent : borderDefault,
                                    }}
                                />
                                {errors.email && <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />}
                            </div>
                            <div className="relative">
                                <textarea
                                    placeholder="Message"
                                    rows="2"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors resize-none text-cream
                      ${errors.message ? 'placeholder-opacity-50' : 'focus:border-opacity-100'}
                    `}
                                    style={{
                                        borderColor: errors.message ? COLOURS.accent : borderDefault,
                                    }}
                                ></textarea>
                                {errors.message && <AlertCircle className="absolute right-0 top-3 text-accent" size={16} />}
                            </div>
                            <button
                                className="self-start mt-4 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ color: COLOURS.cream }}
                                onMouseEnter={(e) => !isSending && (e.currentTarget.style.color = COLOURS.accent)}
                                onMouseLeave={(e) => !isSending && (e.currentTarget.style.color = COLOURS.cream)}
                                disabled={isSending}
                            >
                                {isSending ? 'Sending...' : 'Send Message'} {!isSending && <ArrowRight size={16} />}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-sm mt-2" style={{ color: COLOURS.success }}>Message sent successfully!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-sm mt-2 text-red-400">Failed to send. Please try again or email directly.</p>
                            )}
                        </form>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-8 md:pl-12 border-l-0 md:border-l border-white/10">
                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:ekazinich@gmail.com"
                                className="flex items-center gap-4 text-xl font-serif hover:translate-x-2 transition-transform duration-300"
                                style={{ color: COLOURS.cream }}
                                onMouseEnter={(e) => e.currentTarget.style.color = COLOURS.accent}
                                onMouseLeave={(e) => e.currentTarget.style.color = COLOURS.cream}
                            >
                                <Mail size={24} />
                                <span className="break-all">ekazinich@gmail.com</span>
                            </a>
                            <button
                                onClick={copyEmail}
                                className={`p-2 transition-colors duration-300`}
                                style={{ color: emailCopied ? COLOURS.success : COLOURS.cream }}
                                onMouseEnter={(e) => !emailCopied && (e.currentTarget.style.color = COLOURS.accent)}
                                onMouseLeave={(e) => !emailCopied && (e.currentTarget.style.color = COLOURS.cream)}
                                aria-label="Copy email address"
                            >
                                {emailCopied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                        <a
                            href="https://www.linkedin.com/in/katerina-eka-zinich"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-xl font-serif hover:translate-x-2 transition-transform duration-300"
                            style={{ color: COLOURS.cream }}
                            onMouseEnter={(e) => e.currentTarget.style.color = COLOURS.accent}
                            onMouseLeave={(e) => e.currentTarget.style.color = COLOURS.cream}
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
                    <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">

                        {/* Toolbar */}
                        <div className="flex items-center justify-between px-6 py-4 bg-charcoal text-cream border-b border-gray-700">
                            <h3 className="font-serif text-xl">Curriculum Vitae</h3>
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
                            <iframe
                                src={cvFile}
                                className="w-full h-full"
                                title="CV Preview"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
