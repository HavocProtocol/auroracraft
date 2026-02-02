import React, { useState } from 'react';
import { Rank } from '../types';
import MinecraftButton from './MinecraftButton';

interface RankCardProps {
  rank: Rank;
  onAddToCart: (rank: Rank) => void;
  index?: number;
}

const RankCard: React.FC<RankCardProps> = ({ rank, onAddToCart, index = 0 }) => {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(rank);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const isFree = rank.price === 0;
  const isKey = rank.id.startsWith('key');
  const discount = rank.originalPrice ? Math.round(((rank.originalPrice - rank.price) / rank.originalPrice) * 100) : 0;

  // Visual variants based on price/tier/type
  // Adjusted thresholds for new EGP pricing structure
  const getColors = () => {
    if (isKey) return { tail: 'from-yellow-500', glow: 'shadow-yellow-500/20', border: 'border-yellow-500/40' };
    if (isFree) return { tail: 'from-green-500', glow: 'shadow-green-500/20', border: 'border-green-500/40' };
    // Adjusted thresholds: Overlord is 1500, Guardian is 1000, Nebula is 600
    if (rank.price >= 1500) return { tail: 'from-red-600', glow: 'shadow-red-600/30', border: 'border-red-500/40' }; // Overlord
    if (rank.price >= 1000) return { tail: 'from-emerald-500', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/40' }; // Guardian
    if (rank.price >= 600) return { tail: 'from-purple-600', glow: 'shadow-purple-600/30', border: 'border-purple-500/40' }; // Nebula
    return { tail: 'from-blue-600', glow: 'shadow-blue-600/20', border: 'border-blue-500/40' }; // Standard
  };

  const colors = getColors();

  return (
    <div 
      className="relative group w-full max-w-sm mx-auto"
      style={{ 
        animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
        opacity: 0 // Start hidden for animation
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute -top-4 -right-4 z-20 bg-red-600 text-white font-minecraft text-sm py-1 px-3 transform rotate-12 shadow-lg border-2 border-red-400">
          {discount}% OFF
        </div>
      )}

      {/* Comet Tail Container - rotated and positioned behind */}
      <div className="absolute inset-0 transform translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6">
        {/* Main Tail Gradient */}
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${colors.tail} to-transparent opacity-20 blur-2xl rounded-[2rem]`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' }} // Tapered shape
        />
        {/* Streak Particles */}
        <div className="absolute -top-10 -left-10 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      </div>

      {/* Main Card - The Comet Head */}
      <div 
        className={`
          relative z-10 
          bg-[#151515] bg-opacity-95 backdrop-blur-sm
          border-t-2 border-l-2 ${colors.border} border-r-0 border-b-0 border-white/5
          rounded-tl-[3rem] rounded-br-[2rem] rounded-tr-xl rounded-bl-xl
          p-6 flex flex-col h-full
          shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${colors.glow}
          transition-all duration-300 transform group-hover:-translate-y-2 group-hover:-translate-x-1
          overflow-hidden
        `}
      >
        {/* Glass Reflection Effect */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none" />

        {/* Head Glow */}
        <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br ${colors.tail} to-transparent opacity-20 blur-2xl rounded-full -translate-x-8 -translate-y-8`} />

        <div className="relative text-center mb-6">
          <div className="text-6xl mb-4 animate-float inline-block filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            {rank.icon}
          </div>
          
          <h3 className={`font-minecraft text-xl ${rank.color} mb-2 drop-shadow-md flex items-center justify-center min-h-[3rem] tracking-wide`}>
            {rank.name}
          </h3>
          
          <div className="relative inline-block flex flex-col items-center">
             {rank.originalPrice && (
               <span className="text-gray-500 text-lg font-console line-through decoration-red-500 decoration-2">
                 {rank.originalPrice} EGP
               </span>
             )}
             <div className={`font-console text-4xl font-bold ${isFree ? 'text-green-400' : 'text-white'} drop-shadow-lg`}>
              {isFree ? "FREE" : `${rank.price} EGP`}
            </div>
            {/* Price underline glow */}
            <div className={`h-1 w-full mt-1 rounded-full bg-gradient-to-r ${colors.tail} to-transparent opacity-50`} />
          </div>
        </div>

        <p className="text-gray-400 font-console text-lg text-center mb-8 min-h-[3rem] leading-snug px-2">
          {rank.description}
        </p>

        <div className="flex-1 mb-8 bg-black/20 rounded-xl p-4 border border-white/5">
          <ul className="space-y-3">
            {rank.features.map((feature, idx) => (
              <li key={idx} className="flex items-start font-console text-base text-gray-300">
                <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full ${isFree ? 'bg-green-500' : (isKey ? 'bg-yellow-500' : 'bg-blue-400')} shadow-[0_0_5px_currentColor] flex-shrink-0`}></span>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <MinecraftButton 
          variant={isFree ? "gold" : (added ? "primary" : "gold")}
          fullWidth 
          onClick={handleClick}
          className="shadow-lg relative overflow-hidden group/btn"
        >
          <span className="relative z-10">{added ? "Added!" : (isFree ? "Claim Rank" : "Add to Cart")}</span>
          {/* Button Hover Shine */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        </MinecraftButton>
      </div>
    </div>
  );
};

export default RankCard;