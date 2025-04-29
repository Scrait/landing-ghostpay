import React, { useState, useEffect } from 'react';
import { Ghost } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-card-bg backdrop-blur-lg shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <Ghost size={32} className="text-neon-blue animate-pulse-glow" />
            <span className="font-orbitron text-xl font-bold text-white">
              Ghost<span className="text-neon-blue">Pay</span>
            </span>
          </a>

          <a 
            href="#cta" 
            className="ghost-button text-sm px-6 py-2"
          >
            Launch App
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header