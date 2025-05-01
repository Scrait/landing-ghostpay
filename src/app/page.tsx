// app/en/page.tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Roadmap from '@/components/Roadmap';
import Benefits from '@/components/Benefits';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { ParticleBackground, GhostCanvas } from '@/components/ClientComponents';

export const dynamic = 'force-static';

export const metadata = {
  title: 'GhostPay — DAO wallet on TON with Telegram integration',
  description:
    'GhostPay is a decentralized multisig wallet with Telegram control, DAO governance, and secure on-chain voting — powered by TON.',
  alternates: {
    canonical: 'https://ghost-pay.run/',
    languages: {
      en: 'https://ghost-pay.run/',
    },
  },
  openGraph: {
    title: 'GhostPay — DAO wallet on TON with Telegram integration',
    description:
      'GhostPay is a decentralized multisig wallet with Telegram control, DAO governance, and secure on-chain voting — powered by TON.',
    url: 'https://ghost-pay.run/',
    siteName: 'GhostPay',
    images: [
      {
        url: 'https://ghost-pay.run/ghost.png',
        width: 1200,
        height: 630,
        alt: 'GhostPay preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostPay — DAO wallet on TON',
    description:
      'GhostPay is a decentralized multisig wallet with Telegram control and on-chain governance.',
    images: ['https://ghost-pay.run/ghost.png'],
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background rendered on client */}
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none z-10">
        <GhostCanvas />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <Roadmap />
          <Benefits />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
