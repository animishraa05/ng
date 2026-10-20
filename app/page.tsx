'use client';

// ============================================================================
// NG YOGA STUDIO INDORE — MAIN LANDING PAGE
// Note for Developers:
// To link your own local studio video or portrait images, update the URL
// constants in `/lib/studio-data.ts` (`HERO_VIDEO_URL`, `ASANA_FLOW_VIDEO_URL`,
// `FOUNDER_PORTRAIT_URL`, and `PRACTICES_DATA`).
// ============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import {
  Phone,
  Mail,
  Instagram,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Activity,
  Wind,
  Moon,
  Sun,
  Heart,
  Copy,
  Check,
  MessageCircle,
  Compass,
  Camera,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SandTransitionImage from '@/components/SandTransitionImage';
import YogaBackgroundMotion from '@/components/YogaBackgroundMotion';
import StickyAsanaChoreography from '@/components/StickyAsanaChoreography';
import EnrollmentPsychologySection from '@/components/EnrollmentPsychologySection';
import BatchScheduleSection from '@/components/BatchScheduleSection';
import TrialBookingModal from '@/components/TrialBookingModal';
import {
  STUDIO_INFO,
  PRACTICES_DATA,
  HERO_VIDEO_URL,
  HERO_YOGA_SEQUENCE_IMAGES,
  OVERLAPPING_YOGA_IMAGE,
  PHILOSOPHY_IMAGE,
  FOUNDER_PORTRAIT_URL,
  PRICING_TIERS,
  TESTIMONIALS,
  STUDIO_FAQS,
  BatchSlot,
  getWhatsAppUrl,
} from '@/lib/studio-data';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const NAV_ITEMS = [
  { href: '#practices', id: 'practices', label: 'Practices' },
  { href: '#asana-flow', id: 'asana-flow', label: 'Sequence' },
  { href: '#enroll-matcher', id: 'enroll-matcher', label: 'Goal Matcher' },
  { href: '#schedule', id: 'schedule', label: 'Schedule' },
  { href: '#pricing', id: 'pricing', label: 'Memberships' },
  { href: '#location', id: 'location', label: 'Location' },
] as const;

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  // Core Interactive State
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [heroPoseIndex, setHeroPoseIndex] = useState<number>(0);
  const [activePractice, setActivePractice] = useState<number>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isInteractingWithList, setIsInteractingWithList] = useState<boolean>(false);
  const [activeNavSection, setActiveNavSection] = useState<string>('');

  // Booking Modal & Utilities State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStream, setModalStream] = useState<string>('Weight Loss');
  const [modalBatchTime, setModalBatchTime] = useState<string>('06:30 AM – 07:30 AM');
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Ambient Three.js synchronization
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [asanaProgress, setAsanaProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const philosophyImageY = useTransform(scrollYProgress, [0.55, 0.9], [-20, 20]);

  // 1. Reveal cinematic background sequence/video after 2800ms introductory delay
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowVideo(true);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, []);

  // Slow cinematic crossfade across full-body sunlit yoga poses in the hero background
  useEffect(() => {
    if (!showVideo || prefersReducedMotion || HERO_VIDEO_URL) return;
    const interval = window.setInterval(() => {
      setHeroPoseIndex((prev) => (prev + 1) % HERO_YOGA_SEQUENCE_IMAGES.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [showVideo, prefersReducedMotion]);

  // 2. Automatically cycle activePractice every 3500ms, pausing on user interaction
  useEffect(() => {
    if (isInteractingWithList || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActivePractice((prev) => (prev + 1) % PRACTICES_DATA.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [isInteractingWithList, prefersReducedMotion]);

  // 3. Track active section for sticky navbar indicator
  useEffect(() => {
    const sectionIds = [
      'practices',
      'asana-flow',
      'enroll-matcher',
      'schedule',
      'philosophy',
      'pricing',
      'location',
    ];
    const handleScrollSpy = () => {
      const scrollY = window.scrollY + 140;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id === 'philosophy' ? 'pricing' : id;
        }
      }
      setActiveNavSection(current);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleProgressSync = useCallback((stageIndex: number, progress: number) => {
    setActiveStageIdx(stageIndex);
    setAsanaProgress(progress);
  }, []);

  const handleOpenBookingModal = (
    stream = 'Weight Loss',
    batchTime = '06:30 AM – 07:30 AM'
  ) => {
    setModalStream(stream);
    setModalBatchTime(batchTime);
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSelectBatchForTrial = (batch: BatchSlot) => {
    setModalStream(batch.streamCategory);
    setModalBatchTime(batch.timeRange);
    setIsModalOpen(true);
  };

  const handleCopyAddress = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(STUDIO_INFO.fullAddress);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    }
  };

  const selectPracticeAndScroll = (index: number, shouldScroll = false) => {
    setActivePractice(index);
    if (shouldScroll && typeof document !== 'undefined') {
      const el = document.getElementById('practices');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPractice = PRACTICES_DATA[activePractice] || PRACTICES_DATA[0];

  const primaryWhatsAppUrl = getWhatsAppUrl(
    'Namaste NG Yoga Studio Indore! I would like to book a Free Trial Session at Prem Plaza, Ashok Nagar.'
  );

  const filterPills = [
    { index: 0, label: 'Hatha', icon: Activity },
    { index: 1, label: 'Vinyasa', icon: Wind },
    { index: 2, label: 'Spine & Rope Care', icon: Moon },
    { index: 3, label: 'Morning Pranayama', icon: Sun },
    { index: 4, label: 'Partner & Restorative', icon: Heart },
  ];

  return (
    <div
      id="top"
      className="relative min-h-screen flex flex-col bg-[#f8f7f3] text-[#191a16] overflow-x-hidden"
    >
      {/* Subtle Three.js Sacred Geometry & Prana Wave Background */}
      <YogaBackgroundMotion
        mode="three-pure"
        activeStageIndex={activeStageIdx}
        scrollProgress={asanaProgress}
      />

      {/* =====================================================================
          OPTIMIZED STICKY 3-ZONE TOP NAVIGATION BAR
          Zone 1: Single-line Brand Wordmark
          Zone 2: 5–6 Single-line Section Links with Active Scroll Indicator
          Zone 3: 1 Primary CTA Button (Desktop) / Compact Drawer Toggle (Mobile)
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#f8f7f3]/95 border-b-2 border-[#191a16] transition-colors">
        <div className="max-w-[1440px] mx-auto h-16 px-6 md:px-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-Line Brand Wordmark */}
          <a
            href="#top"
            className="font-mono text-sm md:text-base font-semibold tracking-[0.22em] uppercase text-[#191a16] whitespace-nowrap shrink-0"
          >
            NG YOGA STUDIO
          </a>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-[0.18em] uppercase text-[#4f5048]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNavSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#191a16] font-semibold'
                      : 'hover:text-[#191a16]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#191a16] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (Desktop) + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenBookingModal(currentPractice.name)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] text-[11px] font-mono tracking-[0.16em] uppercase neo-btn cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Claim ₹0 Trial Pass</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e8dfc8]" />
            </button>

            {/* Mobile Hamburger Button (Only shown below lg breakpoint) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden flex flex-col justify-center items-end gap-[5px] p-2.5 border-2 border-[#191a16] bg-[#eae8df] cursor-pointer focus:outline-none"
            >
              <span
                className={`block h-[2px] bg-[#191a16] transition-all duration-200 ${
                  isMobileMenuOpen ? 'w-5 translate-y-[3.5px] rotate-45' : 'w-5'
                }`}
              />
              <span
                className={`block h-[2px] bg-[#191a16] transition-all duration-200 ${
                  isMobileMenuOpen ? 'w-5 -translate-y-[3.5px] -rotate-45' : 'w-3.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-[#f8f7f3] border-t-2 border-[#191a16]"
            >
              <div className="px-6 py-5 flex flex-col space-y-3 font-mono text-xs tracking-[0.18em] uppercase">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 border-b border-[#191a16]/15 hover:text-[#777b5a] flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenBookingModal(currentPractice.name)}
                    className="w-full py-3 px-4 bg-[#191a16] text-[#f8f7f3] text-center font-mono text-[11px] tracking-[0.18em] uppercase neo-btn cursor-pointer"
                  >
                    Claim ₹0 Trial Pass
                  </button>
                  <a
                    href={primaryWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#e8dfc8] text-[#191a16] text-center font-mono text-[11px] tracking-[0.18em] uppercase neo-btn flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Studio</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          SECTION 1 — HERO (FULL VIEWPORT PRESENCE BELOW STICKY NAVBAR)
      ===================================================================== */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden border-b-2 border-[#191a16] z-20">
        {/* 1D. CINEMATIC YOGA BACKGROUND
            To link your own MP4 studio video file, set `HERO_VIDEO_URL = "/videos/your-video.mp4"`
            inside `/lib/studio-data.ts`. */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Initial Sunlit Yoga Studio Frame */}
          <img
            src={HERO_YOGA_SEQUENCE_IMAGES[0]}
            alt=""
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-40"
            style={{ filter: 'sepia(0.14) saturate(0.85) contrast(1.02)' }}
          />

          {/* Breathing-Inspired Soft Light Gradients (8–12s cycle) */}
          <div
            className="absolute -top-24 right-[8%] w-[520px] h-[520px] rounded-full animate-breath-slow"
            style={{
              background:
                'radial-gradient(circle, rgba(232,223,200,0.55) 0%, rgba(223,229,220,0.3) 55%, transparent 78%)',
              filter: 'blur(38px)',
            }}
          />
          <div
            className="absolute bottom-[-120px] left-[12%] w-[580px] h-[460px] rounded-full animate-linen-drift"
            style={{
              background:
                'radial-gradient(ellipse, rgba(234,232,223,0.5) 0%, rgba(223,229,220,0.22) 60%, transparent 80%)',
              filter: 'blur(42px)',
            }}
          />

          {/* Delayed Cinematic Reveal (2800ms): Plays linked MP4 video OR slow full-body yoga sequence */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showVideo ? 0.55 : 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {HERO_VIDEO_URL ? (
              <video
                src={HERO_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.img
                  key={HERO_YOGA_SEQUENCE_IMAGES[heroPoseIndex]}
                  src={HERO_YOGA_SEQUENCE_IMAGES[heroPoseIndex]}
                  alt=""
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-center"
                  style={{ filter: 'sepia(0.14) saturate(0.85) contrast(1.02)' }}
                />
              </AnimatePresence>
            )}
          </motion.div>

          {/* Warm-Neutral Editorial Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f3]/92 via-[#f8f7f3]/72 to-[#f8f7f3]/65" />
        </div>

        {/* 1A & 1B. HERO ARCHITECTURAL WORDMARK BANNER + STUDIO PILLARS STRIP */}
        <div className="relative pt-6 px-6 md:px-16 z-20">
          {/* Oversized Custom Geometric SVG Wordmark ("NG YOGA · INDORE") */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="w-full overflow-hidden pb-3 border-b border-[#191a16]/20"
          >
            <svg
              viewBox="0 0 920 108"
              className="w-full h-auto max-h-[78px] md:max-h-[104px] fill-[#191a16] select-none"
              role="img"
              aria-label="NG YOGA STUDIO INDORE"
            >
              {/* N */}
              <motion.g variants={letterBlock}>
                <path d="M8 98V10H26L78 72V10H95V98H77L25 36V98H8Z" />
              </motion.g>
              {/* G */}
              <motion.g variants={letterBlock}>
                <path d="M168 52H214V92C202 97 186 100 168 100C134 100 112 78 112 54C112 30 134 8 168 8C188 8 203 14 212 24L199 36C191 28 181 24 168 24C144 24 130 38 130 54C130 70 144 84 168 84C180 84 190 82 197 78V66H168V52Z" />
              </motion.g>
              {/* Center Dot */}
              <motion.g variants={letterBlock}>
                <circle cx="268" cy="54" r="8" fill="#777b5a" />
              </motion.g>
              {/* Y */}
              <motion.g variants={letterBlock}>
                <path d="M348 62L312 10H333L357 46L381 10H402L366 62V98H348V62Z" />
              </motion.g>
              {/* O */}
              <motion.g variants={letterBlock}>
                <path d="M466 100C432 100 410 78 410 54C410 30 432 8 466 8C500 8 522 30 522 54C522 78 500 100 466 100ZM466 84C490 84 504 70 504 54C504 38 490 24 466 24C442 24 428 38 428 54C428 70 442 84 466 84Z" />
              </motion.g>
              {/* G */}
              <motion.g variants={letterBlock}>
                <path d="M596 52H642V92C630 97 614 100 596 100C562 100 540 78 540 54C540 30 562 8 596 8C616 8 631 14 640 24L627 36C619 28 609 24 596 24C572 24 558 38 558 54C558 70 572 84 596 84C608 84 618 82 625 78V66H596V52Z" />
              </motion.g>
              {/* A */}
              <motion.g variants={letterBlock}>
                <path d="M704 10H724L766 98H747L737 76H691L681 98H662L704 10ZM730 61L714 27L698 61H730Z" />
              </motion.g>
              {/* Subtle Locality Stamp */}
              <motion.g variants={letterBlock}>
                <text
                  x="912"
                  y="44"
                  textAnchor="end"
                  className="font-mono text-[12px] tracking-[0.24em]"
                  fill="#191a16"
                >
                  INDORE
                </text>
                <text
                  x="912"
                  y="68"
                  textAnchor="end"
                  className="font-mono text-[10px] tracking-[0.2em]"
                  fill="#777b5a"
                >
                  ASHOK NAGAR
                </text>
              </motion.g>
            </svg>
          </motion.div>

          {/* Editorial Pillar & Studio Hours Strip */}
          <div className="flex flex-wrap items-start justify-between gap-6 mt-5 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-[#191a16]">
            <div className="hidden sm:flex flex-col gap-1 text-[#4f5048]">
              <div className="flex items-center gap-2">
                <span>A quieter way to move.</span>
                <ArrowRight className="w-3 h-3 text-[#777b5a]" />
                <span className="text-[#191a16] font-medium">Fit Body</span>
              </div>
              <div className="flex items-center gap-2">
                <span>A deeper way to feel.</span>
                <ArrowRight className="w-3 h-3 text-[#777b5a]" />
                <span className="text-[#191a16] font-medium">Calm Mind</span>
              </div>
              <div className="flex items-center gap-2">
                <span>A moment to return to yourself.</span>
                <ArrowRight className="w-3 h-3 text-[#777b5a]" />
                <span className="text-[#191a16] font-medium">Strong Soul</span>
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-2 text-[10px] text-[#191a16]">
              <span>Fit Body</span>
              <span>·</span>
              <span>Calm Mind</span>
              <span>·</span>
              <span>Strong Soul</span>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-[#4f5048] tabular-nums">
              <div className="text-[#191a16] font-medium">
                PREM PLAZA · NEAR ICICI BANK, ASHOK NAGAR
              </div>
              <div>MON – SAT: 6:30 AM – 9:00 PM &nbsp;·&nbsp; SUN: 7:00 – 9:00 AM</div>
            </div>
          </div>
        </div>

        {/* 1E & 1F. HERO CONTENT + RIGHT NEOBRUTALIST STUDIO DISPATCH CARD */}
        <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between px-6 md:px-16 mt-12 sm:mt-16 md:mt-20 mb-14 gap-10">
          {/* 1E. Left Hero Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
            }}
            className="w-full lg:w-[600px]"
          >
            {/* Section Indicator: 01 + Thin Horizontal Line */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 text-[11px] font-mono tracking-[0.22em] uppercase text-[#191a16] mb-5"
            >
              <span className="px-2 py-0.5 bg-[#191a16] text-[#f8f7f3]">01</span>
              <span className="w-10 h-[1.5px] bg-[#191a16]" />
              <span className="text-[#777b5a] font-medium">{STUDIO_INFO.tagline}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.75rem] sm:text-[3.6rem] md:text-[4.6rem] font-normal tracking-tight leading-[0.98] text-[#191a16] mb-6"
            >
              MOVE WITH INTENTION.
              <br />
              RETURN TO YOURSELF.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-[15px] text-[#191a16]/85 max-w-[46ch] leading-[1.7] mb-7"
            >
              Guided Hatha, Vinyasa Weight Loss, Wall-Rope Spine Therapy, and Pranayama in
              small cohorts where every posture is personally aligned. Step onto the mat at
              Prem Plaza, Ashok Nagar.
            </motion.p>

            {/* Psychological Conversion CTA Bar (Tactile Neobrutalist Buttons) */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => handleOpenBookingModal(currentPractice.name)}
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] font-mono text-xs tracking-[0.18em] uppercase neo-btn cursor-pointer"
              >
                <span>Claim ₹0 Studio Trial Pass</span>
                <ArrowUpRight className="w-4 h-4 text-[#e8dfc8]" />
              </button>

              <a
                href="#enroll-matcher"
                className="inline-flex items-center gap-2 px-5 py-4 bg-[#e8dfc8] hover:bg-[#eae8df] text-[#191a16] font-mono text-xs tracking-[0.16em] uppercase neo-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>30-Sec Goal Matcher</span>
              </a>
            </motion.div>

            {/* Zero-Risk Reversal Strip */}
            <motion.div
              variants={fadeUp}
              className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3.5 py-2 bg-[#f8f7f3]/90 border border-[#191a16]/30 text-[11px] font-mono text-[#191a16]"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#777b5a]" />
                First 60-Min Session Free
              </span>
              <span aria-hidden="true">·</span>
              <span>Mats &amp; Wall Ropes Provided</span>
              <span aria-hidden="true">·</span>
              <span>Mon–Sun Batches</span>
            </motion.div>
          </motion.div>

          {/* 1F. Right Sidebar — Neobrutalist "Today's Cohort Dispatch" Card */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-[320px] lg:w-[295px] bg-[#f8f7f3]/95 neo-box p-5 z-20"
            aria-label="Today's Practice"
          >
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-[#191a16] text-[10px] font-mono tracking-[0.2em] uppercase">
              <span className="text-[#191a16] font-semibold">COHORT SPOTLIGHT</span>
              <span className="px-2 py-0.5 bg-[#dfe5dc] border border-[#191a16] text-[#191a16]">
                0{activePractice + 1} / 05
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPractice.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-lg font-medium tracking-tight text-[#191a16] mb-1">
                  {currentPractice.name}
                </div>
                <p className="text-xs text-[#4f5048] leading-relaxed mb-4">
                  {currentPractice.subtitle}
                </p>

                <div className="space-y-1.5 p-3 bg-[#eae8df] border border-[#191a16]/25 text-[10px] font-mono tracking-[0.16em] uppercase mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#4f5048]">BATCHES</span>
                    <span className="text-[#191a16] font-semibold">
                      {currentPractice.batchTiming}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4f5048]">DURATION</span>
                    <span className="text-[#191a16] font-semibold">
                      {currentPractice.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4f5048]">TRIAL PASS</span>
                    <span className="text-[#777b5a] font-semibold">COMPLIMENTARY</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenBookingModal(currentPractice.name)}
                className="flex-1 py-2.5 px-3 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] text-[10px] font-mono tracking-[0.18em] uppercase neo-btn cursor-pointer"
              >
                Reserve Trial Mat
              </button>
              <button
                type="button"
                onClick={() => selectPracticeAndScroll(activePractice, true)}
                aria-label="Inspect full practice stream"
                className="p-2.5 bg-[#e8dfc8] text-[#191a16] neo-btn cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        </div>

        {/* 1G. BOTTOM-LEFT SCROLL INDICATOR */}
        <div className="relative z-20 hidden md:flex items-center justify-between px-8 md:px-16 pb-8">
          <a
            href="#find-flow"
            className="flex items-center gap-3.5"
            aria-label="Scroll to explore studio"
          >
            <div className="w-9 h-9 rounded-full border border-[#191a16]/45 flex items-center justify-center gap-[3px]">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.75, 1.15, 0.75] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1.5px] h-3.5 bg-[#191a16]"
              />
              <motion.span
                animate={{ opacity: [1, 0.3, 1], scaleY: [1.15, 0.75, 1.15] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1.5px] h-3.5 bg-[#191a16]"
              />
            </div>
            <motion.span
              animate={{ opacity: [0.45, 0.95, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#191a16]"
            >
              SCROLL TO EXPLORE STUDIO
            </motion.span>
          </a>

          <a
            href={`tel:+${STUDIO_INFO.primaryPhoneRaw}`}
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#191a16] hover:text-[#777b5a] transition-colors"
          >
            STUDIO DESK: {STUDIO_INFO.primaryPhoneDisplay} / 70006 56390
          </a>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 — [ 02 ] FIND YOUR FLOW
      ===================================================================== */}
      <section
        id="find-flow"
        className="relative w-full min-h-[75vh] md:min-h-screen bg-[#f8f7f3] flex flex-col justify-between items-center px-6 md:px-16 pt-24 pb-12 scroll-mt-16 z-20"
      >
        <div className="flex flex-col items-center text-center max-w-[1000px] mx-auto">
          {/* 2A. Section Label */}
          <div className="px-3 py-1 bg-[#eae8df] border-2 border-[#191a16] text-[11px] font-mono tracking-[0.26em] uppercase text-[#191a16] mb-6 neo-box-sm">
            [ 02 ] &nbsp; FIVE CORE PRACTICE STREAMS
          </div>

          {/* 2B. Main Heading */}
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.1] font-medium tracking-tight text-[#191a16] mb-10"
          >
            Discover a practice that meets you where you are.
          </motion.h2>

          {/* 2C. Tactile Neobrutalist Practice Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterPills.map((pill) => {
              const IconComponent = pill.icon;
              const isSelected = activePractice === pill.index;
              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => selectPracticeAndScroll(pill.index, true)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 text-[11px] font-mono tracking-[0.18em] uppercase cursor-pointer neo-btn ${
                    isSelected
                      ? 'bg-[#191a16] text-[#f8f7f3]'
                      : 'bg-[#eae8df] text-[#191a16] hover:bg-[#e8dfc8]'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2D. Atmospheric Spacer for Oversized Overlapping Yoga Image */}
        <div className="min-h-[220px] md:min-h-[450px] w-full" />

        {/* 2E. Bottom Text */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono tracking-[0.22em] uppercase text-[#77776c] pt-6 border-t border-[#191a16]/15">
          <span>LESS NOISE. MORE PRESENCE.</span>
          <span className="hidden sm:inline">
            A PRACTICE OF RETURNING · ASHOK NAGAR, INDORE
          </span>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — THE PRACTICE (FULL-WIDTH DARK SECTION)
      ===================================================================== */}
      <section
        id="practices"
        className="relative w-full bg-[#151712] text-[#f8f7f3] flex flex-col scroll-mt-16 z-30"
      >
        {/* 3A. Oversized Overlapping Yoga Image (Full-body kneeling Anjali Mudra) */}
        <motion.div
          initial={{ y: '-65%', opacity: 0 }}
          whileInView={{ y: '-78%', opacity: 1 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[135vw] md:w-[980px] h-[300px] md:h-[460px] pointer-events-none z-10 flex items-center justify-center"
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 68% 66% at 50% 50%, rgba(0,0,0,1) 42%, rgba(0,0,0,0.55) 72%, transparent 96%)',
              maskImage:
                'radial-gradient(ellipse 68% 66% at 50% 50%, rgba(0,0,0,1) 42%, rgba(0,0,0,0.55) 72%, transparent 96%)',
            }}
          >
            <img
              src={OVERLAPPING_YOGA_IMAGE}
              alt="Mindful yoga posture at NG Yoga Studio Indore"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* 3B. Heading Area */}
        <div className="px-8 md:px-16 pt-32 md:pt-48 mb-16 relative z-20">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-end">
            <div className="xl:col-span-8">
              <h2 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem] leading-[1.15] font-medium tracking-tight text-[#f8f7f3]">
                Make space for stillness,{' '}
                <span className="inline-flex items-center gap-2 align-middle mx-1">
                  <span className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/25 inline-flex items-center justify-center hover:bg-[#f8f7f3] hover:text-[#151712] transition-colors duration-300">
                    <Activity className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                  <span className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/25 inline-flex items-center justify-center hover:bg-[#f8f7f3] hover:text-[#151712] transition-colors duration-300">
                    <Wind className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                  <span className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/25 inline-flex items-center justify-center hover:bg-[#f8f7f3] hover:text-[#151712] transition-colors duration-300">
                    <Sun className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </span>{' '}
                strength, and the self within.
              </h2>
            </div>

            <div className="xl:col-span-4 flex flex-col xl:items-end justify-between gap-6">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#a0a295] leading-[1.9] xl:text-right">
                <div>BREATHE WITH PURPOSE.</div>
                <div>MOVE WITH PRESENCE.</div>
                <div>REST WITHOUT GUILT.</div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#e8dfc8]">
                <span>Mindful</span>
                <span>·</span>
                <span>Grounded</span>
                <span>·</span>
                <span>Intentional</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3C. Two-Column Practice Collection (35% Left Featured / 65% Right List) */}
        <div
          className="border-t border-white/15 grid grid-cols-1 lg:grid-cols-12"
          onMouseEnter={() => setIsInteractingWithList(true)}
          onMouseLeave={() => setIsInteractingWithList(false)}
        >
          {/* Left Panel (35% -> 5 cols): Featured Practice with Full-Body SandTransitionImage */}
          <div className="lg:col-span-5 relative min-h-[460px] md:min-h-[580px] border-b lg:border-b-0 lg:border-r border-white/15 p-6 md:p-10 flex flex-col justify-between bg-[#151712]">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-[#a0a295]">
              <span>• • •</span>
              <span className="text-[#e8dfc8]">{currentPractice.pillar.toUpperCase()}</span>
            </div>

            {/* Center: Full-Body SandTransitionImage */}
            <div className="relative flex-1 my-5 flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <SandTransitionImage
                  key={currentPractice.id}
                  src={currentPractice.image}
                  alt={`${currentPractice.name} — ${currentPractice.subtitle}`}
                  className="w-full h-[300px] md:h-[360px] mx-auto"
                />
              </AnimatePresence>
              <p className="mt-4 text-xs sm:text-sm text-[#d5d4cc] leading-relaxed">
                {currentPractice.description}
              </p>
            </div>

            {/* Bottom: Animated Vertical Counter 01 / 05 + Tactile Neobrutalist Trial Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 font-mono text-xs tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2 overflow-hidden h-5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activePractice}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="inline-block text-[#f8f7f3] font-medium"
                  >
                    0{activePractice + 1}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/40">/ 05</span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBookingModal(currentPractice.name)}
                className="px-4 py-2.5 bg-[#e8dfc8] text-[#191a16] text-[11px] font-mono tracking-[0.16em] uppercase neo-btn-light flex items-center gap-1.5 cursor-pointer"
              >
                <span>Try {currentPractice.batchTiming}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Panel (65% -> 7 cols): 5 Selectable Practice Rows */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="px-6 md:px-12 py-5 border-b border-white/15 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-[#a0a295]">
              <span>Select a stream to inspect posture &amp; batch timings</span>
              <span className="text-[#e8dfc8]">STREAM 0{activePractice + 1}</span>
            </div>

            <div className="divide-y divide-white/15 flex-1 flex flex-col justify-center">
              {PRACTICES_DATA.map((practice, index) => {
                const isActive = index === activePractice;
                return (
                  <button
                    key={practice.id}
                    type="button"
                    onClick={() => setActivePractice(index)}
                    className={`w-full text-left px-6 md:px-12 py-6 md:py-7 transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.06] text-[#f8f7f3]'
                        : 'text-[#77776c] hover:text-[#f8f7f3]/90 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs tracking-[0.2em] text-[#e8dfc8]">
                          0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight">
                          {practice.name}
                        </h3>
                      </div>
                      <p
                        className={`text-xs md:text-sm mt-1 pl-7 transition-colors ${
                          isActive ? 'text-[#d5d4cc]' : 'text-[#77776c]'
                        }`}
                      >
                        {practice.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-5 pl-7 sm:pl-0 shrink-0">
                      <div className="text-right font-mono text-[11px] tracking-[0.18em] uppercase">
                        <div className={isActive ? 'text-[#f8f7f3]' : 'text-[#77776c]'}>
                          {practice.duration}
                        </div>
                        <div className="text-[10px] text-[#e8dfc8]/80">{practice.batchTiming}</div>
                      </div>

                      <div
                        className={`w-9 h-9 border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'border-[#e8dfc8] bg-[#e8dfc8] text-[#151712] opacity-100'
                            : 'border-white/15 text-white/40 opacity-50'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MINDFUL ASANA SEQUENCE (SCROLL-LINKED PROGRESSION)
      ===================================================================== */}
      <StickyAsanaChoreography
        onOpenBookingModal={(stream) => handleOpenBookingModal(stream)}
        onProgressSync={handleProgressSync}
      />

      {/* =====================================================================
          PSYCHOLOGICAL ENROLLMENT ENGINE — 30-SEC GOAL MATCHER & STUDIO PASS
      ===================================================================== */}
      <EnrollmentPsychologySection onOpenBookingModal={handleOpenBookingModal} />

      {/* =====================================================================
          DAILY BATCH SCHEDULE (MORNING 6:30–10 AM & EVENING 5:00–9 PM)
      ===================================================================== */}
      <BatchScheduleSection onSelectBatchForTrial={handleSelectBatchForTrial} />

      {/* =====================================================================
          SECTION 4 — 04 / OUR PHILOSOPHY + INSTRUCTOR & STUDENT STORIES (#eae8df)
      ===================================================================== */}
      <section
        id="philosophy"
        className="relative w-full bg-[#eae8df] text-[#191a16] py-20 lg:py-28 px-6 md:px-16 border-b-2 border-[#191a16] scroll-mt-16 z-20"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* 4A. Quiet Editorial Philosophy Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-block px-3 py-1 bg-[#f8f7f3] border-2 border-[#191a16] text-[11px] font-mono tracking-[0.24em] uppercase text-[#191a16] neo-box-sm">
                04 / OUR PHILOSOPHY
              </div>

              <h2 className="text-[2.1rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.12] font-normal tracking-tight text-[#191a16]">
                Yoga is not about becoming someone else. It is about returning to yourself.
              </h2>

              <p className="text-sm md:text-base text-[#4f5048] leading-[1.8] max-w-[48ch]">
                We believe practice begins with attention. Some days it asks for strength, some
                days for stillness. Every day at our Ashok Nagar studio, it offers a quiet hour
                to listen, realign the spine, and move with care.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenBookingModal()}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] text-xs font-mono tracking-[0.18em] uppercase neo-btn cursor-pointer"
                >
                  <span>Experience a Guided Session ↗</span>
                </button>
              </div>
            </motion.div>

            {/* Editorial Sunlit Studio Photograph */}
            <div className="lg:col-span-6 overflow-hidden neo-box bg-[#151712]">
              <motion.img
                style={{ y: philosophyImageY }}
                src={PHILOSOPHY_IMAGE}
                alt="Practitioner in toe-stand lotus balance in sunlit yoga studio"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center scale-105"
              />
            </div>
          </div>

          {/* 4B. Lead Instructor & Studio Credentials ([To Be Answered] Placeholders) */}
          <div
            id="founder"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-16 border-t-2 border-[#191a16] mb-20"
          >
            {/* Left 5 Columns: Lead Instructor Portrait Placeholder
                To link your founder photo, set `FOUNDER_PORTRAIT_URL = "/images/founder.jpg"` in `/lib/studio-data.ts` */}
            <div className="lg:col-span-5 bg-[#f8f7f3] neo-box p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[#191a16] pb-3 mb-4 border-b-2 border-[#191a16]">
                <span className="font-semibold">LEAD INSTRUCTOR</span>
                <span className="text-[#777b5a]">ASHOK NAGAR, INDORE</span>
              </div>

              {FOUNDER_PORTRAIT_URL ? (
                <div className="aspect-[4/4] w-full overflow-hidden mb-4 border-2 border-[#191a16]">
                  <img
                    src={FOUNDER_PORTRAIT_URL}
                    alt={STUDIO_INFO.founderDetails.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/4] w-full border-2 border-dashed border-[#191a16]/50 bg-[#eae8df]/70 flex flex-col items-center justify-center p-6 text-center mb-4">
                  <div className="w-14 h-14 border-2 border-[#191a16] bg-[#f8f7f3] flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-[#191a16]" />
                  </div>
                  <div className="font-mono text-xs tracking-[0.18em] uppercase text-[#191a16] mb-1">
                    Instructor Portrait Placeholder
                  </div>
                  <p className="text-xs text-[#6e7065] max-w-[240px] leading-relaxed">
                    Set <code className="font-mono">FOUNDER_PORTRAIT_URL</code> in{' '}
                    <code className="font-mono">/lib/studio-data.ts</code>
                  </p>
                </div>
              )}

              <div className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#6e7065] flex items-center justify-between pt-2">
                <span>NG YOGA STUDIO</span>
                <span>PREM PLAZA</span>
              </div>
            </div>

            {/* Right 7 Columns: Instructor Details */}
            <div className="lg:col-span-7 bg-[#f8f7f3] neo-box p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#777b5a] mb-2">
                  FOUNDER &amp; HEAD INSTRUCTOR
                </div>
                <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#191a16] mb-4">
                  {STUDIO_INFO.founderDetails.name}
                </h3>

                <p className="text-base sm:text-lg text-[#4f5048] italic leading-relaxed p-4 bg-[#eae8df] border border-[#191a16]/25 mb-8">
                  {STUDIO_INFO.founderDetails.bioQuote}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#eae8df] border-2 border-[#191a16] p-4">
                    <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#4f5048] mb-1">
                      TEACHING EXPERIENCE
                    </div>
                    <div className="text-sm font-medium text-[#191a16]">
                      {STUDIO_INFO.founderDetails.experienceYears}
                    </div>
                  </div>

                  <div className="bg-[#eae8df] border-2 border-[#191a16] p-4">
                    <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#4f5048] mb-1">
                      CREDENTIALS &amp; TRAINING
                    </div>
                    <div className="text-sm font-medium text-[#191a16]">
                      {STUDIO_INFO.founderDetails.certifications}
                    </div>
                  </div>
                </div>

                <div className="bg-[#dfe5dc] border-2 border-[#191a16] p-4 mb-6">
                  <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#191a16] font-semibold mb-1">
                    STUDIO FOCUS AREAS
                  </div>
                  <div className="text-sm font-medium text-[#191a16]">
                    {STUDIO_INFO.founderDetails.specialties}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#191a16] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-mono text-[#4f5048]">
                  Instagram Journal:{' '}
                  <span className="text-[#191a16] font-medium">
                    {STUDIO_INFO.instagramHandle}
                  </span>
                </div>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8dfc8] text-[#191a16] text-xs font-mono tracking-[0.16em] uppercase neo-btn"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Follow Studio Updates ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4C. Student Reflections (Neobrutalist Proof Cards) */}
          <div className="pt-14 border-t-2 border-[#191a16]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#777b5a] mb-2">
                  COMMUNITY REFLECTIONS · GOOGLE MAPS REVIEWS
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#191a16]">
                  Words from our regular practitioners.
                </h3>
              </div>
              <a
                href={STUDIO_INFO.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#f8f7f3] text-xs font-mono tracking-[0.18em] uppercase text-[#191a16] neo-btn"
              >
                <span>View on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#f8f7f3] neo-box p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-[#191a16]">
                      <span className="px-2 py-0.5 bg-[#dfe5dc] border border-[#191a16] text-[10px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium">
                        {item.resultBadge}
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#4f5048]">
                        {item.batchTag}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#191a16] leading-relaxed mb-6">
                      {item.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#191a16]/20 flex items-center gap-3.5">
                    <div
                      className="w-11 h-11 bg-[#e8dfc8] border-2 border-[#191a16] flex flex-col items-center justify-center shrink-0 font-mono text-xs font-semibold text-[#191a16]"
                      title="Student Avatar Placeholder"
                    >
                      <span>{item.pfpInitials}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#191a16] truncate">
                        {item.studentName}
                      </div>
                      <div className="text-xs text-[#4f5048] truncate">{item.locality}</div>
                      <div className="text-[10px] font-mono text-[#777b5a] truncate">
                        {item.verificationNote}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — 05 / YOUR NEXT CHAPTER ("YOUR MAT IS WAITING") + NEOBRUTALIST MEMBERSHIPS & MAP
      ===================================================================== */}
      <section
        id="book"
        className="relative w-full bg-[#f8f7f3] text-[#191a16] py-20 lg:py-28 px-6 md:px-16 scroll-mt-16 z-20"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* 5A. Psychological 3-Step First-Visit Blueprint + Header */}
          <div className="max-w-[820px] mx-auto text-center mb-14">
            <div className="inline-block px-3 py-1 bg-[#e8dfc8] border-2 border-[#191a16] text-[11px] font-mono tracking-[0.24em] uppercase text-[#191a16] mb-4 neo-box-sm">
              05 / START WITHOUT PRESSURE
            </div>
            <h2 className="text-[2.6rem] sm:text-[3.8rem] md:text-[4.5rem] font-normal tracking-tight leading-[1.02] text-[#191a16] mb-5">
              Your mat is waiting.
            </h2>
            <p className="text-sm sm:text-base text-[#4f5048] leading-relaxed max-w-[52ch] mx-auto">
              You don&apos;t need to be flexible before you start—that is why you come to
              practice. Try a single 60-minute session first, feel the posture guidance, and
              decide afterwards.
            </p>
          </div>

          {/* 3-Step Psychological Friction-Reduction Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              {
                step: 'STEP 01',
                title: 'Pick Any Morning or Evening Slot',
                desc: 'Choose a batch between 6:30–10:00 AM or 5:00–9:00 PM that fits your workday.',
                bg: '#eae8df',
              },
              {
                step: 'STEP 02',
                title: 'Attend Your ₹0 Guided Session',
                desc: 'Walk into Prem Plaza, Ashok Nagar. Studio mats, blocks, and wall ropes are waiting.',
                bg: '#dfe5dc',
              },
              {
                step: 'STEP 03',
                title: 'Join Only If Your Body Loves It',
                desc: 'Zero sales pressure. Continue with a Monthly or 90-Day pass once you feel the difference.',
                bg: '#e8dfc8',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 neo-box flex flex-col justify-between"
                style={{ backgroundColor: item.bg }}
              >
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#191a16] font-semibold mb-2">
                  {item.step}
                </div>
                <div className="text-lg font-medium text-[#191a16] mb-1">{item.title}</div>
                <p className="text-xs text-[#191a16]/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 5B. Neobrutalist Membership & Trial Value-Stack Cards */}
          <div id="pricing" className="mb-24 scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PRICING_TIERS.map((tier) => {
                const whatsappHref = getWhatsAppUrl(tier.whatsappText);
                const isFeatured = Boolean(tier.featured);
                return (
                  <div
                    key={tier.id}
                    className={`relative p-7 sm:p-8 flex flex-col justify-between transition-transform ${
                      isFeatured
                        ? 'bg-[#151712] text-[#f8f7f3] border-2 border-[#191a16] shadow-[8px_8px_0px_0px_#777b5a] lg:-translate-y-2'
                        : 'bg-[#eae8df] text-[#191a16] neo-box neo-box-hover'
                    }`}
                  >
                    {isFeatured && (
                      <div className="inline-block self-start px-3 py-1 bg-[#e8dfc8] text-[#191a16] border-2 border-[#191a16] font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                        ★ MOST CHOSEN BY REGULARS
                      </div>
                    )}

                    <div>
                      <div
                        className={`text-[10px] font-mono tracking-[0.2em] uppercase mb-2 ${
                          isFeatured ? 'text-[#dfe5dc]' : 'text-[#777b5a]'
                        }`}
                      >
                        {tier.badgeText}
                      </div>
                      <h3 className="text-2xl font-medium tracking-tight mb-3">{tier.name}</h3>

                      <div
                        className={`pb-5 mb-5 border-b-2 ${
                          isFeatured ? 'border-white/20' : 'border-[#191a16]'
                        }`}
                      >
                        <div className="text-3xl sm:text-4xl font-mono tracking-tight">
                          {tier.priceDisplay}
                        </div>
                        <div
                          className={`text-xs font-mono mt-1 ${
                            isFeatured ? 'text-[#a0a295]' : 'text-[#4f5048]'
                          }`}
                        >
                          {tier.priceSubtext}
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-5 leading-relaxed ${
                          isFeatured ? 'text-[#d5d4cc]' : 'text-[#191a16]'
                        }`}
                      >
                        {tier.description}
                      </p>

                      <ul className="space-y-3 text-xs sm:text-sm mb-8">
                        {tier.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isFeatured ? 'text-[#e8dfc8]' : 'text-[#777b5a]'
                              }`}
                            />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 py-4 px-4 text-xs font-mono tracking-[0.16em] uppercase ${
                        isFeatured
                          ? 'bg-[#e8dfc8] text-[#151712] neo-btn-light'
                          : 'bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{tier.ctaLabel}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5C. Studio FAQ (Neobrutalist Accordion Stack) */}
          <div className="max-w-[860px] mx-auto mb-24">
            <div className="mb-8">
              <div className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#777b5a] mb-2">
                QUESTIONS &amp; STUDIO GUIDELINES
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#191a16]">
                Preparing for your first visit.
              </h3>
            </div>
            <div className="space-y-3">
              {STUDIO_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-[#eae8df] neo-box overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-base font-medium text-[#191a16] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#191a16] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-2 border-t border-[#191a16]/20 bg-[#f8f7f3] text-sm text-[#4f5048] leading-relaxed space-y-2">
                        <p>{faq.answer}</p>
                        {faq.toBeAnsweredTag && (
                          <div className="inline-block px-2.5 py-1 bg-[#e8dfc8] border border-[#191a16] font-mono text-[11px] text-[#191a16]">
                            {faq.toBeAnsweredTag}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5D. Ashok Nagar Google Map & Studio Location */}
          <div id="location" className="pt-14 border-t-2 border-[#191a16] scroll-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#777b5a] mb-2">
                  THE STUDIO · ASHOK NAGAR, INDORE (452001)
                </div>
                <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#191a16]">
                  Prem Plaza, Near ICICI Bank, Ashok Nagar.
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.16em] uppercase bg-[#eae8df] text-[#191a16] neo-btn cursor-pointer"
                >
                  {addressCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#777b5a]" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={STUDIO_INFO.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.16em] uppercase bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Directions in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 bg-[#eae8df] neo-box p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="pb-4 border-b-2 border-[#191a16]">
                    <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#4f5048] mb-1.5">
                      VERIFIED ADDRESS
                    </div>
                    <div className="text-sm sm:text-base font-medium text-[#191a16] leading-relaxed">
                      {STUDIO_INFO.fullAddress}
                    </div>
                  </div>

                  <div className="pb-4 border-b-2 border-[#191a16]">
                    <div className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#4f5048] mb-1.5">
                      STUDIO HOURS
                    </div>
                    <div className="text-xs font-mono text-[#191a16] space-y-1">
                      <div>Monday – Saturday: 6:30 AM – 9:00 PM</div>
                      <div>Sunday Session: 7:00 AM – 9:00 AM</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono text-[#191a16]">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#777b5a] shrink-0" />
                      <a href={`tel:+${STUDIO_INFO.primaryPhoneRaw}`} className="hover:underline">
                        {STUDIO_INFO.primaryPhoneDisplay}
                      </a>
                      <span>/</span>
                      <a href={`tel:+${STUDIO_INFO.secondaryPhoneRaw}`} className="hover:underline">
                        70006 56390
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-[#777b5a] shrink-0" />
                      <a href={`mailto:${STUDIO_INFO.email}`} className="hover:underline">
                        {STUDIO_INFO.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-3.5 h-3.5 text-[#777b5a] shrink-0" />
                      <a
                        href={STUDIO_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {STUDIO_INFO.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={primaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-mono tracking-[0.16em] uppercase bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn"
                >
                  <MessageCircle className="w-4 h-4 text-[#e8dfc8]" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              <div className="lg:col-span-7 neo-box bg-[#eae8df] overflow-hidden flex flex-col min-h-[380px]">
                <div className="px-5 py-3 bg-[#151712] text-[#f8f7f3] flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase border-b-2 border-[#191a16]">
                  <span>PREM PLAZA · ASHOK NAGAR, INDORE</span>
                  <span className="text-[#e8dfc8]">NEAR ICICI BANK</span>
                </div>
                <div className="relative flex-1 w-full min-h-[340px]">
                  <iframe
                    title="NG Yoga Studio Indore Map"
                    src={STUDIO_INFO.googleMapsEmbedUrl}
                    className="w-full h-full min-h-[340px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3D. DARK EDITORIAL FOOTER
      ===================================================================== */}
      <footer className="relative z-30 bg-[#151712] text-[#a0a295] px-8 py-10 border-t-2 border-[#191a16] pb-24 sm:pb-10">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-[11px] tracking-[0.22em] uppercase">
          <div>
            <div className="text-[#f8f7f3] mb-1">
              A SMALL SPACE TO COME BACK TO YOURSELF
            </div>
            <div className="text-[10px] text-[#77776c]">
              {STUDIO_INFO.name} · {STUDIO_INFO.addressShort}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#f8f7f3]">
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8dfc8] transition-colors"
            >
              Instagram
            </a>
            <a href="#location" className="hover:text-[#e8dfc8] transition-colors">
              Contact
            </a>
            <button
              type="button"
              onClick={() => handleOpenBookingModal()}
              className="hover:text-[#e8dfc8] transition-colors uppercase cursor-pointer"
            >
              Book a Class
            </button>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING NEOBRUTALIST WHATSAPP CTA */}
      {!isMobileMenuOpen && !isModalOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-30">
          <a
            href={primaryWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Free Trial on WhatsApp at +91 91717 44543"
            className="inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase bg-[#e8dfc8] text-[#191a16] hover:bg-[#191a16] hover:text-[#f8f7f3] neo-btn whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Book Free Trial on WhatsApp</span>
          </a>
        </div>
      )}

      {/* INTERACTIVE FREE TRIAL BOOKING MODAL */}
      <TrialBookingModal
        key={`${modalStream}-${modalBatchTime}-${isModalOpen}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStream={modalStream}
        initialBatchTime={modalBatchTime}
      />
    </div>
  );
}
