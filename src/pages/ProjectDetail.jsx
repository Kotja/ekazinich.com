import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import brandChallengeAniOnWhite from '../assets/brand-challenge-ani-onwhite.webp';
import brandChallengeAniOnBlack from '../assets/brand-challenge-ani-onblack.webp';
import CandidateJourneyGraph from '../components/CandidateJourneyGraph';
import ProjectMeta from '../components/ProjectMeta';
import { getTheme } from '../theme';

import b2bNewStep1 from '../assets/b2b_step_1.png';
import b2bNewStep2 from '../assets/b2b_step_2.png';
import b2bNewStep3 from '../assets/b2b_step_3.png';
import b2bNewStep5 from '../assets/b2b_step_5.png';
import b2bPieceAccountMenu from '../assets/B2B_pieces_account_menu.webp';
import b2bPieceCreditPrice from '../assets/B2B_pieces_available_credit_price.webp';
import b2bPieceCreditToggle from '../assets/B2B_pieces_available_credit_toggle.webp';
import b2bPieceBaseInput from '../assets/B2B_pieces_base_input.webp';
import b2bPieceGreetingEdit from '../assets/B2B_pieces_greeting_edit.webp';
import b2bPieceQuickAccess from '../assets/B2B_pieces_quick_access.webp';
import b2bPieceTotalCredit from '../assets/B2B_pieces_total_credit.webp';
import b2bPieceUnpaidInvoices from '../assets/B2B_pieces_unpaid_invoices_menu.webp';


// Keep the last two words of each sentence on one line.
const keepSentenceEnd = (text) => {
  if (typeof text !== 'string') return text;
  const glue = (segment) => {
    const match = segment.match(/^([\s\S]*\S) (\S+)\s*$/);
    if (!match) return segment;
    return `${match[1]}\u00A0${match[2]}`;
  };
  return text
    .split(/(\n+)/)
    .map((part) => {
      if (!part.trim() || part.includes('\n')) return part;
      return part
        .split(/(?<=[.!?…])\s+/)
        .map(glue)
        .join(' ');
    })
    .join('');
};

// Titles that name a friction or a challenge stay red. Solution titles do not.
const isProblemTitle = (text) => {
  if (typeof text !== 'string') return false;
  if (/zero[-\s]?friction|frictionless/i.test(text)) return false;
  return /\b(frictions?|challenges?)\b/i.test(text);
};

// B2B friction simulator screenshots

// B2B friction step screenshots (225×1024 tall screenshots, screen inside iPhone frame 234×511)
// cover scale ≈ 1.04 → phone margins: sides 4.9%, top 2.45% (step_3 has 0% top)

// Screen: 203×447px (body 229×473). Phone body=203px fills screen exactly at native res.
// X = -phoneLeft flushes phone left edge to screen x=0.
// Y = -phoneTop removes top white margin.
const B2B_STEP_IMAGES = [
  // 225×1024, phone L=11 T=12
  { src: b2bNewStep1, num: '01', label: 'Login', objPos: '-11px -12px' },
  // 225×1024, phone L=12 T=11
  { src: b2bNewStep2, num: '02', label: 'Navigate', objPos: '-12px -11px' },
  // 219×1024, phone L=11 T=10
  { src: b2bNewStep3, num: '03', label: 'Scroll', objPos: '-11px -10px' },
  // step 4: scrolled down to reveal Quick Access / payment tools
  { src: b2bNewStep3, num: '04', label: 'Locate', objPos: '-11px -400px' },
];

// B2B UI component pieces

// Each piece: src, pixel position (top/right/bottom/left), rotation, display width.
// Positions are tuned so nothing overlaps the central text safe-zone (~middle 45% of width).
const FRICTION_STEPS = [
  {
    label: 'Login',
    desc: "Open the app, authenticate. The clock is already ticking — there's a queue.",
  },
  {
    label: 'Navigate',
    desc: "Find the Account section. It's not on the home screen. Keep looking.",
  },
  {
    label: 'Scroll',
    desc: 'The Digital Card is buried in a list. Scroll. Keep scrolling. One hand.',
  },
  {
    label: 'Locate',
    desc: 'Found it. Four steps to reach a button that should have been one tap away.',
  },
];

