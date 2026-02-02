import React, { useEffect } from 'react';
import MinecraftButton from './MinecraftButton';

interface RulesPageProps {
  onBack: () => void;
}

const RulesPage: React.FC<RulesPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rules = [
    { title: "Respect Everyone", description: "Be kind and respectful to all players and staff. Harassment, hate speech, and toxicity are not tolerated." },
    { title: "No Griefing", description: "Do not destroy other players' builds or steal their items. Claim your land to protect it, but respect unclaimed builds too." },
    { title: "No Hacking/Cheating", description: "Use of hacked clients, x-ray texture packs, or any unfair advantages is strictly prohibited and will result in a ban." },
    { title: "No Spamming", description: "Keep the chat clean. Do not spam messages, commands, or advertise other servers." },
    { title: "PvP Guidelines", description: "PvP is only allowed in designated arenas or if both parties agree. Spawn killing is forbidden." },
    { title: "Staff Discretion", description: "Staff members have the final say in all disputes. If you believe a punishment was unfair, open a ticket on Discord." }
  ];

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen relative z-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
         <h1 className="font-minecraft text-4xl md:text-6xl text-white mb-4 drop-shadow-md">Server Rules</h1>
         <p className="font-console text-xl text-gray-400">Follow these protocols to avoid being jettisoned into the void.</p>
      </div>

      <div className="space-y-6 mb-12">
        {rules.map((rule, index) => (
          <div key={index} className="bg-[#202020]/90 border-2 border-white/20 p-6 rounded-lg backdrop-blur-sm hover:border-purple-500 transition-colors duration-300">
            <h3 className="font-minecraft text-xl text-yellow-400 mb-2 flex items-center">
              <span className="bg-white/10 w-8 h-8 rounded flex items-center justify-center mr-3 text-sm text-white">{index + 1}</span>
              {rule.title}
            </h3>
            <p className="font-console text-lg text-gray-300 ml-11">
              {rule.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <MinecraftButton onClick={onBack} variant="primary">
          Accept & Return Home
        </MinecraftButton>
      </div>
    </div>
  );
};

export default RulesPage;