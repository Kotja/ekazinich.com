import React, { useRef, useEffect, useCallback } from 'react';

/**
 * TransparentVideo
 * Plays a video with a white background and strips white pixels in real-time
 * using canvas 2D pixel manipulation, giving a transparent background effect.
 *
 * @param {string} src - video source URL
 * @param {number} threshold - 0-255 brightness threshold above which a pixel is treated as background (default 230)
 * @param {string} className - className forwarded to the canvas element
 * @param {object} style - inline styles forwarded to the canvas element
 */
const TransparentVideo = ({ src, threshold = 228, className = '', style = {} }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const isPlayingRef = useRef(false);

  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isPlayingRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Only resize canvas if dimensions changed (avoid constant allocations)
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth || 1080;
      canvas.height = video.videoHeight || 1920;
    }

    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imageData.data;

    // Strip near-white pixels — adjust threshold to taste
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      if (r >= threshold && g >= threshold && b >= threshold) {
        // Soft edge: scale alpha proportionally rather than hard cut
        const brightness = (r + g + b) / 3;
        const excess = brightness - threshold;
        const range = 255 - threshold;
        const alpha = range > 0 ? Math.max(0, 1 - excess / range) : 0;
        d[i + 3] = Math.round(alpha * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [threshold]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      isPlayingRef.current = true;
      drawFrame();
    };
    const onPause = () => {
      isPlayingRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onPause);

    // Auto-play
    video.play().catch(() => {});

    return () => {
      isPlayingRef.current = false;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onPause);
    };
  }, [src, drawFrame]);

  return (
    <div className="relative w-full h-full" style={style}>
      {/* Hidden video source */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        style={{ display: 'none' }}
      />
      {/* Rendered transparent output */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain ${className}`}
        onClick={() => {
          const v = videoRef.current;
          if (v) v.paused ? v.play() : v.pause();
        }}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default TransparentVideo;
