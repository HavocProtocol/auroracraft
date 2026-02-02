import React from 'react';
import { Rocket, Heart } from 'lucide-react';

interface FooterProps {
  onOpenRules: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenRules, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/5 rounded-full">
            <Rocket className="text-purple-500 w-6 h-6" />
          </div>
          <div>
            <h4 className="font-minecraft text-white">Aurora Craft</h4>
            <p className="font-console text-gray-500">Established 2024</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="flex gap-6 mb-4 font-minecraft text-xs text-gray-400">
            <button onClick={onOpenRules} className="hover:text-white transition-colors cursor-pointer">Rules</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">Terms</button>
          </div>
          <p className="font-console text-gray-600 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-900" /> for the community
          </p>
          <p className="font-console text-gray-700 text-sm mt-1">
            Not affiliated with Mojang AB.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
