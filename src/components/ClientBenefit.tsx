// src/components/ClientBenefit.tsx
'use client';

import React, { useEffect, useRef } from 'react';

interface ClientBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  glowClass: string;
  index: number;
}

const ClientBenefit: React.FC<ClientBenefitProps> = ({
  icon,
  title,
  description,
  colorClass,
  glowClass,
  index,
}) => {
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
      className={`glass-card p-6 hover:${glowClass} transition-all data-ghost-target duration-500 opacity-0 scale-95`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="font-orbitron text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

export default ClientBenefit;