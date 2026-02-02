import React, { useEffect } from 'react';
import MinecraftButton from './MinecraftButton';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen relative z-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
         <h1 className="font-minecraft text-4xl md:text-6xl text-white mb-4 drop-shadow-md">Privacy Policy</h1>
         <p className="font-console text-xl text-gray-400">How we handle your data in the cosmos.</p>
      </div>

      <div className="space-y-8 bg-[#202020]/90 border-2 border-white/20 p-8 rounded-lg backdrop-blur-sm">
        
        <section>
          <h2 className="font-minecraft text-xl text-mc-aqua mb-3">1. Information We Collect</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            When you play on Aurora Craft or use our store, we may collect the following information:
            <br/>- Your Minecraft Username and UUID.
            <br/>- IP Address (for security and moderation purposes).
            <br/>- Chat logs and in-game activity history.
            <br/>- Transaction details if you make a purchase (handled securely via third-party processors).
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-mc-aqua mb-3">2. How We Use Information</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            We use this data to:
            <br/>- Maintain the security and integrity of the server.
            <br/>- Enforce server rules and bans.
            <br/>- Process rank purchases and deliver in-game rewards.
            <br/>- Improve server performance and gameplay features.
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-mc-aqua mb-3">3. Third-Party Services</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            We use third-party payment processors (PayPal/Stripe) for our store. We do not store your credit card information on our servers. Please review their privacy policies for more details on how they handle your financial data.
          </p>
        </section>

        <section>
          <h2 className="font-minecraft text-xl text-mc-aqua mb-3">4. Data Security</h2>
          <p className="font-console text-lg text-gray-300 leading-relaxed">
            We implement standard security measures to protect your data. However, no transmission over the internet is completely secure.
          </p>
        </section>

      </div>

      <div className="mt-12 text-center">
        <MinecraftButton onClick={onBack} variant="primary">
          Return to Mission Control
        </MinecraftButton>
      </div>
    </div>
  );
};

export default PrivacyPage;