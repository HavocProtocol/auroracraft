import React, { useState } from 'react';
import { Rank } from '../types';
import MinecraftButton from './MinecraftButton';
import { X, Check, Wallet, Smartphone, Banknote, CreditCard } from 'lucide-react';

interface ShopModalProps {
  isOpen: boolean;
  selectedRank: Rank | null;
  onClose: () => void;
}

type PaymentMethod = 'stc_pay' | 'instapay' | 'vodafone_cash' | 'telda';

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, selectedRank, onClose }) => {
  const [username, setUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stc_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'instruction' | 'success'>('select');

  if (!isOpen || !selectedRank) return null;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    // All methods are now manual transfers requiring instructions
    setStep('instruction');
  };

  const processPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const reset = () => {
    setStep('select');
    setIsProcessing(false);
    setUsername('');
    setPaymentMethod('stc_pay');
    onClose();
  };

  const getExchangeRate = (egp: number, method: PaymentMethod) => {
    if (method === 'stc_pay') {
      // 1 SAR ≈ 13.5 EGP (approx rate used for fallback logic here)
      const sarAmount = egp / 13.5;
      // Round to nearest tenth
      return `${(Math.round(sarAmount * 10) / 10).toFixed(1)} SAR`;
    }
    return `${egp} EGP`;
  };

  const getTargetNumber = (method: PaymentMethod) => {
    switch (method) {
      case 'stc_pay': return '055 368 0057';
      case 'instapay': return 'ghost_czrk@instapay';
      case 'telda': return '@czrk5320';
      case 'vodafone_cash': return '010 2549 2313';
      default: return '010 2549 2313';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={reset}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#202020] border-4 border-black/50 p-1 shadow-2xl animate-float">
        <div className="border-2 border-white/10 p-6 bg-[#181818]">
          
          <div className="flex justify-between items-start mb-6">
             <h2 className="font-minecraft text-2xl text-white">
               {step === 'success' ? 'Order Complete' : 'Checkout'}
             </h2>
             <button onClick={reset} className="text-gray-500 hover:text-white transition-colors">
               <X size={24} />
             </button>
          </div>

          {step === 'select' && (
            <form onSubmit={handlePurchase}>
              {/* Product Summary */}
              <div className="mb-6 flex items-center gap-4 bg-black/30 p-4 rounded border border-gray-700">
                <div className="text-4xl">{selectedRank.icon}</div>
                <div>
                  <h3 className={`font-minecraft text-lg ${selectedRank.color}`}>
                    {selectedRank.name}
                  </h3>
                  <p className="font-console text-xl text-yellow-400">
                    {selectedRank.price} EGP
                  </p>
                </div>
              </div>

              {/* Username Input */}
              <div className="mb-6">
                <label className="block font-minecraft text-xs text-gray-400 mb-2 uppercase">
                  Minecraft Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Steve"
                  className="w-full bg-black border-2 border-gray-600 p-3 font-console text-xl text-white focus:border-mc-green outline-none"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block font-minecraft text-xs text-gray-400 mb-2 uppercase">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('stc_pay')}
                        className={`p-3 border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'stc_pay' ? 'bg-[#4f008c]/40 border-[#4f008c] text-white' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                    >
                        <Wallet size={20} className={paymentMethod === 'stc_pay' ? 'text-[#b679f2]' : ''} />
                        <span className="font-console text-sm">STC Pay</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('instapay')}
                        className={`p-3 border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'instapay' ? 'bg-purple-900/40 border-purple-500 text-white' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                    >
                        <Banknote size={20} />
                        <span className="font-console text-sm">Instapay</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('vodafone_cash')}
                        className={`p-3 border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'vodafone_cash' ? 'bg-red-900/40 border-red-500 text-white' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                    >
                        <Smartphone size={20} />
                        <span className="font-console text-sm">V. Cash</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('telda')}
                        className={`p-3 border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'telda' ? 'bg-blue-900/40 border-blue-500 text-white' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                    >
                        <CreditCard size={20} />
                        <span className="font-console text-sm">Telda</span>
                    </button>
                </div>
              </div>

              <div className="mb-4 text-xs text-gray-500 font-console">
                * By purchasing you agree to our terms of service.
              </div>

              <MinecraftButton 
                type="submit" 
                variant="primary" 
                fullWidth 
                disabled={isProcessing}
                className={isProcessing ? 'opacity-75 cursor-not-allowed' : ''}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </MinecraftButton>
            </form>
          )}

          {step === 'instruction' && (
            <div className="animate-fade-in">
                <div className="mb-6 bg-black/30 p-4 rounded border border-gray-700">
                    <h3 className="font-minecraft text-lg text-white mb-2 text-center">
                        Manual Transfer
                    </h3>
                    <p className="font-console text-gray-400 text-center mb-4">
                        Please transfer the exact amount to the account below.
                    </p>
                    
                    <div className="bg-[#111] p-4 rounded border border-white/10 mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400 font-console">Method:</span>
                            <span className="text-white font-minecraft text-sm capitalize">
                                {paymentMethod.replace('_', ' ')}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400 font-console">Amount:</span>
                            <span className="text-green-400 font-console text-xl">
                                {getExchangeRate(selectedRank.price, paymentMethod)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-console">Target:</span>
                            <code className="bg-black px-2 py-1 rounded text-yellow-400 font-mono select-all">
                                {getTargetNumber(paymentMethod)}
                            </code>
                        </div>
                        {paymentMethod === 'stc_pay' && (
                          <div className="text-right text-[10px] text-gray-500 font-console mt-2">
                             Rate: 1 SAR ≈ 13.5 EGP
                          </div>
                        )}
                    </div>

                    <p className="font-console text-xs text-gray-500 text-center">
                        After transferring, click "Confirm Transfer" below. The rank will be applied once an admin verifies the transaction (approx. 1-2 hours).
                    </p>
                </div>

                <div className="flex gap-3">
                    <MinecraftButton 
                        type="button" 
                        variant="secondary" 
                        onClick={() => setStep('select')}
                        fullWidth
                    >
                        Back
                    </MinecraftButton>
                    <MinecraftButton 
                        type="button" 
                        variant="gold" 
                        fullWidth 
                        onClick={processPayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Verifying...' : 'Confirm Transfer'}
                    </MinecraftButton>
                </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="text-white w-8 h-8" strokeWidth={4} />
              </div>
              <h3 className="font-minecraft text-xl text-green-400 mb-2">Success!</h3>
              <p className="font-console text-lg text-gray-300 mb-6">
                Transaction submitted for review.<br/>
                Please keep your receipt!
              </p>
              <MinecraftButton variant="primary" onClick={reset} fullWidth>
                Close
              </MinecraftButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopModal;