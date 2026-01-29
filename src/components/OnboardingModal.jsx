import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const OnboardingModal = ({ onVisibilityChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // const hasSeenOnboarding = sessionStorage.getItem('hasSeenOnboarding');
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

        if (!hasSeenOnboarding) {
            // Delay showing the modal for 0.4 seconds
            const timer = setTimeout(() => {
                setShouldRender(true);
                // Trigger visibility in Parent (for z-index elevation)
                if (onVisibilityChange) onVisibilityChange(true);

                // Small buffer for animation
                setTimeout(() => setIsVisible(true), 10);
            }, 400);

            return () => clearTimeout(timer);
        }
    }, [onVisibilityChange]);

    const handleClose = () => {
        setIsVisible(false);
        // Reset visibility in Parent
        if (onVisibilityChange) onVisibilityChange(false);

        localStorage.setItem('hasSeenOnboarding', 'true');
        setTimeout(() => setShouldRender(false), 500); // Wait for fade out
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#FDFBF7] max-w-md w-full p-8 md:p-10 shadow-2xl border border-[#C25E00]/20 transform transition-transform duration-500 scale-100 flex flex-col items-center text-center">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-[#1A1A1A]/40 hover:text-[#C25E00] transition-colors"
                >
                    <X size={20} />
                </button>

                <h3 className="font-playfair text-2xl italic text-[#1A1A1A] mb-4">
                    Designed in Layers
                </h3>

                <p className="font-lato text-[#1A1A1A]/80 leading-relaxed mb-6">
                    Start with the results in <span className="font-bold">Impact Mode</span>. When you are ready for the full story, switch to <span className="font-bold text-[#C25E00]">In-Depth Mode</span> to uncover the strategy and design rationale.
                </p>

                {/* No Arrow */}

                <div className="md:hidden mt-4 text-[#C25E00] text-sm animate-pulse">
                    (Tap the toggle below in the menu)
                </div>

                <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2 bg-[#1A1A1A] text-[#FDFBF7] font-lato text-xs tracking-[0.2em] uppercase hover:bg-[#C25E00] transition-colors rounded-full"
                >
                    Start Exploring
                </button>
            </div>
        </div>
    );
};

export default OnboardingModal;
