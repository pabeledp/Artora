'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, ZoomIn, ZoomOut, Check, Sliders } from 'lucide-react';
import Image from 'next/image';
import { ArtWork } from '@/lib/art-data';

interface ARWallModalProps {
  art: ArtWork;
  isOpen: boolean;
  onClose: () => void;
}

export const ARWallModal: React.FC<ARWallModalProps> = ({ art, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [roomPreset, setRoomPreset] = useState<'minimal' | 'living' | 'dark'>('living');
  const [frameStyle, setFrameStyle] = useState<'black' | 'gold' | 'frameless'>('gold');
  const videoRef = useRef<HTMLVideoElement>(null);

  const roomBackgrounds = {
    living: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    minimal: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    dark: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
          setHasCamera(true);
        }
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable; fallback to interior room simulation:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden bg-void-light border border-glass-border shadow-2xl flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border bg-void/80 backdrop-blur-md z-20">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson animate-pulse" />
                AR Wall Preview: {art.title}
              </h3>
              <p className="text-xs text-white/60">
                Dimensions: {art.canvasSize} • Drag & scale to fit your wall space
              </p>
            </div>
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2 rounded-full bg-void-card border border-glass-border text-white/80 hover:text-white hover:border-crimson transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive AR Viewport */}
          <div className="relative flex-1 overflow-hidden flex items-center justify-center select-none bg-black">
            {/* Live Camera Feed */}
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              /* High-end Architectural Mockup Background */
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-80"
                style={{ backgroundImage: `url(${roomBackgrounds[roomPreset]})` }}
              />
            )}

            {/* Simulated Overhead Wall Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-amber-100/20 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Draggable & Scalable Artwork on the Wall */}
            <motion.div
              drag
              dragConstraints={{ left: -250, right: 250, top: -180, bottom: 180 }}
              className="relative cursor-grab active:cursor-grabbing z-10"
              style={{
                scale: scale,
              }}
              whileHover={{ scale: scale * 1.02 }}
            >
              <div
                className={`relative rounded shadow-2xl transition-all duration-300 ${
                  frameStyle === 'gold'
                    ? 'p-3 bg-gradient-to-tr from-amber-700 via-gold to-amber-600 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ring-2 ring-gold/40'
                    : frameStyle === 'black'
                    ? 'p-3 bg-void-light shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/10'
                    : 'p-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
                }`}
              >
                <img
                  src={art.primaryImage}
                  alt={art.title}
                  className="w-64 sm:w-80 md:w-96 object-cover rounded pointer-events-none select-none"
                  style={{ aspectRatio: '3/4' }}
                />
                {/* Impasto Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none rounded" />
              </div>
            </motion.div>
          </div>

          {/* AR Controls Footer */}
          <div className="px-6 py-4 border-t border-glass-border bg-void/90 backdrop-blur-md z-20 flex flex-wrap items-center justify-between gap-4">
            {/* Scale Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70 flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5 text-gold" /> Scale:
              </span>
              <button
                onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
                className="p-1.5 rounded-lg bg-void-card border border-glass-border text-white/80 hover:border-gold"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-gold min-w-[40px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(1.6, s + 0.1))}
                className="p-1.5 rounded-lg bg-void-card border border-glass-border text-white/80 hover:border-gold"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Frame Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">Frame:</span>
              {(['gold', 'black', 'frameless'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setFrameStyle(style)}
                  className={`px-2.5 py-1 text-xs rounded-full border capitalize transition-colors ${
                    frameStyle === style
                      ? 'bg-gold/20 border-gold text-gold font-semibold'
                      : 'bg-void-card border-glass-border text-white/60 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Mode / Preset Switcher */}
            <div className="flex items-center gap-2">
              {!cameraActive ? (
                <>
                  <span className="text-xs text-white/70">Wall Vibe:</span>
                  {(['living', 'minimal', 'dark'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setRoomPreset(preset)}
                      className={`px-2.5 py-1 text-xs rounded-full border capitalize transition-colors ${
                        roomPreset === preset
                          ? 'bg-crimson/20 border-crimson text-crimson font-semibold'
                          : 'bg-void-card border-glass-border text-white/60 hover:text-white'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                  <button
                    onClick={startCamera}
                    className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gradient-to-r from-crimson to-violet text-white font-medium border border-white/20 shadow-neon-crimson"
                  >
                    <Camera className="w-3.5 h-3.5" /> Use Live Camera
                  </button>
                </>
              ) : (
                <button
                  onClick={stopCamera}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-void-card border border-glass-border text-white hover:border-crimson"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Back to Room Vibe
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
