// src/components/Benefits.tsx
import { ShieldCheck, Zap, Lock, UserX } from 'lucide-react';
import ClientBenefit from './ClientBenefit';
import ClientTitle from './ClientTitle';

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 relative">
      <div className="container mx-auto px-4">
        <ClientTitle title="Why Choose"
          highlight="GhostPay"
          highlightClass="text-neon-green glow-text-green" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ClientBenefit
            icon={<ShieldCheck size={28} className="text-neon-blue animate-pulse-glow" />}
            title="Trustless"
            description="No need to trust any third party. All operations are executed through audited, verifiable smart contracts."
            colorClass="bg-neon-blue/20"
            glowClass="glow-border-blue"
            index={0}
          />
          <ClientBenefit
            icon={<UserX size={28} className="text-neon-purple animate-pulse-glow" />}
            title="Anonymous"
            description="Maintain your privacy with pseudonymous wallet addresses. Your identity remains your own."
            colorClass="bg-neon-purple/20"
            glowClass="glow-border-purple"
            index={1}
          />
          <ClientBenefit
            icon={<Lock size={28} className="text-neon-green animate-pulse-glow" />}
            title="Secure"
            description="Military-grade cryptography and extensively audited smart contracts protect your funds."
            colorClass="bg-neon-green/20"
            glowClass="glow-border-green"
            index={2}
          />
          <ClientBenefit
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
}