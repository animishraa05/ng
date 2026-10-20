'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, ArrowUpRight, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { BATCH_SCHEDULE, BatchSlot, getWhatsAppUrl } from '@/lib/studio-data';

interface BatchScheduleSectionProps {
  onSelectBatchForTrial: (batch: BatchSlot) => void;
}

type FilterOption = 'All' | 'Morning' | 'Evening' | 'Sunday';

const OUTCOME_ANCHORS: Record<string, { bestFor: string; tagBg: string }> = {
  'm-1': {
    bestFor: 'Best for: Morning metabolism, stamina & respiratory clarity',
    tagBg: '#e8dfc8',
  },
  'm-2': {
    bestFor: 'Best for: Deep backbends, shoulder opening & joint strength',
    tagBg: '#dfe5dc',
  },
  'm-3': {
    bestFor: 'Best for: Desk-neck stiffness, lumbar care & wall-rope traction',
    tagBg: '#dfe5dc',
  },
  'm-4': {
    bestFor: 'Best for: Sustainable weight loss, core toning & flexibility',
    tagBg: '#e8dfc8',
  },
  'e-1': {
    bestFor: 'Best for: Post-work spinal decompression & lower-back relief',
    tagBg: '#dfe5dc',
  },
  'e-2': {
    bestFor: 'Best for: Evening calorie burn, core strength & sweat flow',
    tagBg: '#e8dfc8',
  },
  'e-3': {
    bestFor: 'Best for: Wheel pose (Chakrasana), hip mobility & splits',
    tagBg: '#eae8df',
  },
  'e-4': {
    bestFor: 'Best for: Stress release, Nadi Shodhana breathwork & deep sleep',
    tagBg: '#dfe5dc',
  },
  's-1': {
    bestFor: 'Best for: Assisted partner alignment, Acro balance & recovery',
    tagBg: '#e8dfc8',
  },
};

export default function BatchScheduleSection({
  onSelectBatchForTrial,
}: BatchScheduleSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');

  const filteredBatches = BATCH_SCHEDULE.filter((batch) => {
    if (activeFilter === 'All') return true;
    return batch.period === activeFilter;
  });

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'All', label: 'All Cohorts (9)' },
    { id: 'Morning', label: 'Morning · 6:30 – 10:00 AM' },
    { id: 'Evening', label: 'Evening · 5:00 – 9:00 PM' },
    { id: 'Sunday', label: 'Sunday · 7:00 – 9:00 AM' },
  ];

  return (
    <section
      id="schedule"
      className="relative py-20 lg:py-28 border-b-2 border-[#191a16] bg-[#f8f7f3] text-[#191a16] scroll-mt-16 z-20"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-16">
        {/* Section Header + Neobrutalist Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-[#191a16]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eae8df] border-2 border-[#191a16] font-mono text-[10px] tracking-[0.22em] uppercase text-[#191a16] mb-3 neo-box-sm">
              <span>DAILY STUDIO TIMETABLE · PREM PLAZA, ASHOK NAGAR</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] font-medium tracking-tight leading-[1.06] text-[#191a16]">
              Pick Your Daily Rhythm.
            </h2>
          </div>

          {/* Tactile Neobrutalist Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2.5 text-[11px] font-mono tracking-[0.16em] uppercase cursor-pointer whitespace-nowrap neo-btn ${
                    isSelected
                      ? 'bg-[#191a16] text-[#f8f7f3]'
                      : 'bg-[#eae8df] text-[#191a16] hover:bg-[#e8dfc8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Psychological Flexibility Assurance Strip */}
        <div className="mb-10 p-4 sm:px-6 bg-[#dfe5dc] neo-box flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#191a16]">
            <CheckCircle2 className="w-4 h-4 text-[#191a16] shrink-0" />
            <span>
              <strong>Shift-Friendly Membership:</strong> Running late for a morning batch? Attend
              any evening batch the same day so you never break your streak.
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 bg-[#f8f7f3] border border-[#191a16] shrink-0 self-start sm:self-auto">
            SMALL COHORT · PERSONAL ALIGNMENT
          </span>
        </div>

        {/* Scannable Neobrutalist Schedule Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredBatches.map((batch, idx) => {
              const whatsappHref = getWhatsAppUrl(
                `Namaste NG Yoga Studio Indore! I would like to book a Free Trial for the ${batch.timeRange} (${batch.batchName}) batch at Prem Plaza, Ashok Nagar.`
              );
              const anchor = OUTCOME_ANCHORS[batch.id] || {
                bestFor: 'Best for: Guided alignment, breathwork & daily consistency',
                tagBg: '#eae8df',
              };

              return (
                <motion.div
                  layout
                  key={batch.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#f8f7f3] neo-box neo-box-hover flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Top Neobrutalist Header Bar */}
                    <div
                      className="px-5 py-3 border-b-2 border-[#191a16] flex items-center justify-between gap-2"
                      style={{ backgroundColor: anchor.tagBg }}
                    >
                      <span className="font-mono text-xs tracking-[0.14em] uppercase font-semibold text-[#191a16] tabular-nums">
                        {batch.timeRange}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#f8f7f3] border border-[#191a16] font-mono text-[10px] tracking-[0.16em] uppercase text-[#191a16]">
                        {batch.period === 'Morning' ? (
                          <Sun className="w-3 h-3 text-[#777b5a]" />
                        ) : (
                          <Moon className="w-3 h-3 text-[#777b5a]" />
                        )}
                        {batch.days}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      {/* Stream Kicker */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#777b5a] font-medium">
                          0{idx + 1} · {batch.streamCategory}
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#191a16] underline decoration-[#777b5a]">
                          {batch.spotsStatus}
                        </span>
                      </div>

                      {/* Batch Title */}
                      <h3 className="text-xl font-medium tracking-tight text-[#191a16] leading-snug mb-3">
                        {batch.batchName}
                      </h3>

                      {/* Psychological Outcome Anchor */}
                      <p className="text-xs text-[#4f5048] leading-relaxed mb-4 pb-4 border-b border-[#191a16]/15">
                        {anchor.bestFor}
                      </p>

                      {/* Instructor Placeholder */}
                      <div className="flex items-center gap-2.5 py-2 px-3 bg-[#eae8df] border border-[#191a16]/30">
                        <UserCheck className="w-3.5 h-3.5 text-[#777b5a] shrink-0" />
                        <span className="text-xs font-mono text-[#191a16] truncate">
                          {batch.instructorPlaceholder}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tactile Neobrutalist Actions */}
                  <div className="px-5 pb-5 pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectBatchForTrial(batch)}
                      className="flex-1 py-2.5 px-3 text-[11px] font-mono tracking-[0.16em] uppercase bg-[#eae8df] hover:bg-[#e8dfc8] text-[#191a16] neo-btn cursor-pointer whitespace-nowrap"
                    >
                      Claim Free Trial
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 py-2.5 px-3.5 text-[11px] font-mono tracking-[0.16em] uppercase bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn whitespace-nowrap"
                    >
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
