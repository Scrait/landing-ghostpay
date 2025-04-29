import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Roadmap from './components/Roadmap';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import GhostCanvas from './components/GhostCanvas';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      // Оптимизированный способ определения активной секции
      const sections = Array.from(document.querySelectorAll('section'));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const currentSection = sections.find(section => {
        const { top, bottom } = section.getBoundingClientRect();
        return top <= scrollPosition && bottom >= scrollPosition;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Добавляем троттлинг для оптимизации
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    
    // Инициализация при монтировании
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <GhostCanvas activeSection={activeSection} />
      
      <div className="relative z-10">
        <Header activeSection={activeSection} />
        <main>
          <Hero id="hero" />
          <HowItWorks id="how-it-works" />
          <Roadmap id="roadmap" />
          <Benefits id="benefits" />
          <FAQ id="faq" />
          <CTA id="cta" />
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Вспомогательная функция для троттлинга
function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
}

export default App;