import React, { useEffect, useRef } from 'react';
import { Ghost } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;

    if (title && tagline && cta) {
      title.style.opacity = '0';
      tagline.style.opacity = '0';
      cta.style.opacity = '0';
      
      title.style.transform = 'translateY(20px)';
      tagline.style.transform = 'translateY(20px)';
      cta.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          tagline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          tagline.style.opacity = '1';
          tagline.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            cta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            cta.style.opacity = '1';
            cta.style.transform = 'translateY(0)';
          }, 200);
        }, 200);
      }, 100);
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6 flex justify-center items-center">
          <Ghost size={64} className="text-neon-blue animate-pulse-glow" />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 text-white"
        >
          <span className="text-neon-blue glow-text-blue">Ghost</span>Pay
        </h1>
        
        <p 
          ref={taglineRef}
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/90"
        >
          Decentralized group wallets with voting-based fund control.
          <span className="block mt-4 text-neon-purple font-semibold">
            Your funds, your rules, no intermediaries.
          </span>
        </p>
        
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-5 justify-center">
          <a 
            href="#cta" 
            className="ghost-button text-lg group relative overflow-hidden"
          >
            Launch App
            <span className="absolute -z-10 inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 group-hover:opacity-0 transition-opacity"></span>
          </a>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative w-6 h-12 border-2 border-neon-blue rounded-full p-1">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero