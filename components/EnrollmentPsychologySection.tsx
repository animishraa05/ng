'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Sparkles,
  Sun,
  Moon,
  ShieldCheck,
  Clock,
  MapPin,
  UserCheck,
} from 'lucide-react';
import { STUDIO_INFO, getWhatsAppUrl } from '@/lib/studio-data';

interface EnrollmentPsychologySectionProps {
  onOpenBookingModal: (stream: string, batchTime: string) => void;
}

interface GoalProfile {
  id: string;
  triggerTitle: string;
  triggerSub: string;
  tag: string;
  recommendedStream: string;
  morningSlot: string;
  eveningSlot: string;
  firstWeekFeeling: string;
  day30Outcome: string;
  propsUsed: string;
  cohortNote: string;
  accentBg: string;
}

const GOAL_PROFILES: GoalProfile[] = [
  {
    id: 'back-neck',
    triggerTitle: '“My lower back or neck feels stiff from desk hours.”',
    triggerSub: 'Lumbar decompression, posture realignment & sciatica/slip-disc relief',
    tag: 'SPINE & POSTURE CARE',
    recommendedStream: 'Back Pain Relief',
    morningSlot: '08:30 AM – 09:30 AM',
    eveningSlot: '05:00 PM – 06:00 PM',
    firstWeekFeeling: 'Immediate traction release in lower spine & lighter shoulder blades',
    day30Outcome: 'Sit and stand pain-free with restored natural lumbar curve',
    propsUsed: 'Wall Ropes · Wooden Blocks · Bolsters',
    cohortNote: 'Hands-on spinal alignment in small group cohort',
    accentBg: '#dfe5dc',
  },
  {
    id: 'weight-energy',
    triggerTitle: '“I want sustainable weight loss & high morning energy.”',
    triggerSub: 'Breath-led Vinyasa, Surya Namaskar variations & core metabolic burn',
    tag: 'METABOLIC VINYASA',
    recommendedStream: 'Weight Loss',
    morningSlot: '06:30 AM – 07:30 AM',
    eveningSlot: '06:00 PM – 07:00 PM',
    firstWeekFeeling: 'Lighter digestion, active sweat & zero mid-day lethargy',
    day30Outcome: 'Visible inch loss, core tone & 60-minute stamina without joint strain',
    propsUsed: 'Non-Slip Studio Mat · Core Straps',
    cohortNote: 'High-accountability daily rhythm batch',
    accentBg: '#e8dfc8',
  },
  {
    id: 'mobility-strength',
    triggerTitle: '“My hips, hamstrings & shoulders feel locked up.”',
    triggerSub: 'Progressive Hatha holds, Wheel pose (Chakrasana) & deep joint mobility',
    tag: 'STRENGTH & FLEXIBILITY',
    recommendedStream: 'Strength & Flexibility',
    morningSlot: '07:30 AM – 08:30 AM',
    eveningSlot: '07:00 PM – 08:00 PM',
    firstWeekFeeling: 'Noticeably deeper forward folds & unlocked thoracic spine',
    day30Outcome: 'Assisted backbends, hip opening & functional bodyweight strength',
    propsUsed: 'Yoga Wheel · Alignment Straps · Cork Blocks',
    cohortNote: 'Step-by-step posture progression for all levels',
    accentBg: '#eae8df',
  },
  {
    id: 'stress-breath',
    triggerTitle: '“My mind stays restless; I want calm focus & deep sleep.”',
    triggerSub: 'Guided Pranayama, Nadi Shodhana, Dhyana & nervous system reset',
    tag: 'BREATH & STILLNESS',
    recommendedStream: 'Pranayama & Zen',
    morningSlot: '06:30 AM – 07:30 AM',
    eveningSlot: '08:00 PM – 09:00 PM',
    firstWeekFeeling: 'Slower resting heart rate & deeper, uninterrupted night sleep',
    day30Outcome: 'Steady emotional baseline, lung capacity & unhurried focus',
    propsUsed: 'Meditation Cushion · Guided Breathwork',
    cohortNote: 'Quiet, low-sensory studio atmosphere',
    accentBg: '#dfe5dc',
  },
];

const START_DAYS = ['Today Evening', 'Tomorrow Morning', 'This Week'] as const;

