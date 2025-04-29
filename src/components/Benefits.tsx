import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Lock, UserX } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  glowClass: string;
  index: number;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description, colorClass, glowClass, index }) => {
  const benefitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'scale-100');
              entry.target.classList.remove('opacity-0', 'scale-95');
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (benefitRef.current) {
      observer.observe(benefitRef.current);
    }

    return () => {
      if (benefitRef.current) {
        observer.unobserve(benefitRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={benefitRef}
      className={`glass-card p-6 hover:${glowClass} transition-all duration-500 opacity-0 scale-95`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${colorClass}`}>
        {icon}
      </div>
      
      <h3 className="font-orbitron text-xl font-bold mb-3">{title}</h3>
      
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

const Benefits: React.FC = () => {
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
      id="benefits" 
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-orbitron font-bold mb-16 text-center transition-all duration-700 opacity-0 translate-y-10"
        >
          Why Choose <span className="text-neon-green glow-text-green">GhostPay</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Benefit 
            icon={<ShieldCheck size={28} className="text-neon-blue animate-pulse-glow" />}
            title="Trustless"
            description="No need to trust any third party. All operations are executed through audited, verifiable smart contracts."
            colorClass="bg-neon-blue/20"
            glowClass="glow-border-blue"
            index={0}
          />
          
          <Benefit 
            icon={<UserX size={28} className="text-neon-purple animate-pulse-glow" />}
            title="Anonymous"
            description="Maintain your privacy with pseudonymous wallet addresses. Your identity remains your own."
            colorClass="bg-neon-purple/20"
            glowClass="glow-border-purple"
            index={1}
          />
          
          <Benefit 
            icon={<Lock size={28} className="text-neon-green animate-pulse-glow" />}
            title="Secure"
            description="Military-grade cryptography and extensively audited smart contracts protect your funds."
            colorClass="bg-neon-green/20"
            glowClass="glow-border-green"
            index={2}
          />
          
          <Benefit 
            icon={<Zap size={28} className="text-neon-blue animate-pulse-glow" />}
            title="Fast"
            description="Quick transaction processing and voting resolution. Use blockchain networks optimized for speed."
            colorClass="bg-neon-blue/20"
            glowClass="glow-border-blue"
            index={3}
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;