import React from 'react';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'gold';
  fullWidth?: boolean;
}

const MinecraftButton: React.FC<MinecraftButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "mc-btn font-minecraft text-sm px-6 py-3 relative border-2 transition-transform active:translate-y-1 select-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#5c5c5c] text-white border-black border-t-[#858585] border-l-[#858585] border-b-[#323232] border-r-[#323232] hover:bg-[#6e6e6e]",
    secondary: "bg-[#3a3a3a] text-gray-300 border-black border-t-[#555] border-l-[#555] border-b-[#222] border-r-[#222] hover:bg-[#4a4a4a]",
    danger: "bg-[#8B0000] text-white border-black border-t-[#ff5555] border-l-[#ff5555] border-b-[#550000] border-r-[#550000] hover:bg-[#A00000]",
    gold: "bg-[#FFAA00] text-black border-black border-t-[#FFFF55] border-l-[#FFFF55] border-b-[#AA5500] border-r-[#AA5500] hover:bg-[#FFBB33]",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {/* Inner shadow/bevel effect handled by Tailwind utilities passed in baseStyles, but specific colors come from variant */}
      {children}
    </button>
  );
};

export default MinecraftButton;
