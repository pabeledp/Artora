'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Glowing Brush Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - (isHovered ? 20 : 8),
          y: mousePosition.y - (isHovered ? 20 : 8),
          width: isHovered ? 40 : 16,
          height: isHovered ? 40 : 16,
          backgroundColor: isHovered ? '#FF2A5F' : '#E6B93F',
          boxShadow: isHovered
            ? '0 0 30px 8px rgba(255, 42, 95, 0.8), 0 0 50px 15px rgba(124, 58, 237, 0.4)'
            : '0 0 20px 4px rgba(230, 185, 63, 0.7)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 350,
          mass: 0.2,
        }}
      />

      {/* Trailing Acrylic Fluid Halo */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 rounded-full opacity-30 blur-md mix-blend-screen"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          width: 60,
          height: 60,
          background: 'radial-gradient(circle, #7C3AED 0%, #FF2A5F 50%, transparent 80%)',
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 150,
          mass: 0.6,
        }}
      />
    </>
  );
};
