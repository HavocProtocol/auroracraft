import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Star {
      x: number;
      y: number;
      z: number; // Parallax factor (depth)
      radius: number;
      alpha: number;
      dAlpha: number; // Twinkle speed
      targetAlpha: number;
    }

    const stars: Star[] = [];
    const numStars = 300; // Increased count for better density

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5 + 0.1, // Depth between 0.1 and 0.6
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        dAlpha: (Math.random() - 0.5) * 0.01 + 0.002,
        targetAlpha: Math.random()
      });
    }

    let animationId: number;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // We do NOT draw a background rect here, allowing the CSS elements (Black Hole) 
      // behind the canvas to show through.

      stars.forEach(star => {
        // --- Twinkle Logic ---
        star.alpha += star.dAlpha;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.dAlpha = -star.dAlpha; // Reverse fade direction
        }
        // Clamp alpha
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;

        // --- Parallax & Infinite Scroll Logic ---
        // Calculate Y position based on scroll and depth
        // We add height and modulo height to wrap them around for infinite scrolling
        let renderY = (star.y - scrollY * star.z) % height;
        if (renderY < 0) renderY += height;

        // Draw Star
        ctx.beginPath();
        ctx.arc(star.x, renderY, star.radius, 0, Math.PI * 2);
        // Add a slight glow effect
        ctx.shadowBlur = 4;
        ctx.shadowColor = "white";
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-distribute stars if needed, or just let them exist in new bounds
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#020005] pointer-events-none">
      
      {/* --- Live Black Hole Effect (CSS) --- */}
      {/* Keeps the cool atmosphere behind the sharp canvas stars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-60">
        
        {/* Accretion Disk */}
        <div className="absolute inset-0 rounded-full animate-spin-slow mix-blend-screen"
             style={{
               background: 'conic-gradient(from 0deg, transparent 0%, #4c1d95 20%, #a855f7 40%, #d8b4fe 50%, #a855f7 60%, #4c1d95 80%, transparent 100%)',
               filter: 'blur(30px)',
               animationDuration: '20s'
             }}
        />
        
        {/* Inner Glow */}
        <div className="absolute inset-[15%] rounded-full animate-spin-reverse mix-blend-overlay"
             style={{
               background: 'conic-gradient(from 180deg, transparent 0%, #c026d3 30%, transparent 100%)',
               filter: 'blur(20px)',
               animationDuration: '15s'
             }}
        />

        {/* Event Horizon */}
        <div className="absolute inset-[30%] bg-black rounded-full shadow-[0_0_50px_rgba(168,85,247,0.5)] z-10" />
      </div>

      {/* --- Canvas Layer for Twinkling Stars --- */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] opacity-80" />
      
      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" />
    </div>
  );
};

export default StarBackground;