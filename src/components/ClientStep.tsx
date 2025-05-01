// src/components/ClientStep.tsx
'use client';

import { useEffect, useRef } from 'react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  borderColorClass: string;
  index: number;
}

export default function ClientStep({
  icon,
  title,
  description,
  colorClass,
  borderColorClass,
  index,
}: StepProps) {
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
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 ${colorClass}`}
      >
        {icon}
      </div>
      <h3 className="font-orbitron text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}