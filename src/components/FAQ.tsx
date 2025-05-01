// src/components/FAQ.tsx
import ClientFAQItem from './ClientFAQItem';
import ClientTitle from './ClientTitle';

export default function FAQ() {
  const faqs = [
    {
      question: 'How does the voting system work?',
      answer:
        'Each wallet member is assigned voting power when the wallet is created. When a transaction is proposed, members cast votes to approve or reject. The transaction executes only when the approval threshold (customizable) is met.',
    },
    {
      question: 'What networks does GhostPay support?',
      answer:
        'GhostPay currently supports Ethereum, Polygon, Arbitrum, and Optimism. Additional EVM-compatible networks will be added based on community demand.',
    },
    {
      question: 'Is there a token for GhostPay?',
      answer:
        'We’re currently focused on building a solid product. A governance token is planned for Q4 2024, which will enable community participation in protocol decisions.',
    },
    {
      question: 'Are the smart contracts audited?',
      answer:
        'Yes, all GhostPay smart contracts undergo rigorous security audits by leading blockchain security firms. Audit reports are publicly available on our GitHub repository.',
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 relative bg-gradient-to-b from-dark-bg/0 via-card-bg/50 to-dark-bg/0"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <ClientTitle
          title="Frequently Asked"
          highlight="Questions"
          highlightClass="text-neon-blue glow-text-blue"
        />
        <div>
          {faqs.map((faq, index) => (
            <ClientFAQItem
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
}