import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'NG Yoga Studio Indore — Fit Body • Calm Mind • Strong Soul',
  description:
    'Fit Body • Calm Mind • Strong Soul. Premier yoga studio at Prem Plaza, Ashok Nagar, Indore offering Weight Loss Yoga, Strength & Flexibility, Back Pain Relief, Pranayama, Meditation, and Acro Yoga.',
  openGraph: {
    title: 'NG Yoga Studio Indore — Fit Body • Calm Mind • Strong Soul',
    description:
      'Fit Body • Calm Mind • Strong Soul. Premier yoga studio at Prem Plaza, Ashok Nagar, Indore offering Weight Loss Yoga, Strength & Flexibility, Back Pain Relief, Pranayama, Meditation, and Acro Yoga.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NG Yoga Studio Indore — Fit Body • Calm Mind • Strong Soul',
    description:
      'Fit Body • Calm Mind • Strong Soul. Join Morning & Evening yoga batches at Prem Plaza, Ashok Nagar, Indore.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#f8f7f3] text-[#191a16] font-sans antialiased selection:bg-[#191a16] selection:text-[#f8f7f3] overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