export default function EnrollmentPsychologySection({
  onOpenBookingModal,
}: EnrollmentPsychologySectionProps) {
  const [selectedGoalIdx, setSelectedGoalIdx] = useState<number>(0);
  const [preferredWindow, setPreferredWindow] = useState<'Morning' | 'Evening'>('Morning');
  const [startDay, setStartDay] = useState<string>('Tomorrow Morning');
  const [visitorName, setVisitorName] = useState<string>('');
  const [isPassStamped, setIsPassStamped] = useState<boolean>(false);

  const activeGoal = GOAL_PROFILES[selectedGoalIdx] || GOAL_PROFILES[0];
  const activeTimeSlot =
    preferredWindow === 'Morning' ? activeGoal.morningSlot : activeGoal.eveningSlot;

  const customWhatsAppUrl = getWhatsAppUrl(
    `Namaste NG Yoga Studio Indore! I matched my practice pass on your website and would like to claim my Free 1-Day Studio Trial at Prem Plaza, Ashok Nagar:\n\n• Name: ${
      visitorName.trim() || 'New Practitioner'
    }\n• Goal Focus: ${activeGoal.recommendedStream} (${activeGoal.tag})\n• Preferred Batch: ${activeTimeSlot} (${preferredWindow})\n• Starting: ${startDay}`
  );

  const handleStampPass = () => {
    setIsPassStamped(true);
    try {
      confetti({
        particleCount: 38,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Ignore in restricted environments
    }
  };

  return (
    <section
      id="enroll-matcher"
      className="relative w-full py-20 lg:py-28 px-6 md:px-16 bg-[#eae8df] text-[#191a16] border-b-2 border-[#191a16] scroll-mt-16 z-20"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Top Neobrutalist Kicker Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-[#191a16]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#191a16] text-[#f8f7f3] font-mono text-[10px] tracking-[0.22em] uppercase mb-4 neo-box-sm">
              <Sparkles className="w-3 h-3 text-[#e8dfc8]" />
              <span>30-SECOND PRACTICE MATCHER · ZERO GUESSWORK</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.9rem] md:text-[3.5rem] font-medium tracking-tight leading-[1.06] text-[#191a16] max-w-2xl">
              What does your body need most right now?
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#4f5048] max-w-[42ch] leading-relaxed">
            Don&apos;t guess which batch to join. Select how you feel below—we&apos;ll configure
            your complimentary 60-minute trial pass with the exact batch timing and studio props.
          </p>
        </div>

        {/* Main 12-Column Interactive Conversion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 7 COLUMNS: Step 1 & Step 2 Neobrutalist Interactive Selector */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] uppercase text-[#191a16]">
              <span>STEP 01 · SELECT YOUR PRIMARY GOAL</span>
              <span className="text-[#777b5a]">CLICK TO CONFIGURE PASS →</span>
            </div>

            <div className="space-y-4">
              {GOAL_PROFILES.map((goal, idx) => {
                const isSelected = idx === selectedGoalIdx;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => {
                      setSelectedGoalIdx(idx);
                      setIsPassStamped(false);
                    }}
                    className={`w-full text-left p-5 sm:p-6 transition-all cursor-pointer neo-box ${
                      isSelected
                        ? 'bg-[#191a16] text-[#f8f7f3] -translate-x-1 -translate-y-1 shadow-[7px_7px_0px_0px_#777b5a]'
                        : 'bg-[#f8f7f3] text-[#191a16] hover:bg-white neo-box-hover'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] uppercase border ${
                              isSelected
                                ? 'bg-[#e8dfc8] text-[#191a16] border-[#e8dfc8] font-medium'
                                : 'bg-[#eae8df] text-[#191a16] border-[#191a16]/30'
                            }`}
                          >
                            0{idx + 1} · {goal.tag}
                          </span>
                          <span
                            className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
                              isSelected ? 'text-[#dfe5dc]' : 'text-[#777b5a]'
                            }`}
                          >
                            { preferredWindow === 'Morning' ? goal.morningSlot : goal.eveningSlot }
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-snug pt-1">
                          {goal.triggerTitle}
                        </h3>

                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isSelected ? 'text-[#d5d4cc]' : 'text-[#4f5048]'
                          }`}
                        >
                          {goal.triggerSub}
                        </p>
                      </div>

                      <div
                        className={`w-8 h-8 shrink-0 border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#e8dfc8] border-[#e8dfc8] text-[#191a16]'
                            : 'bg-transparent border-[#191a16] text-[#191a16]'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <span className="font-mono text-xs">0{idx + 1}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* STEP 02: Morning vs Evening Toggle Bar */}
            <div className="bg-[#f8f7f3] p-5 sm:p-6 neo-box">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#777b5a] mb-1">
                    STEP 02 · PREFERRED TIME OF DAY
                  </div>
                  <div className="text-base font-medium text-[#191a16]">
                    When do you prefer to step onto the mat?
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredWindow('Morning');
                      setStartDay('Tomorrow Morning');
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs tracking-[0.16em] uppercase cursor-pointer neo-btn ${
                      preferredWindow === 'Morning'
                        ? 'bg-[#191a16] text-[#f8f7f3]'
                        : 'bg-[#eae8df] text-[#191a16]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Morning</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPreferredWindow('Evening');
                      setStartDay('Today Evening');
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs tracking-[0.16em] uppercase cursor-pointer neo-btn ${
                      preferredWindow === 'Evening'
                        ? 'bg-[#191a16] text-[#f8f7f3]'
                        : 'bg-[#eae8df] text-[#191a16]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Evening</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Tactile Neobrutalist "Perforated Studio Trial Pass" */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="relative bg-[#f8f7f3] border-2 border-[#191a16] shadow-[8px_8px_0px_0px_#191a16] overflow-hidden">
              {/* Top Ticket Stub Header */}
              <div className="bg-[#191a16] text-[#f8f7f3] px-6 py-4 flex items-center justify-between border-b-2 border-[#191a16]">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#e8dfc8]">
                    COMPLIMENTARY 1-DAY STUDIO PASS
                  </div>
                  <div className="font-mono text-sm tracking-[0.14em] uppercase font-medium mt-0.5">
                    NG YOGA · PREM PLAZA, ASHOK NAGAR
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-[#e8dfc8] text-[#191a16] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
                  ₹0 TRIAL
                </div>
              </div>

              {/* Dynamic Ticket Body */}
              <div className="p-6 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeGoal.id}-${preferredWindow}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <div
                      className="p-4 border-2 border-[#191a16]"
                      style={{ backgroundColor: activeGoal.accentBg }}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-[#191a16]/75 mb-1">
                        <span>ASSIGNED COHORT</span>
                        <span>60 MIN GUIDED</span>
                      </div>
                      <div className="text-2xl font-medium tracking-tight text-[#191a16]">
                        {activeGoal.recommendedStream} Cohort
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 bg-[#191a16] text-[#f8f7f3] font-mono text-xs tracking-[0.14em]">
                        <Clock className="w-3.5 h-3.5 text-[#e8dfc8]" />
                        <span>
                          {preferredWindow}: {activeTimeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Psychological Proof / Expected Timeline */}
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 bg-[#eae8df]/80 border border-[#191a16]/25">
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#777b5a] mb-1">
                          AFTER SESSION 01 – 03
                        </div>
                        <div className="text-[#191a16] font-medium leading-snug">
                          {activeGoal.firstWeekFeeling}
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#eae8df]/80 border border-[#191a16]/25">
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#777b5a] mb-1">
                          30-DAY PRACTICE MILESTONE
                        </div>
                        <div className="text-[#191a16] font-medium leading-snug">
                          {activeGoal.day30Outcome}
                        </div>
                      </div>
                    </div>

                    {/* Studio Props & Cohort Guarantee */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1 font-mono text-[11px]">
                      <div className="p-2.5 bg-white border border-[#191a16]/20">
                        <span className="block text-[9px] tracking-[0.18em] uppercase text-[#77776c]">
                          PROPS READY
                        </span>
                        <span className="text-[#191a16] font-medium">{activeGoal.propsUsed}</span>
                      </div>
                      <div className="p-2.5 bg-white border border-[#191a16]/20">
                        <span className="block text-[9px] tracking-[0.18em] uppercase text-[#77776c]">
                          SUPERVISION
                        </span>
                        <span className="text-[#191a16] font-medium">Personal Alignment</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Perforated Tear Line with Side Ticket Notches */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#eae8df] border-2 border-[#191a16] -ml-9 shrink-0" />
                  <div className="w-full border-t-2 border-dashed border-[#191a16]/40 mx-2" />
                  <div className="w-5 h-5 rounded-full bg-[#eae8df] border-2 border-[#191a16] -mr-9 shrink-0" />
                </div>

                {/* Quick Personalization Inside Ticket */}
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="pass-holder-name"
                      className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#4f5048] mb-1"
                    >
                      PASS HOLDER NAME (OPTIONAL)
                    </label>
                    <input
                      id="pass-holder-name"
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Enter your name for the studio desk..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#191a16] text-[#191a16] placeholder:text-[#77776c] focus:outline-none focus:bg-[#f8f7f3]"
                    />
                  </div>

                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[#4f5048] mb-1.5">
                      WHEN WOULD YOU LIKE TO VISIT?
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {START_DAYS.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setStartDay(day)}
                          className={`py-2 px-2 font-mono text-[10px] tracking-[0.12em] uppercase border-2 border-[#191a16] transition-colors cursor-pointer ${
                            startDay === day
                              ? 'bg-[#191a16] text-[#f8f7f3]'
                              : 'bg-white text-[#191a16] hover:bg-[#eae8df]'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stamped Confirmation Seal if clicked */}
                {isPassStamped && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3 bg-[#dfe5dc] border-2 border-[#191a16] flex items-center justify-between text-xs font-mono"
                  >
                    <span className="font-semibold text-[#191a16]">
                      ✓ PASS CONFIGURED FOR {activeTimeSlot}
                    </span>
                    <span className="text-[#777b5a]">ASHOK NAGAR</span>
                  </motion.div>
                )}

                {/* Primary Psychological Enrollment CTAs */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={customWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleStampPass}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-5 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] font-mono text-xs tracking-[0.18em] uppercase neo-btn cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#e8dfc8] shrink-0" />
                    <span>Claim Pass on WhatsApp (+91 91717 44543)</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenBookingModal(activeGoal.recommendedStream, activeTimeSlot)
                    }
                    className="w-full py-3 px-4 bg-[#eae8df] hover:bg-[#e8dfc8] text-[#191a16] font-mono text-[11px] tracking-[0.16em] uppercase border-2 border-[#191a16] transition-colors cursor-pointer"
                  >
                    Or Reserve via Studio Form →
                  </button>
                </div>

                {/* Risk-Reversal Micro-Guarantee */}
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono tracking-[0.14em] uppercase text-[#4f5048]">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#777b5a]" /> No Upfront Fee
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#777b5a]" /> Beginner Friendly
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#777b5a]" /> Prem Plaza
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
