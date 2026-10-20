// ============================================================================
// NG YOGA STUDIO INDORE — CENTRAL DATA & MEDIA CONFIGURATION
// To use your own studio videos or photographs, replace the URL constants below
// with paths to files in your `/public` folder (e.g. "/videos/studio-hero.mp4"
// or "/images/founder-portrait.jpg").
// ============================================================================

export interface PracticeItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  focus: string;
  batchTiming: string;
  pillar: 'Fit Body' | 'Calm Mind' | 'Strong Soul';
  image: string;
}

export interface AsanaScrollStage {
  id: string;
  step: string;
  sanskritName: string;
  englishName: string;
  pillar: 'Fit Body' | 'Calm Mind' | 'Strong Soul';
  breathCue: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface BatchSlot {
  id: string;
  timeRange: string;
  period: 'Morning' | 'Evening' | 'Sunday';
  batchName: string;
  streamCategory:
    | 'Weight Loss'
    | 'Strength & Flexibility'
    | 'Back Pain Relief'
    | 'Pranayama & Zen'
    | 'Acro & Rope Yoga';
  days: string;
  instructorPlaceholder: string;
  spotsStatus: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badgeText: string;
  priceDisplay: string;
  priceSubtext: string;
  description: string;
  perks: string[];
  featured?: boolean;
  ctaLabel: string;
  whatsappText: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  locality: string;
  batchTag: string;
  resultBadge: string;
  quote: string;
  pfpInitials: string;
  verificationNote: string;
}

export interface StudioFaqItem {
  id: string;
  question: string;
  answer: string;
  toBeAnsweredTag?: string;
}

// ----------------------------------------------------------------------------
// 1. STUDIO VIDEO & HERO PHOTOGRAPHY LINKS
// Replace `HERO_VIDEO_URL` with your local MP4 path (e.g., "/videos/yoga-hero.mp4")
// when you are ready to use a raw video file in the hero background.
// ----------------------------------------------------------------------------
export const HERO_VIDEO_URL = ''; // e.g. "/videos/yoga-hero.mp4"

// Cinematic full-body yoga sequence used in the Hero background
export const HERO_YOGA_SEQUENCE_IMAGES = [
  'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1600', // Full-body toe-stand lotus balance in sunlit studio
  'https://images.pexels.com/photos/3822167/pexels-photo-3822167.jpeg?auto=compress&cs=tinysrgb&w=1600', // Full-body Extended Side Angle Vinyasa flow
  'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1600', // Full-body Camel pose backbend in sunlit studio
  'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1600', // Full-body kneeling Anjali Mudra stillness
];

// Oversized transition image between Section 2 and Section 3 (Full-body kneeling Anjali Mudra)
export const OVERLAPPING_YOGA_IMAGE =
  'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1600';

// Section 4 Philosophy editorial image (Full-body toe-stand balance in sunlit studio)
export const PHILOSOPHY_IMAGE =
  'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1400';

// Founder / Lead Instructor portrait link — replace with "/images/founder.jpg" when available
export const FOUNDER_PORTRAIT_URL = ''; // e.g. "/images/ng-gothane.jpg"

// ----------------------------------------------------------------------------
// 2. VERIFIED STUDIO CONTACT & LOCATION DETAILS
// ----------------------------------------------------------------------------
export const STUDIO_INFO = {
  name: 'NG Yoga Studio Indore',
  shortName: 'NG YOGA',
  tagline: 'Fit Body • Calm Mind • Strong Soul',
  addressShort: 'Prem Plaza, 5 & 6, Samrat, Near ICICI Bank, Ashok Nagar, Indore',
  fullAddress:
    'Prem Plaza, 5 & 6, Samrat, Near ICICI Bank, Ashok Nagar, Indore, Madhya Pradesh 452001',
  primaryPhoneDisplay: '+91 91717 44543',
  primaryPhoneRaw: '919171744543',
  secondaryPhoneDisplay: '+91 70006 56390',
  secondaryPhoneRaw: '917000656390',
  email: 'nggothane7869@gmail.com',
  instagramHandle: '@ng_yoga_studio_indore',
  instagramUrl: 'https://www.instagram.com/ng_yoga_studio_indore/',
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=NG+Yoga+Studio+Prem+Plaza+Ashok+Nagar+Indore+Madhya+Pradesh+452001',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Prem%20Plaza%20Ashok%20Nagar%20Indore%20Madhya%20Pradesh%20452001&t=&z=16&ie=UTF8&iwloc=&output=embed',
  operatingHours: {
    monSat: 'Mon – Sat: 6:30 AM – 9:00 PM',
    morningWindow: '6:30 AM – 10:00 AM',
    eveningWindow: '5:00 PM – 9:00 PM',
    sunday: 'Sun: 7:00 AM – 9:00 AM',
  },
  founderDetails: {
    name: 'NG Gothane · [To Be Answered: Full Title]',
    role: 'Founder & Lead Yoga Instructor',
    certifications: '[To Be Answered: Yoga Alliance / Therapy Certifications]',
    experienceYears: '[To Be Answered: Teaching Experience Years]',
    specialties:
      'Wall Rope Therapy • Backbends & Mobility • Weight Loss Vinyasa • Pranayama • Partner Yoga',
    bioQuote:
      '“Consistency on the mat changes how you carry yourself off the mat—steady in posture, unhurried in breath.”',
  },
};

export function getWhatsAppUrl(customMessage?: string): string {
  const message =
    customMessage ||
    'Namaste NG Yoga Studio Indore! I would like to book a Free Trial Session at Prem Plaza, Ashok Nagar.';
  return `https://wa.me/${STUDIO_INFO.primaryPhoneRaw}?text=${encodeURIComponent(message)}`;
}

// ----------------------------------------------------------------------------
// 3. FIVE CORE PRACTICES (Each image verified to show the full practitioner
//    performing that exact yoga style in a warm sunlit studio)
// ----------------------------------------------------------------------------
export const PRACTICES_DATA: PracticeItem[] = [
  {
    id: 'hatha-strength',
    name: 'Hatha & Backbend Mobility',
    subtitle: 'Wheel pose, deep backbends & structural alignment',
    description:
      'Build joint resilience, shoulder opening, and progressive spinal extension with hands-on posture guidance.',
    duration: '60 MIN',
    focus: 'STRENGTH & MOBILITY',
    batchTiming: '7:30 AM · 7:00 PM',
    pillar: 'Fit Body',
    // Full-body woman performing Wheel Pose (Chakrasana) backbend
    image:
      'https://images.pexels.com/photos/3822455/pexels-photo-3822455.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'vinyasa-flow',
    name: 'Vinyasa Weight Loss Flow',
    subtitle: 'Continuous breath-led movement for metabolic conditioning',
    description:
      'Fluid standing sequences, Surya Namaskar variations, and core engagement designed to build lean stamina.',
    duration: '60 MIN',
    focus: 'METABOLIC FLOW',
    batchTiming: '6:30 AM · 9:00 AM · 6:00 PM',
    pillar: 'Fit Body',
    // Full-body practitioners performing Extended Side Angle Vinyasa flow
    image:
      'https://images.pexels.com/photos/3822167/pexels-photo-3822167.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'back-pain-spine',
    name: 'Back Pain & Spine Relief',
    subtitle: 'Therapeutic twists, lumbar care & wall-rope decompression',
    description:
      'Targeted spinal mobilisation and posture correction to release lower-back stiffness from long desk hours.',
    duration: '60 MIN',
    focus: 'SPINAL THERAPY',
    batchTiming: '8:30 AM · 5:00 PM',
    pillar: 'Calm Mind',
    // Full-body practitioner performing Seated Spinal Twist (Ardha Matsyendrasana)
    image:
      'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'morning-pranayama',
    name: 'Pranayama & Meditation',
    subtitle: 'Seated breathwork, Nadi Shodhana & quiet focus',
    description:
      'Structured breath regulation and stillness practices to settle nervous system fatigue and sharpen clarity.',
    duration: '45 MIN',
    focus: 'BREATH & STILLNESS',
    batchTiming: '6:30 AM · 8:00 PM',
    pillar: 'Calm Mind',
    // Full-body practitioner seated in Lotus Pose (Padmasana) with Gyan Mudra
    image:
      'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'partner-acro',
    name: 'Partner & Restorative Yoga',
    subtitle: 'Assisted alignment, Acro balance & Sunday recovery',
    description:
      'Guided partner stretches, assisted inversions, and unhurried restorative holds every Sunday morning.',
    duration: '90 MIN',
    focus: 'PARTNER & RECOVERY',
    batchTiming: 'SUN 7:00 – 9:00 AM',
    pillar: 'Strong Soul',
    // Full-body instructor & practitioner in assisted Downward Dog alignment
    image:
      'https://images.pexels.com/photos/3822688/pexels-photo-3822688.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

// ----------------------------------------------------------------------------
// 4. ASANA PROGRESSION STAGES (Scroll-Linked Studio Sequence)
// Replace `ASANA_FLOW_VIDEO_URL` with a local MP4 path (e.g. "/videos/asana-flow.mp4")
// if you want scroll-scrubbed video instead of the 4-stage photo sequence.
// ----------------------------------------------------------------------------
export const ASANA_FLOW_VIDEO_URL = ''; // e.g. "/videos/asana-flow.mp4"

export const ASANA_SCROLL_STAGES: AsanaScrollStage[] = [
  {
    id: 'stage-1',
    step: '01',
    sanskritName: 'Utthita Parsvakonasana',
    englishName: 'Extended Side Angle',
    pillar: 'Fit Body',
    breathCue: 'Inhale · Ground the outer heel and lengthen through the side ribs',
    description:
      'Establish a wide, stable base. The front knee stacks cleanly over the ankle while the top arm extends in one unbroken line.',
    imageUrl:
      'https://images.pexels.com/photos/3822167/pexels-photo-3822167.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Extended Side Angle posture in a sunlit yoga studio',
  },
  {
    id: 'stage-2',
    step: '02',
    sanskritName: 'Chaturanga Dandasana',
    englishName: 'Four-Limbed Staff Transition',
    pillar: 'Fit Body',
    breathCue: 'Exhale · Draw the lower ribs in and hover parallel to the mat',
    description:
      'Transition with control. Elbows hug the ribcage as shoulder blades stay broad and the core supports the lumbar spine.',
    imageUrl:
      'https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Chaturanga Dandasana plank transition on yoga mat',
  },
  {
    id: 'stage-3',
    step: '03',
    sanskritName: 'Urdhva Mukha Svanasana',
    englishName: 'Upward-Facing Dog',
    pillar: 'Calm Mind',
    breathCue: 'Inhale · Press through the palms and lift the sternum forward',
    description:
      'Open the chest and anterior spine. Thighs lift gently clear of the floor while the neck remains long and unhurried.',
    imageUrl:
      'https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Upward-Facing Dog heart opening yoga pose',
  },
  {
    id: 'stage-4',
    step: '04',
    sanskritName: 'Vajrasana Anjali Mudra',
    englishName: 'Centered Stillness',
    pillar: 'Strong Soul',
    breathCue: 'Exhale · Rest palms at the sternum and observe the breath',
    description:
      'Complete the cycle in stillness. Allow the heart rate to settle and carry quiet attention into the rest of your day.',
    imageUrl:
      'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageAlt: 'Kneeling Anjali Mudra meditation in sunlit studio',
  },
];

// ----------------------------------------------------------------------------
// 5. DAILY BATCH SCHEDULE (MORNING, EVENING & SUNDAY)
// ----------------------------------------------------------------------------
export const BATCH_SCHEDULE: BatchSlot[] = [
  {
    id: 'm-1',
    timeRange: '06:30 AM – 07:30 AM',
    period: 'Morning',
    batchName: 'Sunrise Vinyasa & Pranayama',
    streamCategory: 'Weight Loss',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Lead Instructor · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'm-2',
    timeRange: '07:30 AM – 08:30 AM',
    period: 'Morning',
    batchName: 'Hatha Strength, Backbends & Mobility',
    streamCategory: 'Strength & Flexibility',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Lead Instructor · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'm-3',
    timeRange: '08:30 AM – 09:30 AM',
    period: 'Morning',
    batchName: 'Back Pain Relief & Wall Rope Therapy',
    streamCategory: 'Back Pain Relief',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Therapy Specialist · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'm-4',
    timeRange: '09:00 AM – 10:00 AM',
    period: 'Morning',
    batchName: 'Morning Toning & Mindful Flow',
    streamCategory: 'Weight Loss',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Instructor · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'e-1',
    timeRange: '05:00 PM – 06:00 PM',
    period: 'Evening',
    batchName: 'Evening Spine Decompression',
    streamCategory: 'Back Pain Relief',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Therapy Specialist · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'e-2',
    timeRange: '06:00 PM – 07:00 PM',
    period: 'Evening',
    batchName: 'Metabolic Vinyasa & Core Conditioning',
    streamCategory: 'Weight Loss',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Lead Instructor · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'e-3',
    timeRange: '07:00 PM – 08:00 PM',
    period: 'Evening',
    batchName: 'Splits, Wheel Pose & Deep Flexibility',
    streamCategory: 'Strength & Flexibility',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Lead Instructor · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 'e-4',
    timeRange: '08:00 PM – 09:00 PM',
    period: 'Evening',
    batchName: 'Pranayama, Dhyana & Evening Unwind',
    streamCategory: 'Pranayama & Zen',
    days: 'Mon – Sat',
    instructorPlaceholder: 'Meditation Guide · [To Be Answered]',
    spotsStatus: 'Open for Trial',
  },
  {
    id: 's-1',
    timeRange: '07:00 AM – 09:00 AM',
    period: 'Sunday',
    batchName: 'Sunday Session: Partner / Acro Yoga & Restorative Hold',
    streamCategory: 'Acro & Rope Yoga',
    days: 'Sunday',
    instructorPlaceholder: 'NG Gothane & Team',
    spotsStatus: 'Weekly Session',
  },
];

// ----------------------------------------------------------------------------
// 6. MEMBERSHIP & TRIAL TIERS
// ----------------------------------------------------------------------------
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free-trial',
    name: 'Complimentary Studio Trial',
    badgeText: 'FIRST VISIT · PREM PLAZA',
    priceDisplay: 'Free',
    priceSubtext: 'Single 60-minute guided studio session',
    description: 'Experience the space, meet the instructor, and find the batch that fits your routine.',
    perks: [
      'Join any Morning or Evening batch',
      'Initial posture & mobility check',
      'Studio mats, blocks & wall ropes provided',
    ],
    ctaLabel: 'Book Free Trial on WhatsApp',
    whatsappText:
      'Namaste NG Yoga Studio Indore! I would like to book my complimentary 1-Day Studio Trial at Prem Plaza, Ashok Nagar.',
  },
  {
    id: 'monthly-regular',
    name: 'Monthly Practice Pass',
    badgeText: 'MONDAY – SUNDAY',
    priceDisplay: '[To Be Answered]',
    priceSubtext: 'Monthly studio membership · Confirm current fee on WhatsApp',
    description: 'Consistent daily practice across our morning or evening cohorts.',
    perks: [
      '6 days/week regular batch access',
      'Includes Sunday Partner & Pranayama sessions',
      'Flexibility to shift between Morning & Evening slots',
    ],
    featured: true,
    ctaLabel: 'Inquire Monthly Fee on WhatsApp',
    whatsappText:
      'Namaste NG Yoga Studio Indore! Please share the Monthly Practice Pass fee and batch availability.',
  },
  {
    id: 'quarterly-transformation',
    name: '90-Day Practice Commitment',
    badgeText: 'QUARTERLY PLAN',
    priceDisplay: '[To Be Answered]',
    priceSubtext: '3-month package · Couple & family rates available',
    description: 'Designed for long-term weight management, back care, and progressive mobility.',
    perks: [
      'Full access to daily batches & Sunday sessions',
      'Progressive mobility & posture milestones',
      'Personal breathwork & home routine · [To Be Answered]',
    ],
    ctaLabel: 'Inquire Quarterly Plan on WhatsApp',
    whatsappText:
      'Namaste NG Yoga Studio Indore! I am interested in the 90-Day Practice Plan. Please share the details.',
  },
];

// ----------------------------------------------------------------------------
// 7. STUDENT STORIES & FAQ
// ----------------------------------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    studentName: '[To Be Answered: Student Name]',
    locality: 'Ashok Nagar, Indore · 8:30 AM Batch',
    batchTag: 'Back Pain & Spine Relief',
    resultBadge: 'Lumbar Mobility',
    quote:
      '“Long hours at a desk had left my lower back constantly stiff. Within a few weeks of guided spinal decompression and posture adjustments here, my mornings feel completely different.”',
    pfpInitials: 'PD',
    verificationNote: 'Student Photo & Review Link: [To Be Answered]',
  },
  {
    id: 't-2',
    studentName: '[To Be Answered: Student Name]',
    locality: 'Sapna Sangeeta, Indore · 6:30 AM Batch',
    batchTag: 'Sunrise Vinyasa Flow',
    resultBadge: 'Consistent Stamina',
    quote:
      '“The 6:30 AM batch sets the tone for my entire day. It is challenging enough to build real strength and endurance without ever feeling rushed or hard on the joints.”',
    pfpInitials: 'RK',
    verificationNote: 'Student Photo & Review Link: [To Be Answered]',
  },
  {
    id: 't-3',
    studentName: '[To Be Answered: Student Name]',
    locality: 'Bhawarkuan, Indore · 7:00 PM Batch',
    batchTag: 'Evening Hatha & Mobility',
    resultBadge: 'Personal Attention',
    quote:
      '“What stands out most is the individual attention to alignment. Whether you are a complete beginner or working on deeper backbends, every posture is guided with care.”',
    pfpInitials: 'AV',
    verificationNote: 'Student Photo & Review Link: [To Be Answered]',
  },
];

export const STUDIO_FAQS: StudioFaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need to bring my own yoga mat for the trial class?',
    answer:
      'Studio mats, blocks, straps, and wall ropes are available at Prem Plaza. You are also welcome to bring your own mat and a small towel.',
    toBeAnsweredTag: '[To Be Answered: Confirm Mat Policy]',
  },
  {
    id: 'faq-2',
    question: 'Are 1-on-1 therapeutic or home sessions available in Indore?',
    answer:
      'We provide individual posture attention in every batch, as well as dedicated private sessions for slip-disc recovery, prenatal care, or senior mobility.',
    toBeAnsweredTag: '[To Be Answered: Confirm Private Session Timings & Fee]',
  },
  {
    id: 'faq-3',
    question: 'Can I alternate between Morning (6:30–10:00 AM) and Evening (5:00–9:00 PM) batches?',
    answer:
      'Yes. Members whose work schedules shift can attend either a morning or evening slot so their practice stays uninterrupted.',
    toBeAnsweredTag: '[To Be Answered: Confirm Batch Transfer Guidelines]',
  },
];
