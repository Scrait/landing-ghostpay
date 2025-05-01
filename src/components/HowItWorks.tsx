// src/components/HowItWorks.tsx
import { Wallet, User, Vote } from 'lucide-react';
import ClientStep from './ClientStep';
import ClientTitle from './ClientTitle';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <ClientTitle
          title="How"
          highlight="GhostPay Works"
          highlightClass="text-neon-blue glow-text-blue"
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Step connectors (visible on larger screens) */}
          <div className="hidden md:block absolute top-28 left-0/3 w-2/3 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
          <div className="hidden md:block absolute top-28 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-neon-purple to-neon-green"></div>

          <ClientStep
            icon={<Wallet size={32} className="text-neon-blue" />}
            title="Create Wallet"
            description="Create a decentralized group wallet in seconds. Add participants with custom access rights and voting power."
            colorClass="bg-neon-blue/20"
            borderColorClass="border-l-4 border-neon-blue"
            index={0}
          />

          <ClientStep
            icon={<User size={32} className="text-neon-purple" />}
            title="Deposit Funds"
            description="Transfer crypto assets into your GhostPay wallet. All deposits are transparent and verified on-chain."
            colorClass="bg-neon-purple/20"
            borderColorClass="border-l-4 border-neon-purple"
            index={1}
          />

          <ClientStep
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
}