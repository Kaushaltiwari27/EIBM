import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth Lerp animation for trailing outer circle
    const animateRing = () => {
      setRingPosition((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        // Adjust speed parameter (0.15) for latency of the outer trail
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(animateRing);
    };

    // Listeners for links and buttons to expand outer circle
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animateRing);

    // Initial listener scan
    addHoverListeners();

    // Re-scan dom periodically to attach listeners to dynamic interactive elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [isVisible]);

  // Disable custom cursor on touch/mobile devices
  if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. Trailing Outer Ring */}
      <div
        ref={ringRef}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 1.8 : 1})`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`absolute w-8 h-8 rounded-full border border-eibm-sky/40 pointer-events-none flex items-center justify-center ${
          isHovered ? 'bg-eibm-sky/10 backdrop-blur-[1px] border-eibm-sky/60 shadow-[0_0_10px_rgba(0,174,239,0.25)]' : ''
        }`}
      />

      {/* 2. Exact Center Point Dot */}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate3d(-50%, -50%, 0)',
        }}
        className={`absolute w-1.5 h-1.5 rounded-full bg-eibm-sky pointer-events-none shadow-[0_0_6px_rgba(0,174,239,0.6)] ${
          isHovered ? 'scale-75 bg-eibm-royal' : ''
        }`}
      />

    </div>
  );
};
