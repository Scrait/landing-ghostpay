import React, { useEffect, useRef, useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-5');
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={itemRef}
      className="glass-card mb-4 transition-all duration-500 opacity-0 translate-y-5"
    >
      <button
        className="w-full p-5 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-orbitron font-medium text-lg">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 pt-0 text-white/80">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
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

  const faqs = [
    {
      question: "How does the voting system work?",
      answer: "Each wallet member is assigned voting power when the wallet is created. When a transaction is proposed, members cast votes to approve or reject. The transaction executes only when the approval threshold (customizable) is met."
    },
    {
      question: "What networks does GhostPay support?",
      answer: "GhostPay currently supports Ethereum, Polygon, Arbitrum, and Optimism. Additional EVM-compatible networks will be added based on community demand."
    },
    {
      question: "Is there a token for GhostPay?",
      answer: "We're currently focused on building a solid product. A governance token is planned for Q4 2024, which will enable community participation in protocol decisions."
    },
    {
      question: "Are the smart contracts audited?",
      answer: "Yes, all GhostPay smart contracts undergo rigorous security audits by leading blockchain security firms. Audit reports are publicly available on our GitHub repository."
    }
  ];

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-dark-bg/0 via-card-bg/50 to-dark-bg/0"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-orbitron font-bold mb-16 text-center transition-all duration-700 opacity-0 translate-y-10"
        >
          Frequently Asked <span className="text-neon-blue glow-text-blue">Questions</span>
        </h2>
        
        <div>
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;