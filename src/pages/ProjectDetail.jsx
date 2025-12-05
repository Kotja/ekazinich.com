import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const ProjectDetail = ({ mode, playSound }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    // Find project by slug
    const project = PROJECTS.find(p => p.title.toLowerCase().replace(/ /g, '-') === slug);

    // Redirect if not found (or handle gracefully)
    useEffect(() => {
        if (!project) {
            navigate('/');
        }
    }, [project, navigate]);

    // --- THEME ENGINE ---
    const isWandering = mode === 'wandering';
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
        const newSlug = proj.title.toLowerCase().replace(/ /g, '-');
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

                {project.images && project.images[0] && (
                    <div className={`w-full aspect-video overflow-hidden shadow-lg ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[0])}>
                        <img src={project.images[0]} alt="Hero" draggable="false" className="w-full h-full object-contain" />
                    </div>
                )}

                {/* Section: Impact (Moved Up) */}
                <div className="max-w-5xl mx-auto text-center py-12">
                    <h3 className="font-lato text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">The Solution Impact</h3>
                    <p className={`font-playfair text-2xl md:text-5xl leading-tight italic ${theme.text}`} style={{ textWrap: 'balance' }}>
                        "{project.impact}"
                    </p>
                </div>

                {/* Section 1: Challenge (Text Left, Img Right) */}
                <div className={`grid ${project.images && project.images[1] ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
                    <div className="order-2 md:order-1">
                        <h3 className="font-playfair text-3xl mb-4 text-[#C25E00] border-b border-[#C25E00] inline-block pb-2">The Challenge.</h3>
                        <p className={`font-lato text-lg leading-relaxed ${theme.subText}`}>{project.challenge}</p>
                    </div>
                    {project.images && project.images[1] && (
                        <div className={`aspect-square overflow-hidden shadow-sm order-1 md:order-2 ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[1])}>
                            <img src={project.images[1]} alt="Challenge Detail" draggable="false" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    )}
                </div>

                {/* Section 2: Role (Text Block) */}
                <div className={`p-8 md:p-12 text-center border-y border-[#FFD1A3] ${theme.projectSectionBg}`}>
                    <h3 className={`font-playfair text-3xl mb-4 ${theme.text}`}>My Role.</h3>
                    <p className={`font-lato text-lg max-w-2xl mx-auto leading-relaxed ${theme.subText}`}>{project.role}</p>
                </div>

                {/* Section 3: Process (Img Left, Text Right) */}
                <div className={`grid ${project.images && project.images[2] ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
                    {project.images && project.images[2] && (
                        <div className={`aspect-square overflow-hidden ${(project.id === 2 || project.id === 3) ? '' : 'shadow-sm'} ${theme.imagePlaceholderBg} cursor-zoom-in`} onClick={() => setSelectedImage(project.images[2])}>
                            <img src={project.images[2]} alt="Process Detail" draggable="false" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    )}
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
                        {PROJECTS.filter(p => p.title.toLowerCase().replace(/ /g, '-') !== slug).map((proj) => (
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
            </div>

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
        </div>
    );
};

export default ProjectDetail;
