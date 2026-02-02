import React, { useEffect } from 'react';
import { Trash2, ArrowRight, ChevronLeft } from 'lucide-react';
import { Rank } from '../types';
import MinecraftButton from './MinecraftButton';

interface CartPageProps {
  cart: Rank[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
  onBack: () => void;
  onBrowse: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemove, onCheckout, onBack, onBrowse }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen relative z-10 max-w-4xl mx-auto">
      <button 
        onClick={onBack} 
        className="mb-6 text-gray-500 hover:text-white font-minecraft text-sm flex items-center gap-2 transition-colors"
      >
        <ChevronLeft size={16} /> Back to Base
      </button>

      <h1 className="font-minecraft text-4xl md:text-5xl text-white mb-8 drop-shadow-md text-center">
        Cargo Hold <span className="text-gray-400">({cart.length})</span>
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-[#202020]/90 border-2 border-white/20 rounded-lg flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🕸️</div>
          <p className="font-console text-2xl text-gray-400 mb-8">Your cargo hold is empty.</p>
          <MinecraftButton onClick={onBrowse} variant="primary">
            Browse Store
          </MinecraftButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="bg-[#202020]/90 border border-white/10 p-4 rounded flex items-center gap-4 animate-fade-in">
                <div className="text-3xl bg-black/50 p-3 rounded border border-white/5">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-minecraft text-sm ${item.color}`}>{item.name}</h3>
                  <p className="font-console text-gray-400">{item.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-console text-xl text-yellow-400">{item.price} EGP</span>
                  <button 
                    onClick={() => onRemove(index)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-[#1a1a1a] border-2 border-yellow-600/50 p-6 sticky top-28 rounded">
              <h3 className="font-minecraft text-xl text-yellow-500 mb-6 border-b border-white/10 pb-4">
                Summary
              </h3>
              
              <div className="space-y-3 font-console text-lg text-gray-300 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{total} EGP</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Space Tax</span>
                  <span>0 EGP</span>
                </div>
                <div className="flex justify-between text-white text-xl border-t border-white/10 pt-3 mt-3">
                  <span>Total</span>
                  <span className="text-green-400">{total} EGP</span>
                </div>
              </div>

              <MinecraftButton 
                onClick={onCheckout} 
                variant="gold" 
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight size={18} />
              </MinecraftButton>

              <button 
                onClick={onBrowse}
                className="w-full text-center mt-4 font-minecraft text-xs text-gray-500 hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;