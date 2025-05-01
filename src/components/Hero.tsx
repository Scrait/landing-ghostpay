// src/components/Hero.tsx
import ClientHeroContent from './ClientHeroContent';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20 z-0"></div>
      <ClientHeroContent />
    </section>
  );
}