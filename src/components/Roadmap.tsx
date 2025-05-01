'use client';

import React, { useEffect, useRef } from 'react';

interface MilestoneProps {
  quarter: string;
  title: string;
  description: string;
  isActive?: boolean;
  isCompleted?: boolean;
  index: number;
}

const Milestone: React.FC<MilestoneProps> = ({ 
  quarter, 
  title, 
  description, 
  isActive = false, 
  isCompleted = false,
  index
}) => {
  const milestoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (milestoneRef.current) {
      observer.observe(milestoneRef.current);
    }

    return () => {
      if (milestoneRef.current) {
        observer.unobserve(milestoneRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={milestoneRef}
      className={`glass-card p-6 relative transition-all duration-700 opacity-0 translate-y-10 ${
        isActive ? 'border border-neon-blue glow-border-blue' : 
        isCompleted ? 'border border-neon-green' : 'border border-white/10'
      }`}
    >
      <div 
        className={`absolute -left-3 top-6 w-6 h-6 rounded-full flex items-center justify-center ${
          isCompleted ? 'bg-neon-green' : isActive ? 'bg-neon-blue' : 'bg-white/20'
        }`}
      >
        {isCompleted && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-black" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
      </div>
      
      <span className={`font-orbitron text-sm font-bold mb-2 inline-block ${
        isActive ? 'text-neon-blue' : isCompleted ? 'text-neon-green' : 'text-white/50'
      }`}>
        {quarter}
      </span>
      
      <h3 className="font-orbitron text-xl font-bold mb-3">{title}</h3>
      
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="roadmap" 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-dark-bg/0 via-card-bg/50 to-dark-bg/0"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-orbitron font-bold mb-16 text-center transition-all duration-700 opacity-0 translate-y-10"
        >
          Development <span className="text-neon-purple glow-text-purple">Roadmap</span>
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green ml-3 md:ml-4 -mt-2 h-full">
            <div className="absolute left-1/2 top-0 w-4 h-4 rounded-full bg-neon-blue -ml-2 -mt-2 glow-border-blue"></div>
            <div className="absolute left-1/2 bottom-0 w-4 h-4 rounded-full bg-neon-green -ml-2 -mb-2 glow-border-green"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-12 md:pl-16">
            <Milestone 
              quarter="Q4 2023" 
              title="Research & Design"
              description="Market research, competitive analysis, and initial UX/UI designs. Core smart contract architecture planning."
              isCompleted={true}
              index={0}
            />
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:block"></div>
            
            <Milestone 
              quarter="Q1 2024" 
              title="MVP Development"
              description="Smart contract development for group wallet creation, fund deposits, and voting mechanisms. Security audits start."
              isCompleted={true}
              index={1}
            />
            
            <Milestone 
              quarter="Q2 2024" 
              title="Testnet Launch"
              description="Beta release on multiple EVM testnets. User testing and feedback collection. Security audits completed."
              isActive={true}
              index={2}
            />
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:block"></div>
            
            <Milestone 
              quarter="Q3 2024" 
              title="Mainnet Launch"
              description="Official launch on Ethereum, Polygon, and other major EVM chains. Initial liquidity partnerships."
              index={3}
            />
            
            <Milestone 
              quarter="Q4 2024" 
              title="Governance Launch"
              description="Introduction of decentralized governance for protocol parameters. Expansion to additional blockchains."
              index={4}
            />
            
            <div className="hidden md:block"></div>
            
            <div className="hidden md:block"></div>
            
            <Milestone 
              quarter="Q1 2025" 
              title="Advanced Features"
              description="Multi-signature wallet integration, advanced voting conditions, and automated treasury management."
              index={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;