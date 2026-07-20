import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices or coarse pointers
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    ) {
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }

      // Direct DOM update for center dot (instant response, 0 lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${
          isHoveredRef.current ? 0.75 : 1
        })`;
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    // Smooth Lerp loop for outer trailing ring using RAF (Direct DOM mutation, 0 React re-renders)
    const animateRing = () => {
      const dx = targetRef.current.x - ringPosRef.current.x;
      const dy = targetRef.current.y - ringPosRef.current.y;

      ringPosRef.current.x += dx * 0.18;
      ringPosRef.current.y += dy * 0.18;

      if (ringRef.current) {
        const scale = isHoveredRef.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      requestRef.current = requestAnimationFrame(animateRing);
    };

    // Efficient Event Delegation for hover states (no MutationObserver overhead)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        isHoveredRef.current = true;
        if (ringRef.current) {
          ringRef.current.classList.add('bg-eibm-sky/10', 'border-eibm-sky/60', 'shadow-[0_0_12px_rgba(0,174,239,0.3)]');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        isHoveredRef.current = false;
        if (ringRef.current) {
          ringRef.current.classList.remove('bg-eibm-sky/10', 'border-eibm-sky/60', 'shadow-[0_0_12px_rgba(0,174,239,0.3)]');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[99999] opacity-0 transition-opacity duration-300 hidden md:block"
    >
      {/* 1. Trailing Outer Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-eibm-sky/40 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
      />

      {/* 2. Center Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-eibm-sky pointer-events-none shadow-[0_0_8px_rgba(0,174,239,0.8)] will-change-transform transition-all duration-150"
      />
    </div>
  );
};
