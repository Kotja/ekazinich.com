import React, { useEffect, useRef, useState } from 'react';

const CandidateJourneyGraph = ({ theme }) => {
    const [isVisible, setIsVisible] = useState(false);
    const graphRef = useRef(null);

    // Candidate data matching the original image
    const candidates = [
        { id: 1, color: 'var(--color-candidate-1)', label: 'Candidate 1', path: 'M 50 20 L 150 25 L 250 95 L 350 70 L 450 95' },
        { id: 2, color: 'var(--color-candidate-2)', label: 'Candidate 2', path: 'M 50 10 L 150 30 L 250 35 L 350 5 L 450 5' },
        { id: 3, color: 'var(--color-candidate-3)', label: 'Candidate 3', path: 'M 50 25 L 150 15 L 250 80 L 350 85 L 450 55' },
        { id: 4, color: 'var(--color-candidate-4)', label: 'Candidate 4', path: 'M 50 18 L 150 8 L 250 75 L 350 40 L 450 35' },
        { id: 5, color: 'var(--color-candidate-5)', label: 'Candidate 5', path: 'M 50 5 L 150 5 L 250 20 L 350 70 L 450 80' },
        { id: 6, color: 'var(--color-candidate-6)', label: 'Candidate 6', path: 'M 50 5 L 150 5 L 250 22 L 350 90 L 450 75' }
    ];

    // Annotations with positions and timing - adjusted to prevent overlap
    const annotations = [
        { text: 'Applied', x: 70, y: 65, rotation: 0, delay: 0.2, vertical: true, showAlways: true },
        { text: 'Waiting for a response', x: 140, y: 48, rotation: 0, delay: 0.8, vertical: true, showAlways: true },
        { text: 'Ghosted', x: 205, y: 72, rotation: 0, delay: 1.2, vertical: true, showAlways: true },
        { text: 'Interview', x: 280, y: 25, rotation: 0, delay: 1.0, vertical: true, showAlways: true },
        { text: 'Opportunity for intervention', x: 250, y: 108, rotation: 0, delay: 1.6, color: 'var(--color-accent)', size: 'base', vertical: false, showAlways: false },
        { text: 'Rejection', x: 430, y: 88, rotation: 0, delay: 2.0, vertical: true, showAlways: true }
    ];

    // Intersection Observer to detect when graph reaches mid-screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% visible (mid-screen)
                rootMargin: '-50px'
            }
        );

        if (graphRef.current) {
            observer.observe(graphRef.current);
        }

        return () => {
            if (graphRef.current) {
                observer.unobserve(graphRef.current);
            }
        };
    }, []);

    const isDark = theme?.bg === 'bg-charcoal';
    const [isHovered, setIsHovered] = useState(false);

    // Semi-transparent helpers for SVG attributes
    const creamAlpha = (pct) => `color-mix(in srgb, var(--color-cream) ${pct}%, transparent)`;
    const charcoalAlpha = (pct) => `color-mix(in srgb, var(--color-charcoal) ${pct}%, transparent)`;

    return (
        <div
            ref={graphRef}
            className="w-full max-w-4xl mx-auto py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
        >
            <svg
                viewBox="0 0 500 120"
                className="w-full h-auto"
                style={{ overflow: 'visible' }}
            >
                {/* Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((y) => (
                    <line
                        key={`grid-${y}`}
                        x1="40"
                        y1={100 - y}
                        x2="460"
                        y2={100 - y}
                        stroke={isDark ? creamAlpha(10) : charcoalAlpha(10)}
                        strokeWidth="0.5"
                    />
                ))}

                {/* Y-axis labels */}
                {[0, 50, 100].map((val) => (
                    <text
                        key={`y-label-${val}`}
                        x="30"
                        y={105 - val}
                        fontSize="11"
                        fill={isDark ? creamAlpha(70) : charcoalAlpha(70)}
                        textAnchor="end"
                        fontFamily="Playfair Display, serif"
                    >
                        {val}
                    </text>
                ))}

                {/* Y-axis title */}
                <text
                    x="15"
                    y="50"
                    fontSize="11"
                    fill={isDark ? creamAlpha(70) : charcoalAlpha(70)}
                    textAnchor="middle"
                    fontFamily="Playfair Display, serif"
                    transform="rotate(-90, 15, 50)"
                >
                    Confidence %
                </text>

                {/* X-axis labels */}
                {[1, 2, 3, 4, 5].map((week) => (
                    <text
                        key={`x-label-${week}`}
                        x={50 + (week - 1) * 100}
                        y="115"
                        fontSize="11"
                        fill={isDark ? creamAlpha(70) : charcoalAlpha(70)}
                        textAnchor="middle"
                        fontFamily="Playfair Display, serif"
                    >
                        {week}
                    </text>
                ))}

                {/* X-axis title */}
                <text
                    x="60"
                    y="125"
                    fontSize="11"
                    fill={isDark ? creamAlpha(70) : charcoalAlpha(70)}
                    textAnchor="start"
                    fontFamily="Playfair Display, serif"
                >
                    Time weeks
                </text>

                {/* Candidate path lines with animation */}
                {candidates.map((candidate, index) => {
                    const pathLength = 500; // Approximate length for animation
                    return (
                        <path
                            key={candidate.id}
                            d={candidate.path}
                            fill="none"
                            stroke={candidate.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                strokeDasharray: pathLength,
                                strokeDashoffset: isVisible ? 0 : pathLength,
                                transition: `stroke-dashoffset ${1.5 + index * 0.2}s ease-out ${index * 0.15}s`
                            }}
                        />
                    );
                })}

                {/* Legend */}
                <g transform="translate(50, -15)">
                    {candidates.map((candidate, index) => (
                        <g key={`legend-${candidate.id}`} transform={`translate(${index * 70}, 0)`}>
                            <circle
                                cx="0"
                                cy="0"
                                r="4"
                                fill={candidate.color}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transition: `opacity 0.5s ease-out ${0.5 + index * 0.1}s`
                                }}
                            />
                            <text
                                x="8"
                                y="3"
                                fontSize="8"
                                fill={isDark ? creamAlpha(80) : charcoalAlpha(80)}
                                fontFamily="Lato, sans-serif"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transition: `opacity 0.5s ease-out ${0.5 + index * 0.1}s`
                                }}
                            >
                                {candidate.label}
                            </text>
                        </g>
                    ))}
                </g>

                {/* Hand-drawn annotations with staggered entrance */}
                {annotations.map((annotation, index) => {
                    // Show only on hover if showAlways is false
                    const shouldShow = annotation.showAlways || (isVisible && isHovered);

                    return (
                        <g
                            key={`annotation-${index}`}
                            transform={`translate(${annotation.x}, ${annotation.y})`}
                            style={{
                                opacity: shouldShow ? 1 : 0,
                                transition: annotation.showAlways
                                    ? `opacity 0.6s ease-out ${annotation.delay}s`
                                    : 'opacity 0.3s ease-in-out'
                            }}
                        >
                            <text
                                x="0"
                                y="0"
                                fontSize={annotation.size === 'base' ? '10' : '10'}
                                fill={annotation.color || (isDark ? 'var(--color-cream)' : 'var(--color-charcoal)')}
                                fontFamily={annotation.vertical ? "'Lato', sans-serif" : "'Playfair Display', serif"}
                                fontStyle={annotation.vertical ? "normal" : "italic"}
                                textAnchor="middle"
                                fontWeight={annotation.color ? '600' : '400'}
                                writingMode={annotation.vertical ? "vertical-rl" : "horizontal-tb"}
                                transform={annotation.vertical ? "rotate(180)" : ""}
                            >
                                {annotation.text}
                            </text>
                        </g>
                    );
                })}

                {/* Hover-based highlight oval around key moments - matches brand style */}
                {isVisible && isHovered && (
                    <>
                        {/* Hand-drawn scribble oval around "Ghosted" area - visible on hover */}
                        <g transform="translate(250, 80)">
                            <path
                                d="M -40 0 C -40 -25 40 -25 40 0 C 40 25 -40 25 -40 0 M -38 2 C -38 -22 38 -22 38 0"
                                fill="none"
                                stroke="var(--color-accent)"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    opacity: 0.8,
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                            />
                        </g>
                    </>
                )}
            </svg>

            <style>{`
                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes pulseCircle {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                }
            `}</style>
        </div>
    );
};

export default CandidateJourneyGraph;
