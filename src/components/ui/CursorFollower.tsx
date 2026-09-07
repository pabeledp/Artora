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
    let animId: number | null = null;
    let isMoving = false;

    const animate = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.25;
      currentY += dy * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0)`;
      }

      // If close to destination, stop animation loop to conserve CPU and avoid blocking main thread
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animId = requestAnimationFrame(animate);
      } else {
        isMoving = false;
        animId = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        if (!animId) {
          animId = requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animId) cancelAnimationFrame(animId);
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
