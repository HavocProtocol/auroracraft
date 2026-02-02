import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, cartItemCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '#') {
      if (currentPage !== 'home') {
        onNavigate('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          scrollToId(targetId);
        }, 100);
      } else {
        scrollToId(targetId);
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Status', href: '#status' },
    { name: 'Ranks', href: '#ranks' },
    { name: 'Keys', href: '#keys' },
    { name: 'Kits', href: '#kits' },
    { name: 'Items', href: '#items' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-[#111]/90 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group/brand" 
          onClick={(e) => handleLinkClick(e as any, '#')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-lg group-hover/brand:bg-purple-500/40 transition-all duration-300 rounded-full"></div>
            <Logo className="w-9 h-9 md:w-10 md:h-10 relative z-10 drop-shadow-md transition-transform duration-300 group-hover/brand:scale-110 group-hover/brand:-rotate-12" />
          </div>
          <div className="font-minecraft hidden sm:flex flex-col justify-center">
            <span className="text-[0.65rem] text-gray-400 tracking-[0.2em] leading-tight uppercase group-hover/brand:text-white transition-colors">
              Welcome to
            </span>
            <div className="text-sm md:text-base tracking-wide leading-tight">
              <span className="text-white">Aurora</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold ml-1.5">
                Craft
              </span>
            </div>
          </div>
          {/* Mobile Text */}
          <span className="font-minecraft text-white text-sm sm:hidden tracking-wide">
            Aurora<span className="text-purple-400">Craft</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`font-minecraft text-sm transition-all cursor-pointer ${link.name === 'Keys' ? 'text-yellow-400 hover:text-yellow-200' : 'text-gray-300 hover:text-white hover:text-shadow-glow'}`}
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <ShoppingCart className="text-white w-6 h-6 group-hover:text-yellow-400 transition-colors" />
            {cartItemCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-minecraft w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#111]">
                {cartItemCount}
              </div>
            )}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2"
          >
            <ShoppingCart className="text-white w-6 h-6" />
            {cartItemCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-minecraft w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#111]">
                {cartItemCount}
              </div>
            )}
          </button>
          <button 
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#151515] border-b border-white/20 p-4 flex flex-col gap-4 shadow-xl">
           {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`font-minecraft text-center py-2 bg-white/5 rounded cursor-pointer ${link.name === 'Keys' ? 'text-yellow-400 hover:text-yellow-200' : 'text-gray-300 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;