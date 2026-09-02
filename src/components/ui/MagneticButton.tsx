'use client';

import React from 'react';
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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#E60049] to-[#2B020A] text-white shadow-neon-crimson border border-[#E60049]/50 hover:border-[#FFB0C1] hover:shadow-[0_0_25px_rgba(230,0,73,0.5)]';
      case 'gold':
      case 'glass':
        return 'bg-white/[0.08] text-white backdrop-blur-2xl border border-white/20 hover:border-[#E60049]/60 hover:bg-white/[0.12] hover:shadow-[0_0_30px_rgba(255,176,193,0.3)] shadow-lg shadow-black/40';
      case 'secondary':
        return 'bg-gradient-to-r from-violet to-indigo-600 text-white shadow-neon-violet border border-violet/30 hover:border-violet';
      case 'outline':
      default:
        return 'bg-void-card/90 text-white backdrop-blur-md border border-glass-border hover:border-[#E60049] hover:shadow-neon-crimson';
    }
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
    </motion.button>
  );
};
