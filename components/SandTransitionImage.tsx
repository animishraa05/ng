'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { usePresence, useReducedMotion } from 'motion/react';

interface SandTransitionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SandTransitionImage({
  src,
  alt,
  className = '',
}: SandTransitionImageProps) {
  const rawId = useId();
  const filterId = `sand-dissolve-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const [isPresent, safeToRemove] = usePresence();
  const prefersReducedMotion = useReducedMotion();

  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const offsetRef = useRef<SVGFEOffsetElement | null>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement | null>(null);
  const colorMatrixRef = useRef<SVGFEColorMatrixElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);

  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (!isPresent && safeToRemove) {
        safeToRemove();
      }
      return;
    }

    let rafId = 0;
    const duration = 900;
    const startTime = performance.now();

    const applyFilterValues = (
      scaleVal: number,
      dxVal: number,
      dyVal: number,
      blurVal: number,
      alphaVal: number
    ) => {
      if (displacementRef.current) {
        displacementRef.current.setAttribute('scale', scaleVal.toFixed(2));
      }
      if (offsetRef.current) {
        offsetRef.current.setAttribute('dx', dxVal.toFixed(2));
        offsetRef.current.setAttribute('dy', dyVal.toFixed(2));
      }
      if (blurRef.current) {
        blurRef.current.setAttribute('stdDeviation', blurVal.toFixed(2));
      }
      if (colorMatrixRef.current) {
        const clampedAlpha = Math.max(0, Math.min(1, alphaVal));
        colorMatrixRef.current.setAttribute(
          'values',
          `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${clampedAlpha.toFixed(3)} 0`
        );
      }
      if (imgWrapperRef.current) {
        imgWrapperRef.current.style.opacity = Math.max(0, Math.min(1, alphaVal)).toFixed(3);
        imgWrapperRef.current.style.transform = `translate3d(${(dxVal * 0.18).toFixed(
          1
        )}px, ${(dyVal * 0.22).toFixed(1)}px, 0) scale(${(
          1 +
          (scaleVal / 150) * 0.035
        ).toFixed(3)})`;
      }
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, Math.max(0, elapsed / duration));

      if (isPresent) {
        // Entering easing: quartic ease-out, 1 - Math.pow(1 - t, 4)
        const eased = 1 - Math.pow(1 - t, 4);
        const remaining = 1 - eased;
        const scale = remaining * 150;
        const dy = -80 * remaining;
        const dx = 24 * remaining;
        const blur = 6 * remaining;
        const alpha = eased;
        applyFilterValues(scale, dx, dy, blur, alpha);

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          applyFilterValues(0, 0, 0, 0, 1);
        }
      } else {
        // Exiting easing: cubic, Math.pow(t, 3)
        const eased = Math.pow(t, 3);
        const scale = eased * 150;
        const dy = 120 * eased;
        const dx = -28 * eased;
        const blur = 6 * eased;
        const alpha = 1 - eased;
        applyFilterValues(scale, dx, dy, blur, alpha);

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else if (safeToRemove) {
          safeToRemove();
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPresent, safeToRemove, prefersReducedMotion]);

  return (
    <div
      ref={imgWrapperRef}
      className={`relative flex items-center justify-center will-change-transform ${className}`}
      style={{
        filter: prefersReducedMotion ? undefined : `url(#${filterId})`,
      }}
    >
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id={filterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.8"
              numOctaves={4}
              seed={14}
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feOffset ref={offsetRef} in="displaced" dx="0" dy="0" result="offset" />
            <feGaussianBlur ref={blurRef} in="offset" stdDeviation="0" result="blurred" />
            <feColorMatrix
              ref={colorMatrixRef}
              in="blurred"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {imgError ? (
        <div className="w-full h-full bg-[#1e211a] border border-white/15 flex flex-col items-center justify-center p-8 text-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#a0a295]">
            NG YOGA STUDIO · INDORE
          </span>
          <span className="text-lg font-serif-display italic text-[#f8f7f3] mt-2">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain bg-[#1a1c16] rounded-xs"
        />
      )}
    </div>
  );
}
