import React, { useState, useEffect } from 'react';
import { Rank } from '../types';
import MinecraftButton from './MinecraftButton';
import { Wallet, Smartphone, Banknote, Upload, AlertCircle, Loader2, CreditCard, MessageSquare, Gift, RefreshCw } from 'lucide-react';
import { DISCORD_WEBHOOK_URL } from '../constants';

interface CheckoutPageProps {
  cart: Rank[];
  onSuccess: () => void;
  onBack: () => void;
}

type PaymentMethod = 'stc_pay' | 'instapay' | 'vodafone_cash' | 'telda';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stc_pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Default to approx NBE rate (13.5) if fetch fails, but try to update dynamically
  const [exchangeRate, setExchangeRate] = useState(13.5);
  const [isRateLive, setIsRateLive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch live exchange rate (SAR Base)
    const fetchRate = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/SAR');
        const data = await res.json();
        if (data && data.rates && data.rates.EGP) {
          setExchangeRate(data.rates.EGP);
          setIsRateLive(true);
        }
      } catch (e) {
        console.warn('Failed to fetch live exchange rate, using fallback NBE approx.');
      }
    };

    fetchRate();
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const isFreeOrder = total === 0;

  const getConvertedAmount = (egp: number) => {
    if (egp === 0) return "FREE";
    if (paymentMethod === 'stc_pay') {
      // Logic: SAR Amount = EGP Amount / (EGP per SAR)
      const sarAmount = egp / exchangeRate;
      // Round to nearest tenth (e.g. 10.4)
      return `${(Math.round(sarAmount * 10) / 10).toFixed(1)} SAR`;
    }
    // For all other methods, just return EGP
    return `${egp} EGP`;
  };

  const getTargetLabel = () => {
    switch(paymentMethod) {
      case 'stc_pay': return 'STC Pay Number';
      case 'instapay': return 'Instapay Address';
      case 'telda': return 'Telda Handle';
      default: return 'Wallet Number';
    }
  };

  const getTargetValue = () => {
    switch(paymentMethod) {
      case 'stc_pay': return '055 368 0057';
      case 'instapay': return 'ghost_czrk@instapay';
      case 'telda': return '@czrk5320';
      case 'vodafone_cash': return '010 2549 2313';
      default: return '010 2549 2313';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username) {
      setError("Please enter your Minecraft username.");
      return;
    }

    if (!discordUsername) {
      setError("Please enter your Discord username.");
      return;
    }

    if (!isFreeOrder && !screenshot) {
      setError("Please upload a screenshot of your transaction proof.");
      return;
    }

    setIsProcessing(true);

    try {
        if (!DISCORD_WEBHOOK_URL) {
            console.warn("Discord Webhook URL is missing in constants.ts");
            await new Promise(resolve => setTimeout(resolve, 2000));
            onSuccess();
            return;
        }

        const formData = new FormData();
        
        let imageUrl = null;
        if (screenshot) {
          formData.append('file', screenshot);
          imageUrl = "attachment://" + screenshot.name;
        } else {
          imageUrl = "https://cdn-icons-png.flaticon.com/512/5720/5720434.png"; // Generic "Free" or "Gift" icon
        }

        const embedFields = [
            {
                name: "👤 IGN",
                value: `\`${username}\``,
                inline: true
            },
            {
                name: "💬 Discord",
                value: `\`${discordUsername}\``,
                inline: true
            },
            {
                name: "💳 Method",
                value: isFreeOrder ? "FREE CLAIM" : paymentMethod.replace('_', ' ').toUpperCase(),
                inline: true
            },
            {
                name: "💰 Total EGP",
                value: isFreeOrder ? "0 EGP" : `${total} EGP`,
                inline: true
            }
        ];

        if (!isFreeOrder) {
          embedFields.push({
             name: "💱 Transfer Amount",
             value: getConvertedAmount(total),
             inline: true
          });
          
          if (paymentMethod === 'stc_pay') {
            embedFields.push({
              name: "📈 Rate Applied",
              value: `1 SAR ≈ ${exchangeRate.toFixed(2)} EGP`,
              inline: true
            });
          }
        }

        embedFields.push({
             name: "📦 Cart Items",
             value: cart.map(i => `• ${i.name}`).join('\n') || "No items",
             inline: false
        });

        const payload = {
            username: "Aurora Store Bot",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png", 
            embeds: [
                {
                    title: isFreeOrder ? "🎁 New Free Rank Claim" : "🛒 New Transaction Submission",
                    description: isFreeOrder ? "A player has claimed a free package." : "A verified player has submitted a purchase receipt.",
                    color: isFreeOrder ? 5566367 : 16766720, // Green for free, Gold for paid
                    fields: embedFields,
                    image: {
                        url: imageUrl
                    },
                    footer: {
                        text: isFreeOrder ? "Aurora Craft | Free Claim" : "Aurora Craft | Guest Purchase",
                        icon_url: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        formData.append('payload_json', JSON.stringify(payload));

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Discord API Error: ${response.statusText}`);
        }

        setIsProcessing(false);
        onSuccess();

    } catch (err) {
      console.error(err);
      setError("Failed to send transaction. Please check your connection or contact an admin on Discord.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen relative z-10 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
         <button onClick={onBack} className="text-gray-500 hover:text-white font-minecraft text-sm">&lt; Back</button>
         <h1 className="font-minecraft text-3xl text-white">Checkout</h1>
      </div>

      <div className="bg-[#202020]/90 border-2 border-white/10 p-6 md:p-8 rounded-lg backdrop-blur-sm">
        <form onSubmit={handlePayment}>
          {/* User Info */}
          <div className="mb-8">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-minecraft text-xl text-mc-gold">1. Player Info</h2>
             </div>
             
             <div className="bg-black/40 p-4 rounded border border-white/5 space-y-4">
                <div>
                    <label className="block font-minecraft text-xs text-gray-400 mb-2 uppercase">Minecraft Username *</label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Notch"
                      className="w-full bg-[#111] border-2 border-gray-700 p-3 font-console text-xl text-white focus:border-mc-green outline-none rounded"
                    />
                </div>
                <div>
                    <label className="block font-minecraft text-xs text-gray-400 mb-2 uppercase">Discord Username *</label>
                    <div className="relative">
                        <input
                        type="text"
                        required
                        value={discordUsername}
                        onChange={(e) => setDiscordUsername(e.target.value)}
                        placeholder="e.g. SpaceCadet#1234"
                        className="w-full bg-[#111] border-2 border-gray-700 p-3 font-console text-xl text-white focus:border-mc-purple outline-none rounded"
                        />
                        <MessageSquare className="absolute right-3 top-3.5 text-gray-600 w-5 h-5" />
                    </div>
                </div>
             </div>
          </div>

          {!isFreeOrder && (
            <div className="mb-8">
              <h2 className="font-minecraft text-xl text-mc-gold mb-4">2. Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <button
                      type="button"
                      onClick={() => setPaymentMethod('stc_pay')}
                      className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all rounded ${paymentMethod === 'stc_pay' ? 'bg-[#4f008c]/40 border-[#4f008c] text-white ring-2 ring-[#4f008c]/50' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                  >
                      <Wallet size={24} className={paymentMethod === 'stc_pay' ? 'text-[#b679f2]' : ''} />
                      <span className="font-console text-sm">STC Pay</span>
                  </button>
                  <button
                      type="button"
                      onClick={() => setPaymentMethod('instapay')}
                      className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all rounded ${paymentMethod === 'instapay' ? 'bg-purple-900/40 border-purple-500 text-white ring-2 ring-purple-500/50' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                  >
                      <Banknote size={24} />
                      <span className="font-console text-sm">Instapay</span>
                  </button>
                  <button
                      type="button"
                      onClick={() => setPaymentMethod('vodafone_cash')}
                      className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all rounded ${paymentMethod === 'vodafone_cash' ? 'bg-red-900/40 border-red-500 text-white ring-2 ring-red-500/50' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                  >
                      <Smartphone size={24} />
                      <span className="font-console text-sm">V. Cash</span>
                  </button>
                  <button
                      type="button"
                      onClick={() => setPaymentMethod('telda')}
                      className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all rounded ${paymentMethod === 'telda' ? 'bg-blue-900/40 border-blue-500 text-white ring-2 ring-blue-500/50' : 'bg-black/40 border-gray-700 text-gray-400 hover:bg-white/5'}`}
                  >
                      <CreditCard size={24} />
                      <span className="font-console text-sm">Telda</span>
                  </button>
              </div>

              {/* Dynamic Content based on Selection */}
              <div className="bg-[#151515] p-6 rounded border border-white/10">
                  <div className="space-y-4">
                      <div className="bg-[#0a0a0a] p-4 border border-yellow-500/30 rounded relative">
                          <h3 className="font-minecraft text-yellow-500 text-sm mb-2 uppercase">Transfer Instructions</h3>
                          <div className="flex justify-between items-center mb-2 font-console text-gray-300">
                            <span>Amount to Send:</span>
                            <span className="text-xl text-white">{getConvertedAmount(total)}</span>
                          </div>
                          <div className="flex justify-between items-center font-console text-gray-300 mb-2">
                            <span>Send to ({getTargetLabel()}):</span>
                            <code className="bg-white/10 px-2 py-1 rounded text-white select-all">
                              {getTargetValue()}
                            </code>
                          </div>
                          {paymentMethod === 'stc_pay' && (
                            <div className="flex justify-end items-center gap-2 text-[10px] text-gray-500 font-console">
                                {isRateLive ? <RefreshCw size={10} className="text-green-500" /> : null}
                                Rate: 1 SAR ≈ {exchangeRate.toFixed(2)} EGP
                            </div>
                          )}
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <label className="block font-minecraft text-xs text-gray-400 mb-2 uppercase">
                          Upload Transaction Proof (Required)
                        </label>
                        <div className="flex items-center gap-4">
                          <label className="cursor-pointer bg-white/5 border border-dashed border-gray-500 hover:border-white rounded p-4 flex flex-col items-center justify-center gap-2 w-full transition-colors h-32">
                            {screenshotPreview ? (
                              <img src={screenshotPreview} alt="Preview" className="h-full object-contain" />
                            ) : (
                              <>
                                <Upload className="text-gray-400" />
                                <span className="font-console text-sm text-gray-500">Click to upload screenshot</span>
                              </>
                            )}
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          </label>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          )}

          {isFreeOrder && (
            <div className="mb-8 p-6 bg-green-900/20 border border-green-500/30 rounded flex items-start gap-4">
              <Gift className="text-green-400 w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="font-minecraft text-green-400 mb-2">Free Claim</h3>
                <p className="font-console text-gray-300">
                  You are claiming a free rank. No payment or receipt is required. 
                  <br/>Just click "Claim Rank" below to notify the admins.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded flex items-center gap-3 text-red-200 font-console">
               <AlertCircle size={20} />
               {error}
            </div>
          )}

          {/* Total & Submit */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10">
             <div className="text-center md:text-left">
                <div className="font-minecraft text-xs text-gray-500 uppercase">Total to Pay</div>
                <div className="font-minecraft text-2xl text-green-400">
                  {isFreeOrder ? "FREE" : `${total} EGP`}
                </div>
             </div>
             <MinecraftButton 
               type="submit" 
               variant={isFreeOrder ? "primary" : "gold"} 
               className="w-full md:w-auto min-w-[200px]"
               disabled={isProcessing}
             >
               {isProcessing ? (
                 <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processing...</span>
               ) : (
                 isFreeOrder ? 'Claim Rank' : 'Submit Receipt'
               )}
             </MinecraftButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;