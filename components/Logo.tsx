import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      shapeRendering="crispEdges" // Ensures pixel-perfect rendering
    >
      {/* Planet Base (Purple) */}
      <rect x="10" y="8" width="12" height="16" fill="#7C3AED" /> {/* Base Purple */}
      <rect x="8" y="10" width="16" height="12" fill="#7C3AED" />
      
      {/* Planet Shading (Darker/Lighter) */}
      <rect x="10" y="8" width="4" height="4" fill="#A78BFA" /> {/* Highlight Top-Left */}
      <rect x="18" y="20" width="4" height="4" fill="#5B21B6" /> {/* Shadow Bottom-Right */}
      <rect x="20" y="10" width="2" height="2" fill="#5B21B6" opacity="0.5" /> {/* Crater */}
      <rect x="10" y="18" width="2" height="2" fill="#5B21B6" opacity="0.5" /> {/* Crater */}

      {/* The Ring (Cyan/Blue) */}
      {/* Back of ring (behind planet) */}
      <rect x="6" y="14" width="2" height="4" fill="#0E7490" />
      <rect x="24" y="14" width="2" height="4" fill="#0E7490" />
      
      {/* Front of ring (crossing planet) */}
      <path d="M4 16H8V18H4V16Z" fill="#22D3EE" />
      <path d="M8 17H24V19H8V17Z" fill="#67E8F9" /> {/* Main ring highlight */}
      <path d="M24 16H28V18H24V16Z" fill="#22D3EE" />

      {/* Floating Particles (Gold) */}
      <rect x="4" y="6" width="2" height="2" fill="#FDE047" className="animate-pulse" style={{ animationDuration: '3s' }} />
      <rect x="27" y="23" width="1" height="1" fill="#FDE047" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
      <rect x="25" y="5" width="1" height="1" fill="#FFFFFF" className="animate-pulse" style={{ animationDuration: '4s' }} />
    </svg>
  );
};

export default Logo;