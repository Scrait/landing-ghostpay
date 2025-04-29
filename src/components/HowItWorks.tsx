import React, { useEffect, useRef } from 'react';
import { User, Wallet, Vote } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  borderColorClass: string;
  index: number;
}

const Step: React.FC<StepProps> = ({ icon, title, description, colorClass, borderColorClass, index }) => {
  const stepRef = useRef<HTMLDivElement>(null);

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

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={stepRef} 
      className={`glass-card p-8 ${borderColorClass} transition-all duration-700 opacity-0 translate-y-10`}
    >
      <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="font-orbitron text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
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
      id="how-it-works"
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-orbitron font-bold mb-16 text-center transition-all duration-700 opacity-0 translate-y-10"
        >
          How <span className="text-neon-blue glow-text-blue">GhostPay</span> Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Step connectors (visible on larger screens) */}
          <div className="hidden md:block absolute top-28 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
          <div className="hidden md:block absolute top-28 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-neon-purple to-neon-green"></div>

          <Step 
            icon={<Wallet size={32} className="text-neon-blue" />}
            title="Create Wallet"
            description="Create a decentralized group wallet in seconds. Add participants with custom access rights and voting power."
            colorClass="bg-neon-blue/20"
            borderColorClass="border-l-4 border-neon-blue"
            index={0}
          />
          
          <Step 
            icon={<User size={32} className="text-neon-purple" />}
            title="Deposit Funds"
            description="Transfer crypto assets into your GhostPay wallet. All deposits are transparent and verified on-chain."
            colorClass="bg-neon-purple/20"
            borderColorClass="border-l-4 border-neon-purple"
            index={1}
          />
          
          <Step 
            icon={<Vote size={32} className="text-neon-green" />}
            title="Vote to Unlock"
            description="Propose transactions and vote on fund allocations. Funds are released only when the required approval threshold is met."
            colorClass="bg-neon-green/20"
            borderColorClass="border-l-4 border-neon-green"
            index={2}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;