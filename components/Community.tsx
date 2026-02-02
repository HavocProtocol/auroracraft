import React from 'react';
import { DISCORD_LINK } from '../constants';
import MinecraftButton from './MinecraftButton';
import { Book, Sparkles } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <section id="community" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-minecraft text-3xl md:text-5xl mb-12 text-white drop-shadow-md">
          Join the <span className="text-indigo-400">Community</span>
        </h2>

        {/* Outer glow container */}
        <div className="bg-gradient-to-br from-[#5865F2] to-[#404EED] rounded-xl p-1 inline-block transform hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(88,101,242,0.4)]">
           {/* Inner Card - Darker for contrast */}
           <div className="bg-[#202225] border-4 border-[#404EED]/30 p-8 md:p-12 rounded-lg relative overflow-hidden">
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#5865F2 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              <div className="relative z-10 flex flex-col items-center">
                {/* Enchanted Book Icon */}
                <div className="relative mb-8 group">
                   {/* Glow effect behind the book */}
                   <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   
                   <Book 
                     className="w-24 h-24 text-[#D9A0FF] drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] transform -rotate-12" 
                     strokeWidth={1.5} 
                     fill="rgba(147, 51, 234, 0.2)"
                   />
                   
                   {/* Enchantment particles */}
                   <Sparkles 
                     className="absolute -top-6 -right-6 w-12 h-12 text-[#FFFFA0] animate-pulse drop-shadow-[0_0_10px_rgba(255,255,160,0.8)]" 
                   />
                   <Sparkles 
                     className="absolute bottom-0 -left-4 w-6 h-6 text-[#FFFFA0] animate-pulse delay-75" 
                   />
                </div>
                
                <h3 className="font-minecraft text-2xl text-white mb-4">
                  Discord Server
                </h3>
                
                <p className="font-console text-xl text-gray-300 mb-8 max-w-lg mx-auto">
                  Chat with other astronauts, get support, voice chat, and see upcoming events!
                </p>

                <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                  <MinecraftButton variant="gold" className="text-black font-bold">
                    Join Server
                  </MinecraftButton>
                </a>
              </div>
           </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
           <div className="bg-black/40 border border-white/10 p-6 rounded hover:bg-black/60 transition-colors">
              <h4 className="font-minecraft text-green-400 mb-2">Events</h4>
              <p className="font-console text-gray-400">Weekly build battles and parkour races with exclusive prizes.</p>
           </div>
           <div className="bg-black/40 border border-white/10 p-6 rounded hover:bg-black/60 transition-colors">
              <h4 className="font-minecraft text-yellow-400 mb-2">Support</h4>
              <p className="font-console text-gray-400">24/7 staff support ticket system to help you with any issues.</p>
           </div>
           <div className="bg-black/40 border border-white/10 p-6 rounded hover:bg-black/60 transition-colors">
              <h4 className="font-minecraft text-red-400 mb-2">Updates</h4>
              <p className="font-console text-gray-400">Stay informed about server maintenance and new feature drops.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Community;