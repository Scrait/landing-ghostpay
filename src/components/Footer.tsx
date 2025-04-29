import React from 'react';
import { Ghost } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Ghost size={32} className="text-neon-blue" />
            <span className="font-orbitron text-xl font-bold text-white">
              Ghost<span className="text-neon-blue">Pay</span>
            </span>
          </div>
          
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-white/70 hover:text-neon-blue transition-colors flex items-center"
              aria-label="Telegram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M17.562,8.178c-0.182,1.889-0.977,6.464-1.38,8.581	c-0.17,0.911-0.504,1.215-0.826,1.244c-0.701,0.064-1.233-0.459-1.911-0.9c-1.062-0.689-1.662-1.119-2.693-1.788	c-1.188-0.771-0.417-1.195,0.259-1.888c0.177-0.181,3.262-2.994,3.32-3.249c0.007-0.032,0.015-0.15-0.056-0.212	c-0.071-0.062-0.177-0.041-0.253-0.024c-0.107,0.024-1.825,1.161-5.152,3.41c-0.488,0.335-0.93,0.498-1.325,0.491	c-0.436-0.008-1.274-0.247-1.896-0.449c-0.765-0.248-1.372-0.378-1.32-0.799c0.028-0.221,0.324-0.448,0.889-0.677	c3.486-1.516,5.809-2.515,6.969-2.997c3.317-1.387,4.008-1.628,4.457-1.636C17.316,7.207,17.658,7.5,17.562,8.178z"></path>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-white/70 hover:text-neon-purple transition-colors flex items-center"
              aria-label="X (Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-white/70 hover:text-neon-green transition-colors flex items-center"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; 2025 GhostPay. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;