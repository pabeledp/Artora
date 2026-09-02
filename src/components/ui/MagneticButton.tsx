'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'glass' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-crimson to-rose-600 text-white shadow-neon-crimson border-crimson/30 hover:border-crimson';
      case 'gold':
        return 'bg-gradient-to-r from-gold to-amber-500 text-void font-bold shadow-neon-gold border-gold/40 hover:border-gold';
      case 'secondary':
        return 'bg-gradient-to-r from-violet to-indigo-600 text-white shadow-neon-violet border-violet/30 hover:border-violet';
      case 'glass':
        return 'bg-white/[0.08] text-white backdrop-blur-2xl border border-white/20 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 hover:shadow-[0_0_25px_rgba(37,211,102,0.3)] transition-all';
      case 'outline':
      default:
        return 'bg-void-card/80 text-white backdrop-blur-md border-glass-border hover:border-crimson hover:shadow-neon-crimson';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.button>
  );
};
