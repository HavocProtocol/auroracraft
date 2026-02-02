import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import ServerStatus from './components/ServerStatus';
import RankCard from './components/RankCard';
import Community from './components/Community';
import Footer from './components/Footer';
import RulesPage from './components/RulesPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import MinecraftButton from './components/MinecraftButton';
import { RANKS, RANK_KEYS, GAME_KITS, GAME_ITEMS } from './constants';
import { Rank, Page } from './types';
import { CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<Rank[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [orderComplete, setOrderComplete] = useState(false);

  const handleAddToCart = (rank: Rank) => {
    // Prevent duplicates for logic simplicity if needed, but allowing multiples is standard.
    // We'll just append.
    setCart([...cart, rank]);
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setOrderComplete(false);
    window.scrollTo(0, 0);
  };

  const handleBrowseStore = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        scrollToRanks();
      }, 100);
    } else {
      scrollToRanks();
    }
  };

  const scrollToRanks = () => {
    const ranksSection = document.getElementById('ranks');
    if (ranksSection) {
      const headerOffset = 80;
      const elementPosition = ranksSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleCheckoutSuccess = () => {
    handleClearCart();
    setOrderComplete(true);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (orderComplete) {
      return (
         <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="bg-[#202020]/90 border-4 border-green-500/50 p-8 md:p-12 rounded-lg backdrop-blur-sm text-center max-w-lg w-full animate-float">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="text-green-500 w-10 h-10" />
               </div>
               <h2 className="font-minecraft text-3xl text-white mb-4">Transmission Received!</h2>
               <p className="font-console text-xl text-gray-300 mb-8">
                 Your request has been sent to the mothership.
                 <br/><span className="text-sm text-gray-500">(Check Discord for updates)</span>
               </p>
               <MinecraftButton onClick={() => handleNavigate('home')} variant="primary" fullWidth>
                 Return to Base
               </MinecraftButton>
            </div>
         </div>
      );
    }

    switch (currentPage) {
      case 'rules':
        return <RulesPage onBack={() => handleNavigate('home')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => handleNavigate('home')} />;
      case 'terms':
        return <TermsPage onBack={() => handleNavigate('home')} />;
      case 'cart':
        return (
          <CartPage 
            cart={cart} 
            onRemove={handleRemoveFromCart} 
            onCheckout={() => handleNavigate('checkout')} 
            onBack={() => handleNavigate('home')} 
            onBrowse={handleBrowseStore}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            cart={cart} 
            onSuccess={handleCheckoutSuccess} 
            onBack={() => handleNavigate('cart')} 
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero onBrowse={handleBrowseStore} />
            <ServerStatus />

            {/* Ranks Section */}
            <section id="ranks" className="py-24 px-4 relative z-10 overflow-hidden">
              <div className="max-w-[95rem] mx-auto">
                <div className="text-center mb-20">
                  <h2 className="font-minecraft text-3xl md:text-5xl mb-4 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                    Server Store
                  </h2>
                  <p className="font-console text-xl text-gray-400 max-w-2xl mx-auto">
                    Choose your cosmic designation.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 px-4">
                  {RANKS.map((rank, index) => (
                    <div key={rank.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] xl:w-[calc(25%-3rem)] min-w-[300px] flex justify-center">
                       <RankCard 
                        rank={rank} 
                        onAddToCart={handleAddToCart} 
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Crate Keys Section */}
            <section id="keys" className="py-24 px-4 relative z-10 overflow-hidden bg-purple-900/10 border-t border-b border-white/5">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent)] pointer-events-none" />
               <div className="max-w-[95rem] mx-auto">
                <div className="text-center mb-20 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />
                  <h2 className="font-minecraft text-3xl md:text-5xl mb-4 text-yellow-400 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                    Rank Crate Keys
                  </h2>
                  <p className="font-console text-xl text-gray-400 max-w-2xl mx-auto">
                    Try your luck! Win the rank for a <span className="text-green-400 font-bold">fraction of the price</span>.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 px-4">
                  {RANK_KEYS.map((item, index) => (
                    <div key={item.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] min-w-[300px] flex justify-center">
                       <RankCard 
                        rank={item} 
                        onAddToCart={handleAddToCart} 
                        index={index}
                      />
                    </div>
                  ))}
                </div>
               </div>
            </section>

             {/* Kits Section */}
            <section id="kits" className="py-24 px-4 relative z-10 overflow-hidden bg-green-900/10 border-b border-white/5">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent)] pointer-events-none" />
               <div className="max-w-[95rem] mx-auto">
                <div className="text-center mb-20 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
                  <h2 className="font-minecraft text-3xl md:text-5xl mb-4 text-green-400 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                    Survival Kits
                  </h2>
                  <p className="font-console text-xl text-gray-400 max-w-2xl mx-auto">
                    Essential gear to jumpstart your adventure.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 px-4">
                  {GAME_KITS.map((item, index) => (
                    <div key={item.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] min-w-[300px] flex justify-center">
                       <RankCard 
                        rank={item} 
                        onAddToCart={handleAddToCart} 
                        index={index}
                      />
                    </div>
                  ))}
                </div>
               </div>
            </section>

             {/* In-Game Items Section */}
             <section id="items" className="py-24 px-4 relative z-10 overflow-hidden bg-blue-900/10 border-b border-white/5">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
               <div className="max-w-[95rem] mx-auto">
                <div className="text-center mb-20 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                  <h2 className="font-minecraft text-3xl md:text-5xl mb-4 text-blue-400 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                    Cosmic Armory
                  </h2>
                  <p className="font-console text-xl text-gray-400 max-w-2xl mx-auto">
                    Legendary artifacts for your survival.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 px-4">
                  {GAME_ITEMS.map((item, index) => (
                    <div key={item.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2.5rem)] min-w-[300px] flex justify-center">
                       <RankCard 
                        rank={item} 
                        onAddToCart={handleAddToCart} 
                        index={index}
                      />
                    </div>
                  ))}
                </div>
               </div>
            </section>

            <Community />
          </>
        );
    }
  };

  return (
    <main className="min-h-screen relative text-white selection:bg-purple-500 selection:text-white">
      <StarBackground />
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        cartItemCount={cart.length}
      />
      
      {/* Added z-10 to ensure content sits above the z-0 background */}
      <div className="relative z-10">
        <div key={`${currentPage}-${orderComplete}`} className="animate-fade-in">
          {renderContent()}
        </div>
      </div>

      {!orderComplete && currentPage !== 'checkout' && currentPage !== 'cart' && (
        <Footer 
          onOpenRules={() => handleNavigate('rules')} 
          onOpenPrivacy={() => handleNavigate('privacy')}
          onOpenTerms={() => handleNavigate('terms')}
        />
      )}
    </main>
  );
};

export default App;