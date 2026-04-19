import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import brandChallengeAniOnWhite from '../assets/brand-challenge-ani-onwhite.webp';
import brandChallengeAniOnBlack from '../assets/brand-challenge-ani-onblack.webp';
import CandidateJourneyGraph from '../components/CandidateJourneyGraph';
import ProjectMeta from '../components/ProjectMeta';
import { getTheme } from '../theme';

const BoomerangVideo = ({ src }) => {
  const videoRef = React.useRef(null);
  const cycleCount = React.useRef(0);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    cycleCount.current = 0;
    video.play().catch(() => {});

    const handleEnded = () => {
      video.playbackRate = -1.0;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (video.playbackRate < 0 && video.currentTime < 0.1) {
        cycleCount.current += 1;
        if (cycleCount.current < 2) {
          video.playbackRate = 1.0;
          video.play().catch(() => {});
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

  return (
    <video ref={videoRef} src={src} muted playsInline className="w-full h-full object-cover" />
  );
};

const Lightbox = ({ src, onClose, isWandering, theme, gallery = null, currentIndex = 0 }) => {
  const [zoom, setZoom] = useState(1);
  const [index, setIndex] = useState(currentIndex);

  const hasGallery = gallery && gallery.length > 1;
  const currentSrc = hasGallery ? gallery[index] : src;

  const goToPrev = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    setZoom(1);
  };

  const goToNext = (e) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % gallery.length);
    setZoom(1);
  };

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Get scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Cleanup: restore scroll when light box closes
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasGallery) return;
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasGallery, gallery]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in ${isWandering ? 'bg-charcoal/95' : 'bg-cream/95'} ${zoom > 1 ? 'overflow-auto cursor-zoom-out' : 'p-4 cursor-default'}`}
      onClick={onClose}
    >
      <button
        className={`fixed top-6 right-6 hover:opacity-70 transition-colors z-[60] ${theme.text}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={32} />
      </button>

      <div
        className={`relative transition-all duration-75 flex items-center justify-center ${zoom > 1 ? 'min-h-full py-10' : 'w-[80vw] h-[80vh]'}`}
        style={{
          width: zoom > 1 ? `${zoom * 100}%` : window.innerWidth < 768 ? '90vw' : '80vw',
          height: zoom > 1 ? `${zoom * 100}%` : '80vh',
        }}
        onClick={(e) => {
          if (zoom > 1) e.stopPropagation();
        }}
        onWheel={(e) => {
          e.stopPropagation();
          const delta = e.deltaY * -0.0001; // Ultra-fine sensitivity
          setZoom((prev) => Math.min(Math.max(1, prev + delta), 3));
        }}
      >
        {/* Navigation Arrows - Inside image container */}
        {hasGallery && (
          <>
            <button
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[70] ${theme.text} hover:opacity-70 transition-opacity p-2 md:p-3 rounded-full ${isWandering ? 'bg-surface-dark-raised/80' : 'bg-white/80'} backdrop-blur-sm`}
              onClick={goToPrev}
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[70] ${theme.text} hover:opacity-70 transition-opacity p-2 md:p-3 rounded-full ${isWandering ? 'bg-surface-dark-raised/80' : 'bg-white/80'} backdrop-blur-sm`}
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div
              className={`absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-[70] ${theme.text} text-sm px-3 py-1 rounded-full ${isWandering ? 'bg-surface-dark-raised/80' : 'bg-white/80'} backdrop-blur-sm`}
            >
              {index + 1} / {gallery.length}
            </div>
          </>
        )}
        <img
          src={currentSrc}
          alt="Full Screen View"
          draggable="false"
          onClick={(e) => {
            e.stopPropagation();
            // Gradual stepped zoom on click: 1 -> 1.25 -> 1.5 ... -> 3 -> 1
            setZoom((prev) => (prev >= 3 ? 1 : prev + 0.25));
          }}
          className={`shadow-2xl p-[30px] transition-all duration-300 w-full h-full object-contain ${zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'} ${currentSrc.includes('brand-flow-chart') ? (currentSrc.includes('in-depth') ? 'bg-charcoal' : 'bg-cream') : ''}`}
        />
      </div>
    </div>
  );
};

