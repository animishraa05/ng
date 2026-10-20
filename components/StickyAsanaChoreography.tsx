'use client';

// ============================================================================
// ASANA PROGRESSION SECTION
// Note: To use a studio video file that scrubs as the visitor scrolls, set
// `ASANA_FLOW_VIDEO_URL = "/videos/your-asana-flow.mp4"` in `/lib/studio-data.ts`.
// ============================================================================

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ASANA_SCROLL_STAGES, ASANA_FLOW_VIDEO_URL } from '@/lib/studio-data';

interface StickyAsanaChoreographyProps {
  onOpenBookingModal: (defaultStream?: string) => void;
  onProgressSync?: (stageIndex: number, progress: number) => void;
}

export default function StickyAsanaChoreography({
  onOpenBookingModal,
  onProgressSync,
}: StickyAsanaChoreographyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);

  const computedIndex = Math.min(
    ASANA_SCROLL_STAGES.length - 1,
    Math.max(0, Math.floor(scrollProgress * ASANA_SCROLL_STAGES.length))
  );

  const currentIndex = selectedStageIndex !== null ? selectedStageIndex : computedIndex;
  const activeStage = ASANA_SCROLL_STAGES[currentIndex] || ASANA_SCROLL_STAGES[0];

  useEffect(() => {
    if (onProgressSync) {
      onProgressSync(currentIndex, scrollProgress);
    }
  }, [currentIndex, scrollProgress, onProgressSync]);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;
      if (scrollableDistance <= 0) return;

      const raw = -rect.top / scrollableDistance;
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);

      if (raw > 0.04 && raw < 0.96) {
        setSelectedStageIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync optional code-linked video file (`ASANA_FLOW_VIDEO_URL`) with scroll
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !ASANA_FLOW_VIDEO_URL) return;
    if (vid.readyState >= 1 && Number.isFinite(vid.duration) && vid.duration > 0) {
      const targetTime = Math.max(
        0,
        Math.min(vid.duration - 0.02, scrollProgress * vid.duration)
      );
      if (Math.abs(vid.currentTime - targetTime) > 0.03) {
        vid.currentTime = targetTime;
      }
    }
  }, [scrollProgress]);

  return (
    <section
      id="asana-flow"
      ref={containerRef}
      className="relative min-h-[205vh] bg-[#eae8df] text-[#191a16] border-b-2 border-[#191a16] scroll-mt-16 z-20"
      aria-label="Mindful Asana Progression"
    >
      <div className="sticky top-16 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-10 lg:py-16">
        <div className="max-w-[1240px] mx-auto w-full px-6 md:px-16">
          {/* Editorial + Neobrutalist Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-5 border-b-2 border-[#191a16]">
            <div>
              <div className="inline-block px-3 py-1 bg-[#f8f7f3] border-2 border-[#191a16] text-[10px] font-mono tracking-[0.22em] uppercase text-[#191a16] mb-3 neo-box-sm">
                03 / MINDFUL SEQUENCE
              </div>
              <h2 className="text-[1.9rem] sm:text-[2.6rem] md:text-[3.2rem] font-normal tracking-tight leading-[1.08] text-[#191a16]">
                Every posture is a conversation with the breath.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenBookingModal('Strength & Flexibility')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] text-xs font-mono tracking-[0.16em] uppercase neo-btn cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Practice This Sequence In Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e8dfc8]" />
            </button>
          </div>

          {/* 2-Column Editorial Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left 7 Columns: Full-Frame Sunlit Studio Posture Visual */}
            <div className="lg:col-span-7 bg-[#f8f7f3] neo-box p-4 sm:p-6 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-[#191a16] bg-[#ebe9e0] flex items-center justify-center">
                {ASANA_FLOW_VIDEO_URL ? (
                  <video
                    ref={videoRef}
                    src={ASANA_FLOW_VIDEO_URL}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeStage.id}
                      src={activeStage.imageUrl}
                      alt={activeStage.imageAlt}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>
                )}

                {/* Minimal Pillar Tag */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#f8f7f3] border-2 border-[#191a16] text-[10px] font-mono tracking-[0.2em] uppercase text-[#191a16] font-medium">
                  {activeStage.step} · {activeStage.pillar}
                </div>
              </div>

              {/* Active Posture Caption */}
              <div className="pt-4 mt-4 border-t-2 border-[#191a16] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#777b5a] font-medium">
                    {activeStage.sanskritName}
                  </div>
                  <div className="text-lg font-medium text-[#191a16]">
                    {activeStage.englishName}
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-[#eae8df] border border-[#191a16]/30 text-xs font-mono text-[#191a16]">
                  {activeStage.breathCue}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: 4 Selectable Posture Milestones */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {ASANA_SCROLL_STAGES.map((stage, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#191a16] text-[#f8f7f3] neo-box -translate-x-0.5 -translate-y-0.5'
                        : 'bg-[#f8f7f3] text-[#191a16] border-2 border-[#191a16]/30 hover:border-[#191a16]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span
                        className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                          isCurrent ? 'text-[#e8dfc8]' : 'text-[#777b5a]'
                        }`}
                      >
                        {stage.step} · {stage.sanskritName}
                      </span>
                      <span
                        className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                          isCurrent ? 'text-[#dfe5dc]' : 'text-[#6e7065]'
                        }`}
                      >
                        {stage.pillar}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-1">
                      {stage.englishName}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isCurrent ? 'text-[#d5d4cc]' : 'text-[#4f5048]'
                      }`}
                    >
                      {stage.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
