'use client';

import React, { useEffect, useRef } from 'react';

export const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop with fine mouse pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth linear interpolation (lerp)
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-50 w-3 h-3 rounded-full bg-[#E60049] shadow-[0_0_15px_rgba(230,0,73,0.8)] mix-blend-screen will-change-transform hidden md:block"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    />
  );
};
