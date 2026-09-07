'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface AcrylicCanvasViewerProps {
  imageUrl?: string;
  title?: string;
  artist?: string;
  dimensions?: { width: number; height: number; depth: number };
}

export const AcrylicCanvasViewer: React.FC<AcrylicCanvasViewerProps> = ({
  imageUrl,
  title = 'Artwork',
  artist = 'Fiha Islam',
  dimensions = { width: 3.2, height: 4.2, depth: 0.22 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [studioLight, setStudioLight] = useState<'gallery' | 'warm' | 'dramatic'>('gallery');
  const [isInitialized, setIsInitialized] = useState(false);
  const lightSetupRef = useRef<{
    ambient: THREE.AmbientLight;
    dirLight: THREE.DirectionalLight;
    spot1: THREE.SpotLight;
    spot2: THREE.SpotLight;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanupFn: (() => void) | null = null;

    // Use IntersectionObserver so 3D Engine only loads when scrolled into viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialized) {
          setIsInitialized(true);
          cleanupFn = initThreeScene(container);
        }
      },
      { rootMargin: '100px', threshold: 0.05 }
    );

    observer.observe(container);

    function initThreeScene(targetEl: HTMLDivElement) {
      let width = targetEl.clientWidth || 600;
      let height = targetEl.clientHeight || 450;

      // Scene & Camera
      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
      camera.position.set(0, 0, 5.8);

      // Renderer (Optimized power & DPR)
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      targetEl.innerHTML = '';
      targetEl.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.minDistance = 3.2;
      controls.maxDistance = 7.5;
      controls.maxPolarAngle = Math.PI / 1.7;
      controls.minPolarAngle = Math.PI / 3.5;

      // Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight.position.set(4, 6, 5);
      scene.add(dirLight);

      const spot1 = new THREE.SpotLight(0xd8b4fe, 1.2);
      spot1.position.set(-4, 3, 4);
      scene.add(spot1);

      const spot2 = new THREE.SpotLight(0xe6b93f, 1.0);
      spot2.position.set(4, -2, 3);
      scene.add(spot2);

      lightSetupRef.current = { ambient, dirLight, spot1, spot2 };

      // Procedural Impasto Bump Texture
      const bumpCanvas = document.createElement('canvas');
      bumpCanvas.width = 128;
      bumpCanvas.height = 128;
      const ctx = bumpCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 128, 128);

        for (let i = 0; i < 25; i++) {
          const x = Math.random() * 128;
          const y = Math.random() * 128;
          const len = 30 + Math.random() * 60;
          const angle = Math.random() * Math.PI;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          const grad = ctx.createLinearGradient(0, -4, 0, 4);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.5, '#404040');
          grad.addColorStop(1, '#a0a0a0');
          ctx.fillStyle = grad;
          ctx.fillRect(-len / 2, -4, len, 8);
          ctx.restore();
        }
      }
      const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
      bumpTexture.wrapS = THREE.RepeatWrapping;
      bumpTexture.wrapT = THREE.RepeatWrapping;
      bumpTexture.repeat.set(2, 2);

      // Canvas Group
      const canvasGroup = new THREE.Group();
      const boxGeo = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);

      const textureLoader = new THREE.TextureLoader();
      let colorTexture: THREE.Texture | null = null;

      if (imageUrl) {
        colorTexture = textureLoader.load(imageUrl, () => {
          renderer.render(scene, camera);
        });
        colorTexture.colorSpace = THREE.SRGBColorSpace;
      }

      const frontMat = new THREE.MeshStandardMaterial({
        map: colorTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.08,
        roughness: 0.35,
        metalness: 0.15,
      });

      const edgeMat = new THREE.MeshStandardMaterial({
        color: 0x180308,
        roughness: 0.8,
        bumpMap: bumpTexture,
        bumpScale: 0.04,
      });

      const backMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0c,
        roughness: 0.9,
      });

      const materials = [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];
      const canvasMesh = new THREE.Mesh(boxGeo, materials);
      canvasGroup.add(canvasMesh);
      scene.add(canvasGroup);

      let animationId: number | null = null;
      let isVisible = true;
      let clock = new THREE.Clock();
      let isDragging = false;

      controls.addEventListener('start', () => {
        isDragging = true;
      });
      controls.addEventListener('end', () => {
        isDragging = false;
      });

      const animate = () => {
        if (!isVisible) return;
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (!isDragging) {
          canvasGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.05;
          canvasGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.02;
        }

        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // Visibility change handler
      const innerObserver = new IntersectionObserver(
        ([innerEntry]) => {
          isVisible = innerEntry.isIntersecting;
          if (isVisible) {
            clock.start();
            if (!animationId) animate();
          } else if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        },
        { threshold: 0.1 }
      );
      innerObserver.observe(targetEl);

      // Resize Handler
      const handleResize = () => {
        if (!targetEl) return;
        width = targetEl.clientWidth;
        height = targetEl.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.render(scene, camera);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        innerObserver.disconnect();
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        boxGeo.dispose();
        bumpTexture.dispose();
        if (colorTexture) colorTexture.dispose();
        targetEl.innerHTML = '';
      };
    }

    return () => {
      observer.disconnect();
      if (cleanupFn) cleanupFn();
    };
  }, [imageUrl, dimensions.width, dimensions.height, dimensions.depth, isInitialized]);

  // Handle studio light switching
  useEffect(() => {
    const lights = lightSetupRef.current;
    if (!lights) return;

    if (studioLight === 'gallery') {
      lights.ambient.intensity = 0.8;
      lights.ambient.color.set(0xffffff);
      lights.dirLight.intensity = 2.0;
      lights.dirLight.color.set(0xffffff);
      lights.spot1.intensity = 1.2;
      lights.spot1.color.set(0xd8b4fe);
      lights.spot2.intensity = 1.0;
      lights.spot2.color.set(0xe6b93f);
    } else if (studioLight === 'warm') {
      lights.ambient.intensity = 0.5;
      lights.dirLight.intensity = 2.8;
      lights.dirLight.color.set(0xffdf9e);
      lights.spot1.intensity = 1.5;
      lights.spot1.color.set(0xff9a6c);
      lights.spot2.intensity = 0.8;
      lights.spot2.color.set(0xffeedd);
    } else if (studioLight === 'dramatic') {
      lights.ambient.intensity = 0.3;
      lights.dirLight.intensity = 3.2;
      lights.dirLight.color.set(0xffffff);
      lights.spot1.intensity = 2.0;
      lights.spot1.color.set(0xff0055);
      lights.spot2.intensity = 1.5;
      lights.spot2.color.set(0x00d4ff);
    }
  }, [studioLight]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[480px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden touch-none"
      />

      {/* Interactive Studio Lighting Bar */}
      <div className="w-full flex items-center justify-between px-4 py-3 bg-void-card/90 border-t border-glass-border backdrop-blur-md rounded-b-2xl">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] hidden sm:inline">3D Studio Lighting:</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-void-light border border-white/10">
          <button
            onClick={() => setStudioLight('gallery')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioLight === 'gallery'
                ? 'bg-[#E60049] text-white shadow-neon-crimson'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Gallery 5000K
          </button>
          <button
            onClick={() => setStudioLight('warm')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioLight === 'warm'
                ? 'bg-[#E6B93F] text-black font-bold shadow-neon-gold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Warm Sunset
          </button>
          <button
            onClick={() => setStudioLight('dramatic')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              studioLight === 'dramatic'
                ? 'bg-gradient-to-r from-[#E60049] to-[#7C3AED] text-white shadow-neon-crimson'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Dramatic Neon
          </button>
        </div>
      </div>
    </div>
  );
};
