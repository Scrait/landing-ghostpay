// src/components/ClientTitle.tsx
'use client';

import { useEffect, useRef } from 'react';

interface ClientTitleProps {
  title: string;
  highlight: string;
  highlightClass: string;
}

export default function ClientTitle({ title, highlight, highlightClass }: ClientTitleProps) {
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
    <h2
      ref={titleRef}
      className="text-3xl md:text-4xl font-orbitron font-bold mb-16 text-center transition-all duration-700 opacity-0 translate-y-10"
    >
      {title} <span className={highlightClass}>{highlight}</span>
    </h2>
  );
}