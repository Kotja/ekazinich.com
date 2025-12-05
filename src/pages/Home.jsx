import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Check, Copy, Linkedin, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import profileImage from '../assets/profile.png';
import { PROJECTS } from '../data/projects';

const Home = ({ mode, playSound, scrollToSection }) => {
    const navigate = useNavigate();
    const [hoverHero, setHoverHero] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});

    // --- THEME ENGINE ---
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
        cardBg: isWandering ? 'bg-[#2A2A2A]' : 'bg-white',
        imagePlaceholderBg: isWandering ? 'bg-[#333]' : 'bg-gray-100',
        tagBg: isWandering ? 'bg-[#333] text-[#FDFBF7] border-[#444]' : 'bg-[#F5F3ED] text-gray-500 border-gray-200',
    };

    const COLOURS = {
        highlight: '#C25E00', // Burnt Orange - Error/Active
        suggestion: '#FFD1A3', // Peach - Hover/Suggestion
        cream: '#FDFBF7',
        charcoal: '#1A1A1A',
        confirmation: '#10B981', // Emerald Green - Success
        mustard: '#E5B700',
        deepOrange: '#EA8C10',
    };

    const heroWords = {
        hr: ['Clarity.', 'Precision.', 'Impact.'],
        wandering: ['Canvas.', 'Perspective.', 'Insights.']
    };
    const currentWords = (mode === 'wandering' && hoverHero) ? heroWords.wandering : heroWords.hr;

    const openProject = (project) => {
        playSound('general');
        // Slugify title for URL
        const slug = project.title.toLowerCase().replace(/ /g, '-');
        navigate(`/projects/${slug}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    return (
        <>
            {/* ================= HOME VIEW ================= */}

            <section id="project-section" className="min-h-[100dvh] w-full flex flex-col md:flex-row relative pt-20 md:pt-0 max-w-screen-2xl mx-auto">

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
                                className={`font-playfair md:text-[8vw] xl:text-[6vw] 2xl:text-[5.5rem] text-[15vw] leading-[1.1] md:leading-[0.9] duration-700 ease-in-out
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
                                mobileMargin: 'ml-10 mt-10',
                                frameMobileMargin: '',
                                desktopMargin: 'md:ml-10 md:mt-10',
                                frameDesktopMargin: '',
                                textPos: 'items-start justify-start text-left pl-4 pt-4'
                            }, // TL: Client Converting Portfolio
                            {
                                front: 'rounded-none', back: 'rounded-full',
                                gradient: 'linear-gradient(to bottom, #FFA500, #C27000)', // Light to Dark Orange
                                className: 'md:translate-y-20', // Moved up by ~half size
                                mobileMargin: 'ml-0 mt-0',
                                frameMobileMargin: 'ml-10 mt-[5.5rem]',
                                desktopMargin: 'md:ml-0 md:mt-0',
                                frameDesktopMargin: 'md:ml-10 md:mt-[4.5rem]',
                                textPos: 'items-end justify-end text-right pr-12 pb-6 md:pr-12'
                            }, // TR: Studio Booking
                            {
                                front: 'rounded-none', back: 'rounded-none',
                                gradient: 'linear-gradient(to bottom, #C27000, #FFA500)', // Dark to Light Orange
                                className: '',
                                mobileMargin: 'ml-10 mt-0',
                                frameMobileMargin: 'mt-16',
                                desktopMargin: 'md:ml-10 md:mt-0',
                                frameDesktopMargin: 'md:mt-16',
                                textPos: 'items-end justify-start text-left pl-4 pb-4'
                            }, // BL: B2B
                            {
                                front: 'rounded-full', back: 'rounded-none',
                                gradient: 'linear-gradient(to bottom, #FFD700, #CC9900)', // Light to Dark Yellow
                                className: 'md:translate-y-[15.4rem]', // Moved up ~10px
                                mobileMargin: 'ml-0 mt-0',
                                frameMobileMargin: 'ml-10 mt-12',
                                desktopMargin: 'md:ml-0 md:mt-0',
                                frameDesktopMargin: 'md:ml-10 md:mt-16',
                                textPos: 'items-end justify-end text-right pr-4 pb-4'
                            }, // BR: Collector
                        ];

                        const config = geometricConfig[idx];

                        let orderClass = '';
                        if (idx === 0) orderClass = 'order-1';
                        if (idx === 1) orderClass = 'order-3 md:order-2';
                        if (idx === 2) orderClass = 'order-2 md:order-3';
                        if (idx === 3) orderClass = 'order-4';

                        return (
                            <div
                                key={proj.id}
                                className={`relative grid grid-cols-1 grid-rows-1 w-fit h-fit group cursor-pointer ${config.className} ${orderClass}`}
                                onClick={() => openProject(proj)}
                                onMouseEnter={() => playSound('general')}
                            >
                                {/* Back Frame (Outline + Title) */}
                                <div className={`col-start-1 row-start-1 w-36 h-36 md:w-48 md:h-48 relative border-2 ${theme.borderSolid} ${config.back} flex ${config.textPos} transition-transform duration-500 group-hover:scale-105 z-0 ${config.frameMobileMargin || ''} ${config.frameDesktopMargin || ''}`}>
                                    <span className={`font-playfair italic text-sm ${theme.text} leading-tight max-w-[90%]`}>
                                        {displayTitle}
                                    </span>
                                </div>

                                {/* Front Shape (Color -> Image) */}
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
            <section id="about-section" className="min-h-[80vh] w-full flex flex-col md:flex-row items-center px-6 md:px-24 py-24 relative overflow-hidden max-w-screen-2xl mx-auto">
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
                                        borderColor: errors.name ? COLOURS.highlight : `${COLOURS.cream}4D`,
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
    );
};

export default Home;
