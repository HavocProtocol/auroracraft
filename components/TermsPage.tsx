import React, { useEffect } from 'react';
import MinecraftButton from './MinecraftButton';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen relative z-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
         <h1 className="font-minecraft text-4xl md:text-6xl text-white mb-4 drop-shadow-md">Terms of Service</h1>
         <p className="font-console text-xl text-gray-400">Rules of engagement for transactions and gameplay.</p>
      </div>

      <div className="space-y-8 bg-[#202020]/90 border-2 border-white/20 p-8 rounded-lg backdrop-blur-sm">
        
        <section>
          <h2 className="font-minecraft text-xl text-red-400 mb-3">1. Acceptance of Terms</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            By joining the Aurora Craft server or purchasing from our store, you agree to these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-red-400 mb-3">2. Purchases & Refunds</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            <strong>All purchases are final.</strong> By purchasing a rank or item, you agree that:
            <br/>- You are over 18 or have parental permission.
            <br/>- You will not chargeback or dispute the payment. Doing so will result in a permanent ban.
            <br/>- We reserve the right to change rank perks or prices at any time without prior notice (though we try to keep things fair!).
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-red-400 mb-3">3. Server Conduct</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            Purchasing a rank does not grant immunity from server rules. If you break the rules (hacking, griefing, harassment), you may be banned, and no refund will be issued.
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-red-400 mb-3">4. Affiliation</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            Aurora Craft is not affiliated with Mojang AB, Microsoft, or Notch. Minecraft is a trademark of Mojang AB.
          </p>
        </section>

      </div>

      <div className="mt-12 text-center">
        <MinecraftButton onClick={onBack} variant="primary">
          I Agree & Return Home
        </MinecraftButton>
      </div>
    </div>
  );
};

export default TermsPage;