import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const BoomerangVideo = ({ src }) => {
    const videoRef = React.useRef(null);
    const cycleCount = React.useRef(0);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 1.0;
        cycleCount.current = 0;
        video.play().catch(e => console.log("Video autoplay blocked", e));

        const handleEnded = () => {
            // Reached end, reverse
            video.playbackRate = -1.0;
            video.play().catch(e => console.log("Video reverse play error", e));
        };

        const handleTimeUpdate = () => {
            if (video.playbackRate < 0 && video.currentTime < 0.1) {
                // Reached start (approx)
                cycleCount.current += 1;
                if (cycleCount.current < 2) {
                    video.playbackRate = 1.0;
                    video.play().catch(e => console.log("Video cycle play error", e));
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        };

        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [src]);

    return <video ref={videoRef} src={src} muted playsInline className="w-full h-full object-cover" />;
};

const Lightbox = ({ src, onClose, isWandering, theme }) => {
    const [zoom, setZoom] = useState(1);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in ${isWandering ? 'bg-[#1A1A1A]/95' : 'bg-[#FDFBF7]/95'} ${zoom > 1 ? 'overflow-auto cursor-zoom-out' : 'p-4 cursor-default'}`}
            onClick={onClose}
        >
            <button
                className={`fixed top-6 right-6 hover:opacity-70 transition-colors z-[60] ${theme.text}`}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
                <X size={32} />
            </button>

            <div
                className={`relative transition-all duration-75 flex items-center justify-center ${zoom > 1 ? 'min-h-full py-10' : 'w-[80vw] h-[80vh]'}`}
                style={{ width: zoom > 1 ? `${zoom * 100}%` : (window.innerWidth < 768 ? '90vw' : '80vw'), height: zoom > 1 ? `${zoom * 100}%` : '80vh' }}
                onClick={(e) => { if (zoom > 1) e.stopPropagation(); }}
                onWheel={(e) => {
                    e.stopPropagation();
                    const delta = e.deltaY * -0.0001; // Ultra-fine sensitivity
                    setZoom(prev => Math.min(Math.max(1, prev + delta), 3));
                }}
            >
                <img
                    src={src}
                    alt="Full Screen View"
                    draggable="false"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Gradual stepped zoom on click: 1 -> 1.25 -> 1.5 ... -> 3 -> 1
                        setZoom(prev => (prev >= 3) ? 1 : prev + 0.25);
                    }}
                    className={`shadow-2xl p-[30px] transition-all duration-300 w-full h-full object-contain ${zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'} ${src.includes('brand-flow-chart') ? (src.includes('in-depth') ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]') : ''}`}
                />
            </div>
        </div>
    );
};

const ProjectDetail = ({ mode, playSound }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    // Find project by slug: Match the sanitized slug generation from Home.jsx
    const project = PROJECTS.find(p => p.title.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') === slug);

    // Redirect if not found (or handle gracefully)
    useEffect(() => {
        if (!project) {
            navigate('/');
        }
    }, [project, navigate]);

    // --- THEME ENGINE ---
    const isWandering = mode === 'wandering';

    // Select content based on mode
    const displayContent = (isWandering && project.wanderingContent)
        ? { ...project, ...project.wanderingContent }
        : project;

    const theme = {
        bg: isWandering ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]',
        text: isWandering ? 'text-[#FDFBF7]' : 'text-[#1A1A1A]',
        subText: isWandering ? 'text-[#FDFBF7]/60' : 'text-[#1A1A1A]/60',
        borderSoft: isWandering ? 'border-[#FDFBF7]/20' : 'border-[#1A1A1A]/20',
        projectSectionBg: isWandering ? 'bg-[#121212]' : 'bg-[#F5F3ED]',
        imagePlaceholderBg: isWandering ? 'bg-[#333]' : 'bg-gray-100',
        tagBg: isWandering ? 'bg-[#333] text-[#FDFBF7] border-[#444]' : 'bg-[#F5F3ED] text-gray-500 border-gray-200',
        cardBg: isWandering ? 'bg-[#2A2A2A]' : 'bg-white',
    };

    // --- SCROLL TO TOP ON PROJECT CHANGE ---
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    const [isStackExpanded, setIsStackExpanded] = useState(false);

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

    const backToProjectList = () => {
        playSound('general');
        navigate('/', { state: { scrollTo: 'project-section' } });
    };

    const openProject = (proj) => {
        playSound('general');
        const newSlug = proj.title.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
        navigate(`/projects/${newSlug}`);
    };

    if (!project) return null;

    return (
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
                    onClick={() => navigate('/', { state: { scrollTo: 'contact-section' } })}
                    className={`text-sm uppercase tracking-widest hover:text-[#C25E00] transition-colors ${theme.text}`}
                >
                    Hire Me
                </button>
            </div>

            {/* Expanded Content Layout - WIDER CONTAINER for Hero, Text Constrained */}
            <div className="flex-1 w-full max-w-[1920px] mx-auto py-12 flex flex-col gap-20">

                {/* Header - Constrained */}
                <div className="w-full max-w-6xl mx-auto px-6 text-center max-w-3xl mb-8">
                    <h1 className={`font-playfair text-4xl md:text-7xl mb-6 leading-tight ${theme.text}`}>{project.title}</h1>
                    <div className="flex justify-center gap-3 flex-wrap">
                        {project.tags.map(tag => (
                            <span key={tag} className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest ${theme.tagBg}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero Image/Video - FULL WIDTH (Less Constraint) */}
                {project.video && (
                    <div className={`w-full aspect-video overflow-hidden shadow-lg ${theme.imagePlaceholderBg}`}>
                        <BoomerangVideo src={project.video} />
                    </div>
                )}

                {(project.images && project.images[0]) && (
                    <div
                        className={`w-full aspect-video md:max-h-[85vh] overflow-hidden shadow-lg ${theme.imagePlaceholderBg} cursor-zoom-in ${project.video ? 'hidden' : ''}`}
                        onClick={() => setSelectedImage(project.images[0])}
                    >
                        <img src={project.images[0]} alt="Hero" draggable="false" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Impact - Constrained */}
                <div className="w-full max-w-5xl mx-auto px-6 text-center py-12">
                    <h3 className="font-lato text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">The Solution Impact</h3>

                    {typeof displayContent.impact === 'object' ? (
                        <div className="flex flex-col items-center">
                            <p className={`font-playfair text-2xl md:text-5xl leading-tight italic ${theme.text} mb-12`} style={{ textWrap: 'balance', whiteSpace: 'pre-line' }}>
                                {displayContent.impact.description}
                            </p>

                            <div className={`w-full h-px ${isWandering ? 'bg-[#FDFBF7]/20' : 'bg-[#1A1A1A]/20'} mb-8`}></div>

                            <h4 className="font-lato text-xs font-bold uppercase tracking-[0.15em] text-[#C25E00] mb-8">{displayContent.impact.outcomesTitle || "Key Outcome"}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 w-full max-w-7xl">
                                {displayContent.impact.outcomes && displayContent.impact.outcomes.map((outcome, i) => (
                                    <div key={i} className="text-left flex flex-col gap-2">
                                        <h5 className={`font-playfair text-xl italic font-bold ${theme.text}`}>{outcome.title}</h5>
                                        <p className={`font-lato text-base ${theme.subText}`}>{outcome.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className={`w-full h-px ${isWandering ? 'bg-[#FDFBF7]/20' : 'bg-[#1A1A1A]/20'} mt-12`}></div>
                        </div>
                    ) : (
                        <p className={`font-playfair text-2xl md:text-5xl leading-tight italic ${theme.text}`} style={{ textWrap: 'balance', whiteSpace: 'pre-line' }}>
                            {displayContent.impact}
                        </p>
                    )}
                </div>

                {/* Section 1: Challenge (Constrained) */}
                {(() => {
                    const challengeImage = displayContent.challengeImage || (project.images && project.images[1]);
                    return (
                        <div className={`w-full max-w-6xl mx-auto px-6 grid ${challengeImage ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-stretch`}>
                            <div className="order-2 md:order-1 flex flex-col justify-center">
                                <h3 className="font-playfair text-3xl mb-4 text-[#C25E00]">The Challenge</h3>
                                <p className={`font-lato text-lg leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>{displayContent.challenge}</p>
                            </div>
                            {challengeImage && (
                                <div className={`w-full h-full min-h-[300px] order-1 md:order-2 bg-transparent cursor-zoom-in`} onClick={() => setSelectedImage(challengeImage)}>
                                    <img src={challengeImage} alt="Challenge Detail" draggable="false" className={`w-full h-full object-cover hover:scale-105 transition-transform duration-700`} />
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* Section 2: Role (Full Width Background, Constrained Content) */}
                <div className={`w-full border-y border-[#FFD1A3] ${theme.projectSectionBg}`}>
                    {isWandering ? (
                        <div className={`max-w-6xl mx-auto px-6 py-12 ${displayContent.roleImage ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'text-center'}`}>
                            {displayContent.roleImage && (
                                <div
                                    className={`aspect-video overflow-hidden shadow-lg cursor-zoom-in ${theme.imagePlaceholderBg} order-2 md:order-1`}
                                    onClick={() => setSelectedImage(displayContent.roleImage)}
                                >
                                    <img
                                        src={displayContent.roleImage}
                                        alt="Role Detail"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            )}
                            <div className={`${displayContent.roleImage ? 'order-1 md:order-2 text-left' : 'max-w-4xl mx-auto'}`}>
                                <h3 className={`font-playfair text-3xl mb-4 ${theme.text}`}>My Role</h3>
                                <p className={`font-lato text-lg leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>{displayContent.role}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                            <h3 className={`font-playfair text-3xl mb-4 ${theme.text}`}>My Role</h3>
                            <p className={`font-lato text-lg max-w-2xl mx-auto leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>{displayContent.role}</p>

                            {displayContent.roleImage && (
                                <div
                                    className={`mt-12 max-w-lg mx-auto aspect-video overflow-hidden shadow-lg cursor-zoom-in ${theme.imagePlaceholderBg}`}
                                    onClick={() => setSelectedImage(displayContent.roleImage)}
                                >
                                    <img
                                        src={displayContent.roleImage}
                                        alt="Role Detail"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Section 3: Process */}
                {typeof displayContent.process === 'object' && displayContent.process.type === 'rich' ? (
                    <div className="w-full">
                        {displayContent.process.sections.map((section, idx) => {
                            if (section.type === 'text') {
                                return (
                                    <div key={idx} className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-12">
                                        {/* Placeholder for Process Image if needed, or just keep text focus */}
                                        {(section.image || (project.images && project.images[2] && project.id !== 3 && !section.hideImage)) && (
                                            <div className={`aspect-square overflow-hidden ${(project.id === 2 || project.id === 3 || project.id === 1) ? '' : 'shadow-sm'} ${(project.id === 3 || project.id === 1) ? (isWandering ? 'bg-[#1A1A1A]' : 'bg-[#FDFBF7]') : theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(section.image || project.images[2])}>
                                                <img src={section.image || project.images[2]} alt="Process Detail" draggable="false" className={`w-full h-full ${(project.id === 3 || project.id === 1) ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-700`} />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-playfair text-3xl mb-4 text-[#C25E00]">The Process</h3>
                                            <p className={`font-lato text-lg leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                                        </div>
                                    </div>
                                );
                            }
                            if (section.type === 'comparison') {
                                return (
                                    <div key={idx} className="w-full py-12" style={{ backgroundColor: section.bg }}>
                                        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                            {section.items.map((item, i) => (
                                                <div key={i} className="flex flex-col gap-6">
                                                    <div
                                                        className={`aspect-[4/3] w-full overflow-hidden shadow-sm ${isWandering ? 'bg-[#1A1A1A]' : 'bg-white'} cursor-zoom-in group`}
                                                        onClick={() => item.img && setSelectedImage(item.img)}
                                                    >
                                                        {item.img && (
                                                            <img
                                                                src={item.img}
                                                                alt={item.title}
                                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-playfair text-xl font-bold mb-4 ${theme.text}`}>{item.title}</h4>
                                                        <p className={`font-lato text-base leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            if (section.type === 'gallery') {
                                return (
                                    <div key={idx} className="w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-evenly items-start gap-8 mb-12">
                                        {section.items.map((img, i) => (
                                            <div
                                                key={i}
                                                className={`w-full md:w-64 aspect-auto overflow-hidden shadow-sm ${isWandering ? 'bg-[#1A1A1A]' : 'bg-white'} cursor-zoom-in group relative`}
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Process variation ${i + 1}`}
                                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div className={`w-full max-w-6xl mx-auto px-6 grid ${project.images && project.images[2] ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
                        {project.images && project.images[2] && (
                            <div className={`aspect-square overflow-hidden ${(project.id === 2 || project.id === 3) ? '' : 'shadow-sm'} ${project.id === 3 ? 'bg-[#FDFBF7]' : theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[2])}>
                                <img src={project.images[2]} alt="Process Detail" draggable="false" className={`w-full h-full ${project.id === 3 ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-700`} />
                            </div>
                        )}
                        <div>
                            <h3 className="font-playfair text-3xl mb-4 text-[#C25E00]">The Process</h3>
                            <p className={`font-lato text-lg leading-relaxed ${theme.subText}`} style={{ whiteSpace: 'pre-line' }}>{displayContent.process}</p>
                        </div>
                    </div>
                )}

                {/* Key Takeaway Section (Impact Mode) */}
                {!isWandering && displayContent.keyTakeaway && (
                    <div className="w-full max-w-7xl mx-auto px-6 text-center py-12">
                        <div className="w-full h-[0.5px] bg-[#D0CECB] mb-8"></div>

                        <h4 className="font-lato text-xs font-bold uppercase tracking-[0.15em] text-[#C25E00] mb-8">
                            {displayContent.keyTakeaway.title || "Key Takeaway"}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 w-full max-w-7xl mx-auto">
                            {displayContent.keyTakeaway.outcomes.map((outcome, i) => (
                                <div key={i} className="text-left flex flex-col gap-2">
                                    <h5 className={`font-playfair text-xl italic font-bold ${theme.text}`}>{outcome.title}</h5>
                                    <p className={`font-lato text-base ${theme.subText}`}>{outcome.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="w-full h-[0.5px] bg-[#D0CECB] my-8"></div>

                        {displayContent.keyTakeaway.stackedImages ? (
                            <div className="mt-12 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                {/* Stacked Images Container */}
                                <div
                                    className={`relative w-full aspect-[4/3] group perspective-1000 order-1 ${isStackExpanded ? 'stack-expanded' : ''}`}
                                    onMouseLeave={() => setIsStackExpanded(false)}
                                >
                                    {displayContent.keyTakeaway.stackedImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer"
                                            style={{
                                                zIndex: displayContent.keyTakeaway.stackedImages.length - idx,
                                            }}
                                            onClick={(e) => {
                                                // Check for touch device/no-hover
                                                const isTouch = window.matchMedia('(hover: none)').matches;
                                                if (isTouch) {
                                                    e.stopPropagation();
                                                    setIsStackExpanded(!isStackExpanded); // Toggle animation on tap, no zoom
                                                } else {
                                                    setSelectedImage(img.src);
                                                }
                                            }}
                                        >
                                            {/* We use a local style block to handle the hover state for this specific index */}
                                            <style>{`
                                                .group:hover .stack-img-${idx}, .stack-expanded .stack-img-${idx} {
                                                    transform: rotate(${img.rotate}deg) translateX(${idx * 10}px);
                                                }
                                             `}</style>
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className={`w-full h-full object-contain drop-shadow-xl bg-transparent transition-transform duration-700 ease-out stack-img-${idx}`}
                                                style={{ transformOrigin: 'bottom right' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="order-2 flex flex-col gap-8 text-left">
                                    {displayContent.keyTakeaway.description && (
                                        <div className={`font-lato text-lg leading-relaxed ${theme.text}`}>
                                            {displayContent.keyTakeaway.description}
                                        </div>
                                    )}
                                    {displayContent.keyTakeaway.imageCaption && (
                                        <div className={`font-lato text-base italic ${theme.subText} flex flex-col gap-4`}>
                                            {displayContent.keyTakeaway.imageCaption.split('\n\n').map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : displayContent.keyTakeaway.image ? (
                            <div className="mt-12 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div
                                    className="w-full overflow-hidden cursor-zoom-in order-1"
                                    onClick={() => setSelectedImage(displayContent.keyTakeaway.image)}
                                >
                                    <img
                                        src={displayContent.keyTakeaway.image}
                                        alt="Key Takeaway Visual"
                                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="order-2 flex flex-col gap-8 text-left">
                                    {displayContent.keyTakeaway.description && (
                                        <div className={`font-lato text-lg leading-relaxed ${theme.text}`}>
                                            {displayContent.keyTakeaway.description}
                                        </div>
                                    )}
                                    {displayContent.keyTakeaway.imageCaption && (
                                        <div className={`font-lato text-base italic ${theme.subText} flex flex-col gap-4`}>
                                            {displayContent.keyTakeaway.imageCaption.split('\n\n').map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            displayContent.keyTakeaway.description && (
                                <div className={`font-lato text-lg leading-relaxed ${theme.text} mb-8`}>
                                    {displayContent.keyTakeaway.description}
                                </div>
                            )
                        )
                        }
                    </div>
                )}

                {/* Section 4: Refinement (Constrained) */}
                {/* Section 4: Refinement */}
                {
                    displayContent.refinement && isWandering && (
                        <div className="w-full">
                            {typeof displayContent.refinement === 'object' ? (
                                <div className="w-full max-w-7xl mx-auto px-6 text-center py-12">
                                    <div className={`w-full h-px ${isWandering ? 'bg-[#FDFBF7]/20' : 'bg-[#1A1A1A]/20'} mb-8`}></div>

                                    <h4 className="font-lato text-xs font-bold uppercase tracking-[0.15em] text-[#C25E00] mb-8">
                                        {displayContent.refinement.outcomesTitle || "Key Takeaway"}
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 w-full max-w-7xl mx-auto">
                                        {displayContent.refinement.outcomes && displayContent.refinement.outcomes.map((outcome, i) => (
                                            <div key={i} className="text-left flex flex-col gap-2">
                                                <h5 className={`font-playfair text-xl italic font-bold ${theme.text}`}>{outcome.title}</h5>
                                                <p className={`font-lato text-base ${theme.subText}`}>{outcome.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`w-full h-px ${isWandering ? 'bg-[#FDFBF7]/20' : 'bg-[#1A1A1A]/20'} my-8`}></div>

                                    {displayContent.refinement.description && (
                                        <div className={`grid ${project.images && project.images[3] ? 'grid-cols-1 md:grid-cols-2 gap-12' : 'grid-cols-1'} items-center`}>
                                            <div className="font-lato text-lg leading-relaxed text-left order-2 md:order-1">
                                                {displayContent.refinement.description.split('\n\n').map((part, index) => (
                                                    <p key={index} className={`${index === 1 ? 'text-[#A2A19F]' : theme.text} ${index > 0 ? 'mt-8' : ''}`}>
                                                        {part}
                                                    </p>
                                                ))}
                                            </div>
                                            {project.images && project.images[3] && (
                                                <div
                                                    className="w-full h-auto order-1 md:order-2 bg-transparent cursor-zoom-in relative group"
                                                    onClick={() => setSelectedImage(project.images[3])}
                                                >
                                                    <style>{`
                                                        .scribble-path {
                                                            stroke-dasharray: 1000;
                                                            stroke-dashoffset: 1000;
                                                            transition: stroke-dashoffset 0.8s ease-out;
                                                        }
                                                        .group:hover .scribble-path {
                                                            stroke-dashoffset: 0;
                                                        }
                                                    `}</style>
                                                    <img
                                                        src={project.images[3]}
                                                        alt="Refinement Detail"
                                                        draggable="false"
                                                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                                                    />
                                                    {/* Burnt orange oval highlight for ABN numbers */}
                                                    <div className="absolute bottom-2 -left-12 w-56 h-12 pointer-events-none z-10 opacity-90">
                                                        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-[-2deg]">
                                                            <path
                                                                d="M10 30 C 10 10 190 10 190 30 C 190 50 10 50 10 30 M 15 32 C 15 15 185 15 185 30"
                                                                stroke="#C25E00"
                                                                strokeWidth="3"
                                                                strokeLinecap="round"
                                                                fill="none"
                                                                className="scribble-path"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={`w-full max-w-6xl mx-auto px-6 grid ${project.images && project.images[3] ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
                                    <div className="order-2 md:order-1">
                                        <p className={`font-lato text-lg leading-relaxed ${theme.subText}`}>
                                            {displayContent.refinement.split(': ')[0] && <span className="block font-lato text-xs font-bold uppercase tracking-[0.15em] text-[#C25E00] mb-8">{displayContent.refinement.split(': ')[0]}</span>}
                                            {displayContent.refinement.includes(': ') ? displayContent.refinement.split(': ').slice(1).join(': ') : displayContent.refinement}
                                        </p>
                                    </div>
                                    {project.images && project.images[3] && (
                                        <div className={`w-full h-auto overflow-hidden shadow-sm order-1 md:order-2 ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[3])}>
                                            <img src={project.images[3]} alt="Refinement Detail" draggable="false" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                }
            </div>


            {/* Bottom Navigation (Explore Others) */}
            <div className={`w-full py-12 px-6 mt-12 ${theme.projectSectionBg}`}>
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Explore Other Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {PROJECTS.filter(p => p.id !== project.id).map((proj) => (
                            <button
                                key={proj.id}
                                onClick={() => openProject(proj)}
                                className={`text-left p-4 border transition-all duration-300 border-transparent hover:border-[#FFD1A3] hover:shadow-md ${isWandering ? 'bg-[#2A2A2A]' : 'bg-white'}`}
                            >
                                <div className="text-xs text-gray-400 mb-2">0{PROJECTS.indexOf(proj) + 1}</div>
                                <div className={`font-playfair text-lg italic leading-tight ${theme.text}`}>{proj.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div >



            {/* Lightbox Overlay */}
            {
                selectedImage && (
                    <Lightbox
                        src={selectedImage}
                        onClose={() => setSelectedImage(null)}
                        isWandering={isWandering}
                        theme={theme}
                        key={selectedImage}
                    />
                )
            }
        </div >
    );
};

export default ProjectDetail;