// Challenge Image Component - Image display with hover animation swap and zoom functionality
const InteractiveChallengeImage = ({ src, isWandering, onImageClick, projectId }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobileClicked, setIsMobileClicked] = React.useState(false);

  // Determine which animation to show based on mode (project ID 3 is Brand project)
  const hoverImage =
    projectId === 3 ? (isWandering ? brandChallengeAniOnBlack : brandChallengeAniOnWhite) : null;

  const handleClick = (e) => {
    // Detect if device is touch-enabled (mobile/tablet)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (isTouchDevice && projectId === 3) {
      // Mobile/Tablet behavior
      if (!isMobileClicked) {
        // First click: Show animation, don't open lightbox
        e.stopPropagation();
        setIsMobileClicked(true);
      } else {
        // Second click: Open lightbox with animation image
        onImageClick(hoverImage);
      }
    } else {
      // Desktop behavior: Open lightbox directly with animation image (for Brand project)
      if (projectId === 3 && hoverImage) {
        onImageClick(hoverImage);
      } else {
        onImageClick(src);
      }
    }
  };

  // Determine which image to display
  const displayImage = (isHovered || isMobileClicked) && hoverImage ? hoverImage : src;

  return (
    <div
      className="w-full h-full min-h-[300px] bg-transparent cursor-zoom-in flex items-center justify-center"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={displayImage}
        alt="Challenge Detail"
        draggable="false"
        className="w-full h-full object-contain transition-all duration-500"
      />
    </div>
  );
};

