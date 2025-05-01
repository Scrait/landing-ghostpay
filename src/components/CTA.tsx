// src/components/CTA.tsx
import ClientCTAContent from './ClientCTAContent';

export default function CTA() {
  return (
    <section id="cta" className="py-20 relative">
      <div className="container mx-auto px-4">
        <ClientCTAContent />
      </div>
    </section>
  );
}