const FrictionSimulator = ({ theme }) => {
  const [step, setStep] = React.useState(0); // 0=idle, 1–4=steps, 5=revealed
  const [shaking, setShaking] = React.useState(false);

  const isRevealed = step === 5;

  const handleNext = () => {
    if (isRevealed) {
      setStep(0);
      return;
    }
    if (step === 4) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setStep(5);
      }, 550);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16">
      <style>{`
        @keyframes b2b-shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-8px) rotate(-1.5deg); }
          35%      { transform: translateX(8px)  rotate(1.5deg);  }
          55%      { transform: translateX(-6px) rotate(-1deg);   }
          75%      { transform: translateX(6px)  rotate(1deg);    }
        }
        .b2b-shake { animation: b2b-shake 0.55s ease-in-out; }
      `}</style>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        {/* ── iPhone 16 frame — body 260×537, screen 234×511 ── */}
        {/* body 229×473 → screen 203×447 = exact phone body width → 100% fill at native res */}
        <div
          className={`relative shrink-0 ${shaking ? 'b2b-shake' : ''}`}
          style={{ width: 229, filter: 'drop-shadow(0 24px 56px rgba(0,0,0,0.55))' }}
        >
          <div
            style={{
              width: 229,
              height: 473,
              background: '#1A1A1A',
              borderRadius: 38,
              position: 'relative',
              boxShadow: '0 0 0 1px #3A3A3C, 0 0 0 2.5px #111',
            }}
          >
            {/* Screen — white bg so image margins blend invisibly */}
            <div
              style={{
                position: 'absolute',
                left: 13,
                top: 13,
                right: 13,
                bottom: 13,
                borderRadius: 28,
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              {/* Step 0: UGGH — dark bg so it reads on the charcoal page */}
              <div
                className="select-none transition-opacity duration-500 flex items-center justify-center"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#1A1A1A',
                  opacity: step === 0 ? 1 : 0,
                }}
              >
                <div
                  className="grid grid-cols-2 leading-none font-serif font-bold text-center text-cream"
                  style={{ fontSize: 130, letterSpacing: '-0.04em', lineHeight: 0.88 }}
                >
                  <span>U</span>
                  <span>G</span>
                  <span>G</span>
                  <span>H</span>
                </div>
              </div>

              {/* Steps 1–4: object-fit:none → native pixels, objPos centres phone */}
              {B2B_STEP_IMAGES.map(({ src, label, objPos }, i) => (
                <img
                  key={i}
                  src={src}
                  alt={label}
                  draggable={false}
                  className="select-none transition-opacity duration-500"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'none',
                    objectPosition: objPos,
                    opacity: step === i + 1 ? 1 : 0,
                  }}
                />
              ))}

              {/* Step 5: 225×1024, phone L=11 T=12 → flush left, remove top margin */}
              <img
                src={b2bNewStep5}
                alt="Target State"
                draggable={false}
                className="select-none transition-opacity duration-500"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'none',
                  objectPosition: '-11px -12px',
                  opacity: step === 5 ? 1 : 0,
                }}
              />
            </div>

            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 19,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 72,
                height: 22,
                background: '#000',
                borderRadius: 999,
                zIndex: 10,
              }}
            />
            {/* Home indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: 7,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 88,
                height: 4,
                background: 'rgba(255,255,255,0.28)',
                borderRadius: 999,
                zIndex: 10,
              }}
            />
            {/* Action btn */}
            <div
              style={{
                position: 'absolute',
                left: -3,
                top: '18%',
                width: 3,
                height: 24,
                background: '#2C2C2E',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Vol up */}
            <div
              style={{
                position: 'absolute',
                left: -3,
                top: '27%',
                width: 3,
                height: 40,
                background: '#2C2C2E',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Vol down */}
            <div
              style={{
                position: 'absolute',
                left: -3,
                top: '37%',
                width: 3,
                height: 40,
                background: '#2C2C2E',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Power */}
            <div
              style={{
                position: 'absolute',
                right: -3,
                top: '29%',
                width: 3,
                height: 58,
                background: '#2C2C2E',
                borderRadius: '0 3px 3px 0',
              }}
            />
          </div>
        </div>

        {/* ── Text / Controls ── */}
        <div className="flex-1 text-left">
          {!isRevealed ? (
            <>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                {step === 0 ? 'In-Depth · Friction Simulation' : `Step ${step} of 4`}
              </p>
              <h3 className={`font-serif text-3xl md:text-4xl mb-5 leading-tight ${theme.text}`}>
                {step === 0
                  ? 'What does 4 steps feel like at the counter?'
                  : step < 4
                    ? FRICTION_STEPS[step - 1].label + '.'
                    : 'One more tap.'}
              </h3>
              <p className={`font-sans text-lg leading-relaxed mb-8 max-w-sm ${theme.subText}`}>
                {step === 0
                  ? 'Every B2B customer lived this. Tap through all four steps to feel the interaction cost.'
                  : FRICTION_STEPS[step - 1].desc}
              </p>

              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i <= step ? 32 : 16,
                      background: i <= step ? 'var(--color-accent)' : 'currentColor',
                      opacity: i <= step ? 1 : 0.2,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="font-sans text-sm font-bold uppercase tracking-widest px-7 py-3.5 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {step === 0 ? 'Start simulation →' : step === 4 ? 'Almost there →' : 'Next step →'}
              </button>
            </>
          ) : (
            <>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Target State · FY26 Roadmap
              </p>
              <h3 className={`font-serif text-3xl md:text-4xl mb-5 leading-tight ${theme.text}`}>
                4 steps became 1.
              </h3>
              <p className={`font-sans text-lg leading-relaxed mb-8 max-w-sm ${theme.subText}`}>
                A Persistent Utility Header. Payment assets pinned to the top — always visible,
                always one tap. The architecture stopped fighting the environment it was being used
                in.
              </p>
              <button
                onClick={() => setStep(0)}
                className="font-sans text-sm font-bold uppercase tracking-widest px-7 py-3.5 border-2 border-cream/40 text-cream/70 hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                ← reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const B2B_PIECES = [
  { src: b2bPieceAccountMenu, pos: { top: '4%', left: '1%' }, rot: -5, w: 138 },
  { src: b2bPieceQuickAccess, pos: { top: '42%', left: '2%' }, rot: 7, w: 92 },
  { src: b2bPieceCreditToggle, pos: { top: '3%', right: '1%' }, rot: 3, w: 218 },
  { src: b2bPieceCreditPrice, pos: { top: '41%', right: '2%' }, rot: -6, w: 110 },
  { src: b2bPieceBaseInput, pos: { bottom: '7%', left: '1%' }, rot: -4, w: 208 },
  { src: b2bPieceGreetingEdit, pos: { bottom: '21%', left: '4%' }, rot: 6, w: 152 },
  { src: b2bPieceTotalCredit, pos: { bottom: '6%', right: '1%' }, rot: 4, w: 182 },
  { src: b2bPieceUnpaidInvoices, pos: { bottom: '19%', right: '3%' }, rot: -7, w: 163 },
];

const CHASER_W = 210;
const CHASER_H = 52;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const B2BScatteredPieces = ({ children }) => {
  const containerRef = React.useRef(null);
  const pieceRefs = React.useRef([]);
  const [chaserXY, setChaserXY] = React.useState(null);
  const [hidden, setHidden] = React.useState(new Set());
  const [isChasing, setIsChasing] = React.useState(false);
  const [label, setLabel] = React.useState('dare to search');

  React.useEffect(() => {
    const place = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setChaserXY({ x: (width - CHASER_W) / 2, y: height - CHASER_H - 28 });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, []);

  const handleClick = async () => {
    if (isChasing) return;
    if (hidden.size === B2B_PIECES.length) {
      setHidden(new Set());
      return;
    }

    setIsChasing(true);
    setLabel('chasing…');

    const cRect = containerRef.current.getBoundingClientRect();
    const queue = B2B_PIECES.map((_, i) => i).filter((i) => !hidden.has(i));

    for (const idx of queue) {
      const el = pieceRefs.current[idx];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      setChaserXY({
        x: r.left - cRect.left,
        y: r.top - cRect.top + r.height / 2 - CHASER_H / 2,
      });
      await sleep(560);
      setHidden((prev) => new Set([...prev, idx]));
      await sleep(120);
    }

    const { width, height } = containerRef.current.getBoundingClientRect();
    setChaserXY({ x: (width - CHASER_W) / 2, y: height - CHASER_H - 28 });
    await sleep(580);
    setLabel('dare to search');
    setIsChasing(false);
  };

  return (
    <>
      {/* ── Mobile / Tablet: images above text ── */}
      <div className="md:hidden flex flex-wrap justify-center gap-3 mb-8 px-4">
        {B2B_PIECES.map(
          ({ src, w }, i) =>
            !hidden.has(i) && (
              <img
                key={i}
                src={src}
                alt=""
                draggable={false}
                className="h-auto object-contain"
                style={{
                  width: Math.min(Math.round(w * 0.55), 140),
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.07))',
                }}
              />
            )
        )}
      </div>
      <div className="md:hidden text-center px-6 pb-10">{children}</div>

      {/* ── Desktop: absolute scattered layout ── */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full overflow-hidden"
        style={{ minHeight: 660 }}
      >
        {B2B_PIECES.map(({ src, pos, rot, w }, i) => (
          <div
            key={i}
            ref={(el) => (pieceRefs.current[i] = el)}
            className="absolute pointer-events-none select-none"
            style={{
              ...pos,
              width: w,
              transform: `rotate(${rot}deg)`,
              zIndex: 5,
              opacity: hidden.has(i) ? 0 : 1,
              transition: 'opacity 0.32s ease-out',
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.08))' }}
            />
          </div>
        ))}

        {/* Centred text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[460px] w-full text-center px-6">{children}</div>
        </div>

        {/* Chasing search bar */}
        {chaserXY && (
          <div
            onClick={handleClick}
            className="absolute z-20 flex items-center gap-3 bg-white rounded-full border-2 border-accent shadow-lg cursor-pointer select-none"
            style={{
              left: chaserXY.x,
              top: chaserXY.y,
              width: CHASER_W,
              height: CHASER_H,
              padding: '0 24px',
              transition: isChasing
                ? 'left 0.5s cubic-bezier(.4,0,.2,1), top 0.5s cubic-bezier(.4,0,.2,1)'
                : 'left 0.55s ease-in-out, top 0.55s ease-in-out',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-accent font-sans text-base font-semibold tracking-wide whitespace-nowrap">
              {label}
            </span>
          </div>
        )}
      </div>
    </>
  );
};


const BoomerangVideo = ({ src, poster }) => {
  const videoRef = React.useRef(null);
  const cycleCount = React.useRef(0);
  const [ready, setReady] = React.useState(false);

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
    <div className="relative w-full h-full">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        onLoadedData={() => setReady(true)}
        className={`relative w-full h-full object-cover transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// Starts on its own and keeps looping. A click pauses it; another click plays it again.
// No native controls — those paint a dark bar over the picture.
const HoverTapVideo = ({ src, poster }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="cursor-pointer" onClick={toggle}>
      <video
        ref={videoRef}
        className="w-full h-auto block bg-transparent"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      />
    </div>
  );
};

// Knock out only the white padding around a device — not the screen UI —
// by flooding near-white pixels inward from the frame edges.
const buildEdgeWhiteMask = (imageData, threshold = 248, dilate = 2) => {
  const { width, height, data } = imageData;
  const total = width * height;
  const keep = new Uint8Array(total);
  keep.fill(1);

  const isWhite = (i) => {
    const o = i * 4;
    return data[o] >= threshold && data[o + 1] >= threshold && data[o + 2] >= threshold;
  };

  const stack = [];
  const visit = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (!keep[i] || !isWhite(i)) return;
    keep[i] = 0;
    stack.push(i);
  };

  for (let x = 0; x < width; x++) {
    visit(x, 0);
    visit(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    visit(0, y);
    visit(width - 1, y);
  }

  while (stack.length) {
    const i = stack.pop();
    const x = i % width;
    const y = (i - x) / width;
    visit(x - 1, y);
    visit(x + 1, y);
    visit(x, y - 1);
    visit(x, y + 1);
  }

  if (dilate > 0) {
    const next = keep.slice();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (keep[y * width + x]) continue;
        for (let dy = -dilate; dy <= dilate; dy++) {
          for (let dx = -dilate; dx <= dilate; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            next[ny * width + nx] = 0;
          }
        }
      }
    }
    return next;
  }

  return keep;
};

// Officeworks process clip already includes the device chrome.
const DeviceVideo = ({ src, knockoutWhite = false }) => {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const maskRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const playingRef = React.useRef(false);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play().catch(() => {}) : v.pause();
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!knockoutWhite) {
      video.play().catch(() => {});
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const draw = () => {
      if (!playingRef.current || !video.videoWidth) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        maskRef.current = null;
      }

      ctx.drawImage(video, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      const cornerIsWhite = pixels[0] >= 248 && pixels[1] >= 248 && pixels[2] >= 248;

      if (!maskRef.current && cornerIsWhite) {
        maskRef.current = buildEdgeWhiteMask(frame);
      }

      const mask = maskRef.current;
      if (mask) {
        for (let i = 0; i < mask.length; i++) {
          if (!mask[i]) pixels[i * 4 + 3] = 0;
        }
        ctx.putImageData(frame, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onPlay = () => {
      playingRef.current = true;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
    };
    const onPause = () => {
      playingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('loadeddata', onPlay);
    video.play().catch(() => {});

    return () => {
      playingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      maskRef.current = null;
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('loadeddata', onPlay);
    };
  }, [src, knockoutWhite]);

  const frameClass =
    'max-h-[min(80vh,720px)] w-auto max-w-full object-contain bg-transparent cursor-pointer';

  if (!knockoutWhite) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        onClick={handleClick}
        className={frameClass}
      />
    );
  }

  return (
    <div className="relative inline-block max-h-[min(80vh,720px)] max-w-full bg-transparent">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="transparent-video__source"
      />
      <canvas ref={canvasRef} onClick={handleClick} className={frameClass} />
    </div>
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
      className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in ${isBrandChallengeSrc(currentSrc) ? (isWandering ? 'bg-charcoal' : 'bg-cream') : isWandering ? 'bg-charcoal/95' : 'bg-cream/95'} ${zoom > 1 ? 'overflow-auto cursor-zoom-out' : 'p-4 cursor-default'}`}
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
        className={`relative transition-all duration-75 flex items-center justify-center lightbox-stage ${zoom > 1 ? 'min-h-full py-10' : ''}`}
        style={{
          '--lightbox-w': zoom > 1 ? `${zoom * 100}%` : window.innerWidth < 768 ? '90vw' : '80vw',
          '--lightbox-h': zoom > 1 ? `${zoom * 100}%` : '80vh',
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
        {isBrandChallengeSrc(currentSrc) ? (
          <div
            className="challenge-lightbox-fit"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((prev) => (prev >= 3 ? 1 : prev + 0.25));
            }}
          >
            <BrandChallengeFrame src={currentSrc} isWandering={isWandering} />
          </div>
        ) : (
          <img
            src={currentSrc}
            alt="Full Screen View"
            draggable="false"
            onClick={(e) => {
              e.stopPropagation();
              // Gradual stepped zoom on click: 1 -> 1.25 -> 1.5 ... -> 3 -> 1
              setZoom((prev) => (prev >= 3 ? 1 : prev + 0.25));
            }}
            className={` p-[30px] transition-all duration-300 w-full h-full object-contain ${zoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'} ${currentSrc.includes('brand-flow-chart') ? (currentSrc.includes('in-depth') ? 'bg-charcoal' : 'bg-cream') : ''}`}
          />
        )}
      </div>
    </div>
  );
};

const BRAND_CHALLENGE_SRC = /brand-challenge-ani-on(black|white)/;

const isBrandChallengeSrc = (src) => typeof src === 'string' && BRAND_CHALLENGE_SRC.test(src);

// Notes baked into the photographer challenge image, in Playfair italic.
// These sit on top and cover that type with Architects Daughter.
const CHALLENGE_NOTES = [
  { text: 'Troubling responsiveness', left: '37.8%', top: '0.7%', width: '27.2%', height: '3.8%' },
  { text: 'Cognitive dissonance', left: '0.4%', top: '46.4%', width: '24%', height: '3.8%' },
  // Stop short of the orange arrow that passes over the end of "Genres".
  { text: 'Conflicting Genres', left: '11.2%', top: '52.55%', width: '21%', height: '3.5%' },
  {
    text: 'Hight interaction cost\nTouch tagrgets are\n<44px',
    left: '70.8%',
    top: '38.2%',
    width: '25.6%',
    height: '12.4%',
  },
  {
    text: 'Unstructured\nTaxonomy',
    left: '44.2%',
    top: '75.9%',
    width: '14.9%',
    height: '7.7%',
    onScreen: true,
  },
  { text: 'Archive model', left: '42.8%', top: '95.2%', width: '16.8%', height: '3.3%' },
];

const BrandChallengeFrame = ({ src, isWandering }) => {
  const onDark = typeof src === 'string' ? src.includes('onblack') : isWandering;
  const noteInk = onDark ? '#ffffff' : '#000000';
  const notePaper = onDark ? '#000000' : '#ffffff';

  return (
    <div className={`challenge-frame relative w-full ${onDark ? 'bg-charcoal' : 'bg-cream'}`}>
      <img
        src={src}
        alt="Annotated mobile site, showing where the old portfolio was hard to use"
        draggable="false"
        className="block w-full h-auto"
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {CHALLENGE_NOTES.map((note) => (
          <span
            key={note.text}
            className="font-architects absolute flex items-center justify-center text-center whitespace-pre-line"
            style={{
              left: note.left,
              top: note.top,
              width: note.width,
              height: note.height,
              color: note.onScreen ? '#000000' : noteInk,
              background: note.onScreen ? '#ffffff' : notePaper,
              fontSize: '1.75cqw',
              lineHeight: 1.05,
              overflow: 'hidden',
            }}
          >
            {note.text}
          </span>
        ))}
      </div>
    </div>
  );
};

// Challenge image. Project 3 shows the original phone, and the notes on hover.
const InteractiveChallengeImage = ({ src, isWandering, onImageClick, projectId }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouchRevealed, setIsTouchRevealed] = React.useState(false);
  const annotatedSrc =
    projectId === 3 ? (isWandering ? brandChallengeAniOnBlack : brandChallengeAniOnWhite) : null;
  const showNotes = Boolean(annotatedSrc && (isHovered || isTouchRevealed));

  const handleClick = (e) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch && annotatedSrc && !isTouchRevealed) {
      e.stopPropagation();
      setIsTouchRevealed(true);
      return;
    }
    onImageClick(showNotes ? annotatedSrc : src);
  };

  return (
    <div
      className={`bg-transparent cursor-zoom-in ${annotatedSrc ? 'challenge-annotated mx-auto h-full w-full' : 'w-full'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showNotes ? (
        <BrandChallengeFrame src={annotatedSrc} isWandering={isWandering} />
      ) : (
        <img
          src={src}
          alt="Challenge Detail"
          draggable="false"
          className="block h-auto w-full object-contain md:h-full"
        />
      )}
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
      className={`min-h-screen animate-fade-in relative flex flex-col ${theme.bg} pb-24 md:pt-20`}
    >
      <ProjectMeta project={project} slug={slug} />

      {/* Expanded Content Layout - WIDER CONTAINER for Hero, Text Constrained */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto py-12 flex flex-col gap-20">
        {/* Header - Constrained */}
        <div className="w-full max-w-6xl mx-auto px-6 text-center max-w-3xl mb-8">
          <h1 className={`font-serif mb-4 ${theme.text}`}>
            {displayContent.headline || project.title}
          </h1>
          {(displayContent.subtitle || project.subtitle) && (
            <p className={`font-serif text-lg md:text-2xl mb-6 ${theme.subText} opacity-70`}>
              {keepSentenceEnd(displayContent.subtitle || project.subtitle)}
            </p>
          )}
          <div className="flex justify-center gap-3 flex-wrap mb-6">
            {(displayContent.tags || project.tags).map((tag) => (
              <span
                key={tag}
                className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-tag ${theme.tagBg}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image/Video - FULL WIDTH (Less Constraint) */}
        {project.video && (
          <div className={`w-full aspect-video overflow-hidden ${theme.imagePlaceholderBg}`}>
            <BoomerangVideo
              src={project.video}
              poster={project.heroPoster === false ? undefined : project.images?.[0]}
            />
          </div>
        )}

        {project.images && project.images[0] && !project.placeholder && (
          <figure
            className={`w-full ${project.video ? 'hidden' : ''} ${project.id === 6 ? 'max-w-6xl mx-auto px-6' : ''}`}
          >
            <div
              className={`w-full overflow-hidden cursor-zoom-in ${project.id === 6 ? '' : `aspect-video md:max-h-[85vh] ${theme.imagePlaceholderBg}`}`}
              onClick={() => setSelectedImage(project.images[0])}
            >
              <img
                src={project.images[0]}
                alt={project.heroAlt || 'Hero'}
                draggable="false"
                className={`w-full ${project.id === 6 ? 'h-auto object-contain' : 'h-full object-cover'}`}
              />
            </div>
            {project.heroCaption && (
              <figcaption
                className={`mt-4 font-sans text-sm italic text-center max-w-2xl mx-auto ${theme.subText}`}
              >
                {keepSentenceEnd(project.heroCaption)}
              </figcaption>
            )}
          </figure>
        )}

        {/* Impact - Constrained */}
        <div className="w-full max-w-5xl mx-auto px-6 text-center py-20">
          <h3 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">
            The Solution Impact
          </h3>

          {typeof displayContent.impact === 'object' ? (
            <div className="flex flex-col items-center">
              <p
                className={`font-serif text-2xl md:text-5xl leading-tight text-balance whitespace-pre-line ${theme.text} mb-16`}
              >
                {keepSentenceEnd(displayContent.impact.description)}
              </p>

              <div
                className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mb-12`}
              ></div>

              <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-12">
                {displayContent.impact.outcomesTitle || 'Key Outcome'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 w-full max-w-4xl mx-auto md:items-start">
                {displayContent.impact.outcomes &&
                  displayContent.impact.outcomes.map((outcome, i) => (
                    <div key={i} className="text-left flex flex-col gap-2">
                      <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                      <p className={`font-sans text-base ${theme.subText}`}>
                        {keepSentenceEnd(outcome.desc)}
                      </p>
                    </div>
                  ))}
              </div>

              <div
                className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mt-16`}
              ></div>
            </div>
          ) : (
            <p
              className={`font-serif text-2xl md:text-5xl leading-tight text-balance whitespace-pre-line ${theme.text}`}
            >
              {keepSentenceEnd(displayContent.impact)}
            </p>
          )}
        </div>

        {/* Section 1: Challenge (Constrained) */}
        {(() => {
          const challengeImage =
            displayContent.challengeImage || (project.images && project.images[1]);
          return (
            <div
              className={`w-full mx-auto px-6 ${project.id === 3 ? 'max-w-[1400px] challenge-split' : 'max-w-6xl'} ${challengeImage ? 'md:flex md:gap-12 md:items-center' : 'grid grid-cols-1'}`}
            >
              <div
                className={`order-2 md:order-1 flex flex-col justify-center md:flex-1 ${project.id === 3 ? 'md:max-w-[37.5rem]' : ''}`}
              >
                <h3 className="font-serif mb-4 text-red-500">
                  {displayContent.challengeTitle || 'The Challenge'}
                </h3>
                <p
                  className={`font-sans text-lg leading-relaxed max-w-[600px] whitespace-pre-line ${theme.subText}`}
                >
                  {keepSentenceEnd(displayContent.challenge)}
                </p>
              </div>
              {challengeImage && (
                <div
                  className={
                    project.id === 3 ? 'challenge-split__figure' : 'md:w-1/2 md:flex-shrink-0'
                  }
                >
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
        <div className={`w-full border-y-[2px] border-accent-peach ${theme.projectSectionBg}`}>
          {isWandering ? (
            <div
              className={`max-w-6xl mx-auto px-6 py-12 ${displayContent.roleImage ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'text-center'}`}
            >
              {displayContent.roleImage && (
                <div
                  className={`aspect-video overflow-hidden cursor-zoom-in ${theme.imagePlaceholderBg} order-2 md:order-1`}
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
                <h3 className={`font-serif mb-4 ${theme.iconBlue}`}>My Role</h3>
                <p
                  className={`font-sans text-lg leading-relaxed max-w-[600px] mx-auto whitespace-pre-line ${theme.subText}`}
                >
                  {keepSentenceEnd(displayContent.role)}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
              <h3 className={`font-serif mb-4 ${theme.iconBlue}`}>My Role</h3>
              <p
                className={`font-sans text-lg max-w-[600px] mx-auto leading-relaxed whitespace-pre-line ${theme.subText}`}
              >
                {keepSentenceEnd(displayContent.role)}
              </p>

              {displayContent.roleImage && (
                <div
                  className={`mt-12 max-w-lg mx-auto aspect-video overflow-hidden cursor-zoom-in ${theme.imagePlaceholderBg}`}
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
                <h3 className="font-serif mb-12 text-yellow-500 text-center">The Process</h3>
                {/* Text before graph */}
                {displayContent.process.beforeGraph && (
                  <div className="max-w-[600px] mx-auto mb-12 text-left">
                    <p
                      className={`font-sans text-lg leading-relaxed whitespace-pre-line ${theme.subText}`}
                    >
                      {keepSentenceEnd(displayContent.process.beforeGraph)}
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
                          {keepSentenceEnd(displayContent.process.afterGraph)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {displayContent.process.sections.map((section, idx) => {
              if (section.type === 'text' && section.outcomes) {
                return (
                  <div key={idx} className="w-full max-w-5xl mx-auto px-6 text-center py-20">
                    <p
                      className={`font-serif text-2xl md:text-5xl leading-tight text-balance whitespace-pre-line ${theme.text} mb-16`}
                    >
                      {keepSentenceEnd(section.content)}
                    </p>
                    <div
                      className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mb-12`}
                    ></div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-red-500 mb-12">
                      {section.heading}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 w-full max-w-4xl mx-auto md:items-start">
                      {section.outcomes.map((outcome, i) => (
                        <div key={i} className="text-left flex flex-col gap-2">
                          <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                          <p className={`font-sans text-base ${theme.subText}`}>
                            {keepSentenceEnd(outcome.desc)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mt-16`}
                    ></div>
                  </div>
                );
              }
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
                    className={`max-w-6xl mx-auto px-6 ${showImage ? 'grid md:grid-cols-2 gap-16 md:gap-20 items-start mb-28' : 'text-center mb-20'}`}
                  >
                    {/* Video, Iframe or Image for Process */}
                    {showImage &&
                      // Officeworks (id=1) with a video: the file is already a full device
                      (section.video && project.id === 1 ? (
                        <div className="flex items-center justify-center w-full py-8 bg-transparent">
                          <DeviceVideo src={section.video} knockoutWhite />
                        </div>
                      ) : (
                        <div>
                          <div
                            className={`${section.video ? 'w-full aspect-video' : section.fit === 'contain' ? 'w-full' : 'aspect-square'} overflow-hidden ${project.id === 2 || project.id === 3 ? '' : ''} ${project.id === 3 ? (isWandering ? 'bg-charcoal' : 'bg-cream') : theme.imagePlaceholderBg} ${section.video ? '' : 'cursor-zoom-in'}`}
                            onClick={
                              section.video
                                ? undefined
                                : () => setSelectedImage(section.image || project.images[2])
                            }
                          >
                            {section.video ? (
                              <video
                                className="w-full h-full object-contain cursor-pointer"
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
                                alt={section.alt || section.label || 'Process Detail'}
                                draggable="false"
                                className={`w-full ${section.fit === 'contain' || project.id === 3 ? 'h-auto object-contain' : 'h-full object-cover'} hover:scale-105 transition-transform duration-700`}
                              />
                            )}
                          </div>
                          {section.caption && (
                            <p
                              className={`mt-3 font-sans text-sm italic leading-relaxed ${theme.subText}`}
                            >
                              {keepSentenceEnd(section.caption)}
                            </p>
                          )}
                        </div>
                      ))}
                    <div className={showImage ? '' : 'max-w-4xl mx-auto'}>
                      {!displayContent.process.renderComponent &&
                        (section.heading || (idx === 0 && !section.hideHeading)) && (
                          <h3
                            className={`font-serif mb-4 ${isProblemTitle(section.heading) ? 'text-red-500' : 'text-yellow-500'}`}
                          >
                            {section.heading || 'The Process'}
                          </h3>
                        )}
                      {section.label && (
                        <h4
                          className={`font-serif text-2xl mb-3 ${isProblemTitle(section.label) ? 'text-red-500' : theme.text}`}
                        >
                          {section.label}
                        </h4>
                      )}
                      <div
                        className={`font-sans text-lg leading-relaxed max-w-[600px] flex flex-col gap-6 ${theme.subText} ${showImage ? '' : 'mx-auto'}`}
                      >
                        {String(section.content || '')
                          .split(/\n\n+/)
                          .map((part, i) => (
                            <p key={i} className="whitespace-pre-line">
                              {keepSentenceEnd(part)}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              }
              if (section.type === 'comparison') {
                return (
                  <div
                    key={idx}
                    className="w-full py-12 comparison-section"
                    style={{ '--section-bg': section.bg }}
                  >
                    <div className="max-w-6xl mx-auto px-6">
                      {section.heading && (
                        <h3 className="font-serif mb-12 text-yellow-500 text-center">
                          {section.heading}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex flex-col gap-6">
                            <div
                              className={`${item.natural ? 'w-full' : 'aspect-[4/3] w-full overflow-hidden'} ${isWandering ? 'bg-charcoal' : 'bg-white'} cursor-zoom-in group`}
                              onClick={() => item.img && setSelectedImage(item.img)}
                            >
                              {item.img && (
                                <img
                                  src={item.img}
                                  alt={item.alt || item.title}
                                  className={`w-full object-contain transition-transform duration-700 group-hover:scale-105 ${item.natural ? 'h-auto' : 'h-full'}`}
                                />
                              )}
                            </div>
                            {item.aboveText && (
                              <div
                                className={`w-full cursor-zoom-in ${isWandering ? 'bg-charcoal' : 'bg-white'}`}
                                onClick={() => setSelectedImage(item.aboveText)}
                              >
                                <img
                                  src={item.aboveText}
                                  alt={item.aboveTextAlt || item.title}
                                  draggable="false"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <h4
                                className={`font-serif mb-4 ${isProblemTitle(item.title) ? 'text-red-500' : theme.text}`}
                              >
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
                  </div>
                );
              }
              if (section.type === 'media') {
                return (
                  <figure
                    key={idx}
                    className={`w-full mx-auto px-6 mb-16 ${section.video ? 'md:max-w-[1600px]' : 'max-w-5xl'}`}
                  >
                    <div
                      className={`overflow-hidden ${section.video ? '' : theme.imagePlaceholderBg}`}
                    >
                      {section.video ? (
                        <HoverTapVideo src={section.video} poster={section.poster} />
                      ) : (
                        <img
                          src={section.image}
                          alt={section.alt || section.caption || 'Project media'}
                          className="w-full h-auto object-contain cursor-zoom-in"
                          onClick={() => setSelectedImage(section.image)}
                        />
                      )}
                    </div>
                    {section.caption && (
                      <figcaption
                        className={`mt-4 font-sans text-sm italic text-center max-w-2xl mx-auto ${theme.subText}`}
                      >
                        {keepSentenceEnd(section.caption)}
                      </figcaption>
                    )}
                  </figure>
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
                        className={`w-full md:w-64 aspect-auto overflow-hidden ${isWandering ? 'bg-charcoal' : 'bg-white'} cursor-zoom-in group relative`}
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
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer pointer-events-auto image-stack__layer"
                      style={{
                        '--stack-z': displayContent.keyTakeaway.processImages.length - idx,
                        '--stack-i': idx,
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
                      <img
                        src={img}
                        alt={`Process ${idx + 1}`}
                        draggable="false"
                        className="w-full h-full object-contain drop- bg-transparent transition-transform duration-700 ease-out origin-bottom-right image-stack__img image-stack__img--process"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : project.images && project.images[2] && project.id !== 4 ? (
              <div
                className={`aspect-square overflow-hidden ${project.id === 2 || project.id === 3 ? '' : ''} ${project.id === 3 ? 'bg-cream' : theme.imagePlaceholderBg} cursor-zoom-in`}
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
              <h3 className="font-serif mb-4 text-yellow-500 text-center md:text-left">
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
            <div className="w-full h-[2px] bg-divider mb-8"></div>

            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
              {displayContent.keyTakeaway.title || 'Key Takeaway'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full max-w-3xl mx-auto md:items-start">
              {displayContent.keyTakeaway.outcomes.map((outcome, i) => (
                <div key={i} className="text-left flex flex-col gap-2">
                  <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                  <p className={`font-sans text-base ${theme.subText}`}>
                    {keepSentenceEnd(outcome.desc)}
                  </p>
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
                      className="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer pointer-events-auto image-stack__layer"
                      style={{
                        '--stack-z': displayContent.keyTakeaway.stackedImages.length - idx,
                        '--stack-i': idx,
                        '--stack-rotate': `${img.rotate}deg`,
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
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-contain drop- bg-transparent transition-transform duration-700 ease-out origin-bottom-right image-stack__img image-stack__img--fan"
                      />
                    </div>
                  ))}
                </div>

                <div className="order-2 flex flex-col gap-8 text-left">
                  {displayContent.keyTakeaway.description && (
                    <div
                      className={`font-sans text-lg leading-relaxed max-w-[600px] text-left mx-auto ${theme.text}`}
                    >
                      {keepSentenceEnd(displayContent.keyTakeaway.description)}
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
                      {keepSentenceEnd(displayContent.keyTakeaway.description)}
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
                  <div className="max-w-[600px] mx-auto">
                    {keepSentenceEnd(displayContent.keyTakeaway.description)}
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
              <>
              <div className="w-full max-w-7xl mx-auto px-6 text-center py-12">
                <div
                  className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} mb-8`}
                ></div>

                <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8">
                  {displayContent.refinement.outcomesTitle || 'Key Takeaway'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full max-w-3xl mx-auto md:items-start">
                  {displayContent.refinement.outcomes &&
                    displayContent.refinement.outcomes.map((outcome, i) => (
                      <div key={i} className="text-left flex flex-col gap-2">
                        <h5 className={`font-serif text-xl ${theme.text}`}>{outcome.title}</h5>
                        <p className={`font-sans text-base ${theme.subText}`}>
                          {keepSentenceEnd(outcome.desc)}
                        </p>
                      </div>
                    ))}
                </div>

                <div
                  className={`w-full h-[2px] ${isWandering ? 'bg-cream/20' : 'bg-charcoal/20'} my-16`}
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
              {project.id === 1 && (
                <div className={`w-full border-y border-accent-peach ${theme.projectSectionBg}`}>
                  <FrictionSimulator theme={theme} />
                </div>
              )}
              </>
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
                    className={`w-full h-auto overflow-hidden order-1 md:order-2 ${theme.imagePlaceholderBg} cursor-zoom-in`}
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
                className={`text-left p-4 border transition-all duration-300 border-transparent hover:border-accent-peach hover: ${isWandering ? 'bg-surface-dark-raised' : 'bg-white'}`}
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