const ProjectDetail = ({ mode }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Find project by slug: Match the sanitized slug generation from Home.jsx
  const project = PROJECTS.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') === slug
  );

  // Redirect if not found (or handle gracefully)
  useEffect(() => {
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  // --- THEME ENGINE ---
  const isWandering = mode === 'wandering';

  // Select content based on mode
  const displayContent =
    isWandering && project.wanderingContent ? { ...project, ...project.wanderingContent } : project;

  const theme = getTheme(mode);

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
    navigate('/', { state: { scrollTo: 'project-section' } });
  };

  const openProject = (proj) => {
    const newSlug = proj.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    navigate(`/projects/${newSlug}`);
  };

  if (!project) return null;

  return (
    <div
      className={`min-h-screen animate-fade-in relative flex flex-col ${theme.bg} pb-24 md:pb-0`}
    >
      <ProjectMeta project={project} slug={slug} />
      {/* Top Bar Navigation */}
      <div
        className={`w-full px-6 py-6 flex justify-between items-center border-b ${theme.borderSoft}`}
      >
        <button
          onClick={backToProjectList}
          className={`flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent transition-colors ${theme.text}`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'contact-section' } })}
          className={`text-sm uppercase tracking-widest hover:text-accent transition-colors ${theme.text}`}
        >
          Hire Me
        </button>
      </div>

      {/* Expanded Content Layout - WIDER CONTAINER for Hero, Text Constrained */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto py-12 flex flex-col gap-20">
        {/* Header - Constrained */}
        <div className="w-full max-w-6xl mx-auto px-6 text-center max-w-3xl mb-8">
          <h1 className={`font-serif text-4xl md:text-7xl mb-4 leading-tight ${theme.text}`}>
            {project.title}
          </h1>
          {project.subtitle && (
            <p className={`font-serif text-lg md:text-2xl mb-6 ${theme.subText} opacity-70`}>
              {project.subtitle}
            </p>
          )}
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest ${theme.tagBg}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image/Video - FULL WIDTH (Less Constraint) */}
        {project.video && (
          <div
            className={`w-full aspect-video overflow-hidden shadow-lg ${theme.imagePlaceholderBg}`}
          >
            <BoomerangVideo src={project.video} />
          </div>
        )}

        {project.images && project.images[0] && (
          <div
            className={`w-full aspect-video md:max-h-[85vh] overflow-hidden shadow-lg ${theme.imagePlaceholderBg} cursor-zoom-in ${project.video ? 'hidden' : ''}`}
            onClick={() => setSelectedImage(project.images[0])}
          >
            <img
              src={project.images[0]}
              alt="Hero"
              draggable="false"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Impact - Constrained */}
        <div className="w-full max-w-5xl mx-auto px-6 text-center py-12">
          <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
            The Solution Impact
          </h3>

          {typeof displayContent.impact === 'object' ? (
            <div className="flex flex-col items-center">
              <p
                className={`font-serif text-2xl md:text-5xl leading-tight text-balance whitespace-pre-line ${theme.text} mb-12`}
              >
                {displayContent.impact.description}
              </p>

              <div
                className={`w-full h-px ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mb-8`}
              ></div>

              <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
                {displayContent.impact.outcomesTitle || 'Key Outcome'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full max-w-3xl mx-auto md:items-start">
                {displayContent.impact.outcomes &&
                  displayContent.impact.outcomes.map((outcome, i) => (
                    <div key={i} className="text-left flex flex-col gap-2">
                      <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                      <p className={`font-sans text-base ${theme.subText}`}>{outcome.desc}</p>
                    </div>
                  ))}
              </div>

              <div
                className={`w-full h-px ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mt-12`}
              ></div>
            </div>
          ) : (
            <p
              className={`font-serif text-2xl md:text-5xl leading-tight text-balance whitespace-pre-line ${theme.text}`}
            >
              {displayContent.impact}
            </p>
          )}
        </div>

        {/* Section 1: Challenge (Constrained) */}
        {(() => {
          const challengeImage =
            displayContent.challengeImage || (project.images && project.images[1]);
          return (
            <div
              className={`w-full max-w-6xl mx-auto px-6 ${challengeImage ? 'md:flex md:gap-12 md:items-center' : 'grid grid-cols-1'}`}
            >
              <div className="order-2 md:order-1 flex flex-col justify-center md:flex-1">
                <h3 className="font-serif text-3xl mb-4 text-accent">The Challenge</h3>
                <p
                  className={`font-sans text-lg leading-relaxed max-w-[600px] whitespace-pre-line ${theme.subText}`}
                >
                  {displayContent.challenge}
                </p>
              </div>
              {challengeImage && (
                <div className="md:w-1/2 md:flex-shrink-0">
                  <InteractiveChallengeImage
                    src={challengeImage}
                    isWandering={isWandering}
                    theme={theme}
                    onImageClick={(img) => setSelectedImage(img || challengeImage)}
                    projectId={project.id}
                  />
                </div>
              )}
            </div>
          );
        })()}

        {/* Section 2: Role (Full Width Background, Constrained Content) */}
        <div className={`w-full border-y border-accent-peach ${theme.projectSectionBg}`}>
          {isWandering ? (
            <div
              className={`max-w-6xl mx-auto px-6 py-12 ${displayContent.roleImage ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'text-center'}`}
            >
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
              <div
                className={`${displayContent.roleImage ? 'order-1 md:order-2 text-left' : 'max-w-4xl mx-auto'}`}
              >
                <h3 className={`font-serif text-3xl mb-4 ${theme.text}`}>My Role</h3>
                <p
                  className={`font-sans text-lg leading-relaxed max-w-[600px] mx-auto whitespace-pre-line ${theme.subText}`}
                >
                  {displayContent.role}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
              <h3 className={`font-serif text-3xl mb-4 ${theme.text}`}>My Role</h3>
              <p
                className={`font-sans text-lg max-w-[600px] mx-auto leading-relaxed whitespace-pre-line ${theme.subText}`}
              >
                {displayContent.role}
              </p>

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
            {/* Render animated component if specified */}
            {displayContent.process.renderComponent === 'CandidateJourneyGraph' && (
              <div className="w-full max-w-6xl mx-auto px-6 mb-12">
                {/* The Process title at the very top */}
                <h3 className="font-serif text-3xl mb-12 text-accent text-center">The Process</h3>
                {/* Text before graph */}
                {displayContent.process.beforeGraph && (
                  <div className="max-w-[600px] mx-auto mb-12 text-left">
                    <p
                      className={`font-sans text-lg leading-relaxed whitespace-pre-line ${theme.subText}`}
                    >
                      {displayContent.process.beforeGraph}
                    </p>
                  </div>
                )}
                {/* The graph */}
                <CandidateJourneyGraph theme={theme} />
                {/* Text after graph */}
                {displayContent.process.afterGraph && (
                  <div className="max-w-4xl mx-auto mt-12">
                    {Array.isArray(displayContent.process.afterGraph) ? (
                      <>
                        {/* First item: full-width centered block */}
                        {displayContent.process.afterGraph[0] && (
                          <div className="text-left mb-8">
                            <p
                              className={`font-sans text-lg leading-relaxed max-w-[600px] mx-auto whitespace-pre-line ${theme.subText}`}
                            >
                              {displayContent.process.afterGraph[0]}
                            </p>
                          </div>
                        )}
                        {/* Remaining items: single column stack */}
                        {displayContent.process.afterGraph.length > 1 && (
                          <div className="flex flex-col gap-8 mt-8">
                            {displayContent.process.afterGraph.slice(1).map((text, idx) => (
                              <div key={idx} className="text-left">
                                <p
                                  className={`font-sans text-lg leading-relaxed max-w-[600px] mx-auto whitespace-pre-line ${theme.subText}`}
                                >
                                  {text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center">
                        <p
                          className={`font-sans text-lg leading-relaxed whitespace-pre-line ${theme.subText}`}
                        >
                          {displayContent.process.afterGraph}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {displayContent.process.sections.map((section, idx) => {
              if (section.type === 'text') {
                // Check if we're showing the animated component - if so, hide the image
                const showImage =
                  !displayContent.process.renderComponent &&
                  (section.video ||
                    section.iframe ||
                    section.image ||
                    (project.images &&
                      project.images[2] &&
                      project.id !== 3 &&
                      !section.hideImage));

                return (
                  <div
                    key={idx}
                    className={`max-w-6xl mx-auto px-6 ${showImage ? 'grid md:grid-cols-2 gap-12 items-center' : 'text-center'} mb-12`}
                  >
                    {/* Video, Iframe or Image for Process */}
                    {showImage && (
                      <div
                        className={`${section.video ? 'w-full aspect-video' : 'aspect-square'} ${section.video && project.id === 1 ? 'overflow-visible pt-16' : 'overflow-hidden'} ${project.id === 2 || project.id === 3 || project.id === 1 ? '' : 'shadow-sm'} ${project.id === 1 && section.video ? 'bg-cream' : project.id === 3 ? (isWandering ? 'bg-charcoal' : 'bg-cream') : theme.imagePlaceholderBg} ${section.video ? '' : 'cursor-zoom-in'}`}
                        onClick={
                          section.video
                            ? undefined
                            : () => setSelectedImage(section.image || project.images[2])
                        }
                      >
                        {section.video ? (
                          <video
                            className={`w-full h-full object-contain cursor-pointer ${project.id === 1 ? 'scale-[2]' : ''}`}
                            onClick={(e) => {
                              const video = e.currentTarget;
                              if (video.paused) {
                                video.play();
                              } else {
                                video.pause();
                              }
                            }}
                          >
                            <source src={section.video} type="video/webm" />
                            <source src={section.video} type="video/quicktime" />
                            <source src={section.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={section.image || project.images[2]}
                            alt="Process Detail"
                            draggable="false"
                            className={`w-full h-full ${project.id === 3 || project.id === 1 ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-700`}
                          />
                        )}
                      </div>
                    )}
                    <div className={showImage ? '' : 'max-w-4xl mx-auto'}>
                      {!displayContent.process.renderComponent && (
                        <h3 className="font-serif text-3xl mb-4 text-accent">The Process</h3>
                      )}
                      <p
                        className={`font-sans text-lg leading-relaxed max-w-[600px] whitespace-pre-line ${theme.subText} ${project.id === 3 && isWandering ? 'text-center mx-auto' : ''}`}
                      >
                        {section.content}
                      </p>
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
                            className={`aspect-[4/3] w-full overflow-hidden shadow-sm ${isWandering ? 'bg-charcoal' : 'bg-white'} cursor-zoom-in group`}
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
                            <h4 className={`font-serif text-xl mb-4 ${theme.text}`}>
                              {item.title}
                            </h4>
                            <p
                              className={`font-sans text-base leading-relaxed whitespace-pre-line ${theme.subText}`}
                            >
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
                  <div
                    key={idx}
                    className="w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-evenly items-start gap-8 mb-12"
                  >
                    {section.items.map((img, i) => (
                      <div
                        key={i}
                        className={`w-full md:w-64 aspect-auto overflow-hidden shadow-sm ${isWandering ? 'bg-charcoal' : 'bg-white'} cursor-zoom-in group relative`}
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
          <div
            className={`w-full max-w-6xl mx-auto px-6 grid ${(project.images && project.images[2]) || (project.id === 4 && !isWandering && displayContent.keyTakeaway?.processImages) ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}
          >
            {/* Show stacked images for project 4 in Impact Mode */}
            {project.id === 4 && !isWandering && displayContent.keyTakeaway?.processImages ? (
              <div className="w-full">
                <div
                  className={`relative w-full aspect-[3/4] md:aspect-[1/1] lg:aspect-[5/3] group perspective-1000 ${isStackExpanded ? 'stack-expanded' : ''}`}
                  onMouseLeave={() => setIsStackExpanded(false)}
                >
                  {displayContent.keyTakeaway.processImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer pointer-events-auto"
                      style={{
                        zIndex: displayContent.keyTakeaway.processImages.length - idx,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isTouch = window.matchMedia('(hover: none)').matches;
                        if (isTouch) {
                          // Mobile: First tap animates, second tap opens lightbox
                          if (!isStackExpanded) {
                            setIsStackExpanded(true);
                          } else {
                            setSelectedImage({
                              src: img,
                              gallery: displayContent.keyTakeaway.processImages,
                              index: idx,
                            });
                          }
                        } else {
                          // Desktop: Always open lightbox
                          setSelectedImage({
                            src: img,
                            gallery: displayContent.keyTakeaway.processImages,
                            index: idx,
                          });
                        }
                      }}
                    >
                      <style>{`
                                                @media (min-width: 768px) {
                                                    .group:hover .process-stack-img-${idx}, .stack-expanded .process-stack-img-${idx} {
                                                        transform: translateX(${idx * 144}px);
                                                    }
                                                }
                                                @media (max-width: 767px) {
                                                    .stack-expanded .process-stack-img-${idx} {
                                                        transform: translateX(calc(-20% + ${idx * 80}px));
                                                        transition-delay: ${idx * 50}ms;
                                                    }
                                                }
                                            `}</style>
                      <img
                        src={img}
                        alt={`Process ${idx + 1}`}
                        draggable="false"
                        className={`w-full h-full object-contain drop-shadow-xl bg-transparent transition-transform duration-700 ease-out origin-bottom-right process-stack-img-${idx}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : project.images && project.images[2] && project.id !== 4 ? (
              <div
                className={`aspect-square overflow-hidden ${project.id === 2 || project.id === 3 ? '' : 'shadow-sm'} ${project.id === 3 ? 'bg-cream' : theme.imagePlaceholderBg} cursor-zoom-in`}
                onClick={() => setSelectedImage(project.images[2])}
              >
                <img
                  src={project.images[2]}
                  alt="Process Detail"
                  draggable="false"
                  className={`w-full h-full ${project.id === 3 ? 'object-contain' : 'object-cover'} hover:scale-105 transition-transform duration-700`}
                />
              </div>
            ) : null}
            <div>
              <h3 className="font-serif text-3xl mb-4 text-accent text-center md:text-left">
                The Process
              </h3>
              <p
                className={`font-sans text-lg leading-relaxed max-w-[600px] mx-auto md:mx-0 text-left whitespace-pre-line ${theme.subText}`}
              >
                {displayContent.process}
              </p>
            </div>
          </div>
        )}

        {/* Key Takeaway Section (Impact Mode) */}
        {!isWandering && displayContent.keyTakeaway && (
          <div className="w-full max-w-7xl mx-auto px-6 text-center py-12">
            <div className="w-full h-[0.5px] bg-divider mb-8"></div>

            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
              {displayContent.keyTakeaway.title || 'Key Takeaway'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full max-w-3xl mx-auto md:items-start">
              {displayContent.keyTakeaway.outcomes.map((outcome, i) => (
                <div key={i} className="text-left flex flex-col gap-2">
                  <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                  <p className={`font-sans text-base ${theme.subText}`}>{outcome.desc}</p>
                </div>
              ))}
            </div>

            <div className="w-full h-[0.5px] bg-divider my-16"></div>

            {displayContent.keyTakeaway.stackedImages ? (
              <div className="mt-12 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Stacked Images Container */}
                <div
                  className={`relative w-full aspect-[3/4] md:aspect-[4/3] group perspective-1000 order-1 ${isStackExpanded ? 'stack-expanded' : ''}`}
                  onMouseLeave={() => setIsStackExpanded(false)}
                >
                  {displayContent.keyTakeaway.stackedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer pointer-events-auto"
                      style={{
                        zIndex: displayContent.keyTakeaway.stackedImages.length - idx, // Top to bottom stacking (first image on top)
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isTouch = window.matchMedia('(hover: none)').matches;
                        if (isTouch) {
                          // Mobile: First tap animates, second tap opens lightbox
                          if (!isStackExpanded) {
                            setIsStackExpanded(true);
                          } else {
                            setSelectedImage({
                              src: img.src,
                              gallery: displayContent.keyTakeaway.stackedImages.map((i) => i.src),
                              index: idx,
                            });
                          }
                        } else {
                          // Desktop: Always open lightbox
                          setSelectedImage({
                            src: img.src,
                            gallery: displayContent.keyTakeaway.stackedImages.map((i) => i.src),
                            index: idx,
                          });
                        }
                      }}
                    >
                      {/* We use a local style block to handle the hover state for this specific index */}
                      <style>{`
                                                @media (min-width: 768px) {
                                                    .group:hover .stack-img-${idx}, .stack-expanded .stack-img-${idx} {
                                                        transform: rotate(${img.rotate}deg) translateX(${idx * 10}px);
                                                    }
                                                }
                                                @media (max-width: 767px) {
                                                    .stack-expanded .stack-img-${idx} {
                                                        transform: translateX(calc(-20% + ${idx * 60}px));
                                                        transition-delay: ${idx * 50}ms;
                                                    }
                                                }
                                             `}</style>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={`w-full h-full object-contain drop-shadow-xl bg-transparent transition-transform duration-700 ease-out origin-bottom-right stack-img-${idx}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="order-2 flex flex-col gap-8 text-left">
                  {displayContent.keyTakeaway.description && (
                    <div
                      className={`font-sans text-lg leading-relaxed max-w-[600px] text-left mx-auto ${theme.text}`}
                    >
                      {displayContent.keyTakeaway.description}
                    </div>
                  )}
                  {displayContent.keyTakeaway.imageCaption && (
                    <div
                      className={`font-sans text-base italic ${theme.subText} flex flex-col gap-4`}
                    >
                      {displayContent.keyTakeaway.imageCaption
                        .split('\n\n')
                        .map((paragraph, index) => (
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
                    <div
                      className={`font-sans text-lg leading-relaxed max-w-[600px] ${theme.text}`}
                    >
                      {displayContent.keyTakeaway.description}
                    </div>
                  )}
                  {displayContent.keyTakeaway.imageCaption && (
                    <div
                      className={`font-sans text-base italic ${theme.subText} flex flex-col gap-4`}
                    >
                      {displayContent.keyTakeaway.imageCaption
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              displayContent.keyTakeaway.description && (
                <div className={`font-sans text-lg leading-relaxed ${theme.text} mb-8`}>
                  <div className="max-w-[600px] mx-auto text-left">
                    {displayContent.keyTakeaway.description}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Section 4: Refinement (Constrained) */}
        {/* Section 4: Refinement */}
        {displayContent.refinement && isWandering && (
          <div className="w-full">
            {typeof displayContent.refinement === 'object' ? (
              <div className="w-full max-w-7xl mx-auto px-6 text-center py-12">
                <div
                  className={`w-full h-px ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mb-8`}
                ></div>

                <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
                  {displayContent.refinement.outcomesTitle || 'Key Takeaway'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full max-w-3xl mx-auto md:items-start">
                  {displayContent.refinement.outcomes &&
                    displayContent.refinement.outcomes.map((outcome, i) => (
                      <div key={i} className="text-left flex flex-col gap-2">
                        <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                        <p className={`font-sans text-base ${theme.subText}`}>{outcome.desc}</p>
                      </div>
                    ))}
                </div>

                <div
                  className={`w-full h-px ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} my-16`}
                ></div>

                {displayContent.refinement.description && (
                  <div
                    className={`grid ${project.images && project.images[3] ? 'grid-cols-1 md:grid-cols-2 gap-12' : 'grid-cols-1'} items-center`}
                  >
                    <div
                      className={`font-sans text-lg leading-relaxed text-left order-2 md:order-1 ${!(project.images && project.images[3]) ? 'max-w-[600px] mx-auto text-center' : ''}`}
                    >
                      {displayContent.refinement.description.split('\n\n').map((part, index) => (
                        <p
                          key={index}
                          className={`${index === 1 ? 'text-muted-text' : theme.text} ${index > 0 ? 'mt-8' : ''}`}
                        >
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
                        {/* Burnt orange oval highlight for ABN numbers - Only for Brand Scaling project */}
                        {project.id === 3 && (
                          <div className="absolute bottom-2 -left-12 w-56 h-12 pointer-events-none z-10 opacity-90">
                            <svg
                              viewBox="0 0 200 60"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full h-full rotate-[-2deg]"
                            >
                              <path
                                d="M10 30 C 10 10 190 10 190 30 C 190 50 10 50 10 30 M 15 32 C 15 15 185 15 185 30"
                                stroke="var(--color-accent)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                className="scribble-path"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`w-full max-w-6xl mx-auto px-6 grid ${project.images && project.images[3] ? 'md:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}
              >
                <div className="order-2 md:order-1">
                  <p className={`font-sans text-lg leading-relaxed ${theme.subText}`}>
                    {displayContent.refinement.split(': ')[0] && (
                      <span className="block font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
                        {displayContent.refinement.split(': ')[0]}
                      </span>
                    )}
                    {displayContent.refinement.includes(': ')
                      ? displayContent.refinement.split(': ').slice(1).join(': ')
                      : displayContent.refinement}
                  </p>
                </div>
                {project.images && project.images[3] && (
                  <div
                    className={`w-full h-auto overflow-hidden shadow-sm order-1 md:order-2 ${theme.imagePlaceholderBg} cursor-zoom-in`}
                    onClick={() => setSelectedImage(project.images[3])}
                  >
                    <img
                      src={project.images[3]}
                      alt="Refinement Detail"
                      draggable="false"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation (Explore Others) */}
      <div className={`w-full py-12 px-6 mt-12 ${theme.projectSectionBg}`}>
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
            Explore Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.filter((p) => p.id !== project.id).map((proj) => (
              <button
                key={proj.id}
                onClick={() => openProject(proj)}
                className={`text-left p-4 border transition-all duration-300 border-transparent hover:border-accent-peach hover:shadow-md ${isWandering ? 'bg-surface-dark-raised' : 'bg-white'}`}
              >
                <div className="text-xs text-gray-400 mb-2">0{PROJECTS.indexOf(proj) + 1}</div>
                <div className={`font-serif text-lg leading-tight ${theme.text}`}>{proj.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <Lightbox
          src={selectedImage.src || selectedImage}
          gallery={selectedImage.gallery || null}
          currentIndex={selectedImage.index || 0}
          onClose={() => setSelectedImage(null)}
          isWandering={isWandering}
          theme={theme}
          key={selectedImage.src || selectedImage}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
