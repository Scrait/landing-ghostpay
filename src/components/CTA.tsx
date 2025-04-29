import React, { useEffect, useRef } from 'react';
import { Ghost } from 'lucide-react';

const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            entry.target.classList.remove('opacity-0', 'scale-95');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="cta" 
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <div 
          ref={contentRef}
          className="glass-card p-10 md:p-16 relative overflow-hidden max-w-5xl mx-auto transition-all duration-700 opacity-0 scale-95"
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-green/20 opacity-50"
            style={{
              background: 'linear-gradient(-45deg, rgba(0,255,255,0.2), rgba(138,43,226,0.2), rgba(0,255,127,0.2))',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
            }}
          />
          
          <div className="relative z-10 text-center">
            <div className="inline-block mb-6">
              <Ghost size={48} className="text-neon-purple animate-pulse-glow mx-auto" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6">
              Start Your Ghost Wallet <span className="text-neon-purple glow-text-purple">Today</span>
            </h2>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
              Take control of your group finances with secure, transparent, and democratic fund management. No intermediaries, no trust issues.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a 
                href="#" 
                className="ghost-button text-lg group font-bold px-10 py-4"
              >
                Launch App
              </a>
              
              <a 
                href="https://github.com/ghostpay" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center font-orbitron border border-white/30 text-white px-10 py-4 rounded-lg hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;