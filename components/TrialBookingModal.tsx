'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, MessageCircle, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { BATCH_SCHEDULE, STUDIO_INFO, getWhatsAppUrl } from '@/lib/studio-data';

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream?: string;
  initialBatchTime?: string;
}

export default function TrialBookingModal({
  isOpen,
  onClose,
  initialStream = 'Weight Loss',
  initialBatchTime = '06:30 AM – 07:30 AM',
}: TrialBookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(initialBatchTime);
  const [selectedGoal, setSelectedGoal] = useState(initialStream);
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const cleanedPhone = phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setError('Please enter your name to reserve a mat.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp or mobile number.');
      return;
    }

    setError(null);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
      });
    } catch {
      // Ignore confetti errors in restricted environments
    }
  };

  const whatsappBookingUrl = getWhatsAppUrl(
    `Namaste NG Yoga Studio Indore! I would like to book my complimentary Studio Trial at Prem Plaza, Ashok Nagar.\n• Name: ${
      fullName.trim() || 'Guest'
    }\n• Phone: ${phone.trim() || 'On Chat'}\n• Batch: ${selectedBatch}\n• Focus: ${selectedGoal}\n• Level: ${experienceLevel}`
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151712]/80"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#f8f7f3] border-2 border-[#191a16] shadow-[10px_10px_0px_0px_#191a16] max-h-[90vh] overflow-y-auto text-[#191a16]"
        >
          {/* Top Neobrutalist Ticket Header */}
          <div className="bg-[#191a16] text-[#f8f7f3] px-6 py-4 flex items-center justify-between border-b-2 border-[#191a16]">
            <div>
              <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#e8dfc8]">
                COMPLIMENTARY 60-MIN STUDIO TRIAL
              </div>
              <div className="font-mono text-xs tracking-[0.16em] uppercase mt-0.5">
                PREM PLAZA · ASHOK NAGAR, INDORE
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="p-2 bg-[#f8f7f3] text-[#191a16] border-2 border-[#191a16] hover:bg-[#e8dfc8] transition-colors cursor-pointer"
              aria-label="Close booking dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {!submitted ? (
              <div>
                <h3
                  id="trial-modal-title"
                  className="text-2xl sm:text-3xl font-medium tracking-tight text-[#191a16] mb-2"
                >
                  Reserve Your Mat
                </h3>
                <p className="text-xs sm:text-sm text-[#4f5048] mb-5">
                  Experience a full 60-minute guided session with personal posture alignment before
                  choosing any membership plan.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="trial-name"
                      className="block text-[11px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="trial-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-[#191a16] text-[#191a16] focus:outline-none focus:bg-[#eae8df]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="trial-phone"
                      className="block text-[11px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium mb-1.5"
                    >
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      id="trial-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border-2 border-[#191a16] text-[#191a16] focus:outline-none focus:bg-[#eae8df]/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="trial-batch"
                        className="block text-[11px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium mb-1.5"
                      >
                        Preferred Batch
                      </label>
                      <select
                        id="trial-batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs font-mono bg-white border-2 border-[#191a16] text-[#191a16]"
                      >
                        {BATCH_SCHEDULE.map((b) => (
                          <option key={b.id} value={b.timeRange}>
                            {b.timeRange} ({b.period})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="trial-goal"
                        className="block text-[11px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium mb-1.5"
                      >
                        Practice Focus
                      </label>
                      <select
                        id="trial-goal"
                        value={selectedGoal}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs font-mono bg-white border-2 border-[#191a16] text-[#191a16]"
                      >
                        <option value="Weight Loss">Vinyasa Weight Loss</option>
                        <option value="Strength & Flexibility">Hatha &amp; Backbend Mobility</option>
                        <option value="Back Pain Relief">Back Pain &amp; Spine Relief</option>
                        <option value="Pranayama & Zen">Pranayama &amp; Meditation</option>
                        <option value="Acro & Rope Yoga">Partner &amp; Restorative Yoga</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-mono tracking-[0.16em] uppercase text-[#191a16] font-medium mb-1.5">
                      Experience Level
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`py-2 px-3 text-[11px] font-mono tracking-[0.14em] uppercase border-2 border-[#191a16] transition-colors cursor-pointer ${
                            experienceLevel === lvl
                              ? 'bg-[#191a16] text-[#f8f7f3]'
                              : 'bg-white text-[#191a16] hover:bg-[#eae8df]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-mono text-[#191a16] bg-[#e8dfc8] border-2 border-[#191a16] px-3.5 py-2.5">
                      {error}
                    </p>
                  )}

                  {/* Psychological Zero-Risk Banner */}
                  <div className="p-3 bg-[#dfe5dc] border border-[#191a16] flex items-center gap-2.5 text-xs text-[#191a16]">
                    <ShieldCheck className="w-4 h-4 text-[#191a16] shrink-0" />
                    <span>
                      <strong>Zero Obligation:</strong> Studio mats, blocks &amp; wall ropes are
                      provided for your first visit.
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 px-5 text-xs font-mono tracking-[0.18em] uppercase bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn cursor-pointer"
                    >
                      Generate Trial Pass
                    </button>
                    <a
                      href={whatsappBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-mono tracking-[0.16em] uppercase bg-[#e8dfc8] text-[#191a16] neo-btn"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dfe5dc] border-2 border-[#191a16] text-[11px] font-mono tracking-[0.2em] uppercase text-[#191a16]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>STUDIO PASS STAMPED</span>
                </div>

                <h3 className="text-2xl font-medium tracking-tight text-[#191a16]">
                  Your mat is reserved, {fullName}.
                </h3>

                <div className="bg-[#eae8df] neo-box p-4 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-[#191a16]/20">
                    <span className="text-[#4f5048]">BATCH SLOT</span>
                    <span className="text-[#191a16] font-semibold">{selectedBatch}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#191a16]/20">
                    <span className="text-[#4f5048]">PRACTICE STREAM</span>
                    <span className="text-[#191a16] font-semibold">{selectedGoal}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#191a16]/20">
                    <span className="text-[#4f5048]">SESSION FEE</span>
                    <span className="text-[#191a16] font-semibold">₹0 (Complimentary Trial)</span>
                  </div>
                  <div className="pt-1 flex items-start gap-2 text-[#191a16] font-sans">
                    <MapPin className="w-4 h-4 text-[#777b5a] shrink-0 mt-0.5" />
                    <span>{STUDIO_INFO.addressShort}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={whatsappBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-mono tracking-[0.16em] uppercase bg-[#191a16] text-[#f8f7f3] hover:bg-[#777b5a] neo-btn"
                  >
                    <MessageCircle className="w-4 h-4 text-[#e8dfc8]" />
                    <span>Send Pass on WhatsApp (+91 91717 44543)</span>
                  </a>
                  <a
                    href={`tel:+${STUDIO_INFO.primaryPhoneRaw}`}
                    className="inline-flex items-center justify-center gap-1.5 py-3.5 px-4 text-xs font-mono tracking-[0.16em] uppercase bg-[#eae8df] text-[#191a16] neo-btn"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
