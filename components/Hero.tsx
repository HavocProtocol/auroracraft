import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SERVER_IP } from '../constants';
import MinecraftButton from './MinecraftButton';
import Logo from './Logo';

interface HeroProps {
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowse }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Large Hero Logo */}
        <div className="mb-6 animate-float relative">
           <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 rounded-full"></div>
           <Logo className="w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
        </div>

        <h1 className="font-minecraft text-5xl md:text-7xl lg:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] leading-tight">
          AURORA <br/> <span className="text-mc-purple">CRAFT</span>
        </h1>
        
        <p className="font-console text-2xl md:text-3xl text-gray-300 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Explore the Cosmos in a Chill Minecraft SMP. Build, trade, and survive among the stars.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MinecraftButton 
            onClick={copyToClipboard} 
            className="group min-w-[250px]"
            variant="primary"
          >
             {copied ? (
               <span className="flex items-center text-green-400">
                 <Check className="mr-2 h-5 w-5" /> Copied!
               </span>
             ) : (
               <span className="flex items-center">
                 <Copy className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                 JOIN: {SERVER_IP}
               </span>
             )}
          </MinecraftButton>

          <MinecraftButton variant="gold" onClick={onBrowse}>
             Browse Store
          </MinecraftButton>
        </div>
      </div>

      {/* Decor planet - adjusted position */}
      <div className="absolute top-1/3 left-[5%] w-24 h-24 bg-blue-500 rounded-full blur-[50px] opacity-20 animate-pulse-slow pointer-events-none"></div>
    </section>
  );
};

export default Hero;