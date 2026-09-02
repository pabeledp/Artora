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
  const lightSetupRef = useRef<{
    ambient: THREE.AmbientLight;
    dirLight: THREE.DirectionalLight;
    spot1: THREE.SpotLight;
    spot2: THREE.SpotLight;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.8);

    // Renderer (Performance tuned)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

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
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const ctx = bumpCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);

      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const len = 40 + Math.random() * 100;
        const angle = Math.random() * Math.PI;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        const grad = ctx.createLinearGradient(0, -6, 0, 6);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#404040');
        grad.addColorStop(1, '#a0a0a0');
        ctx.fillStyle = grad;
        ctx.fillRect(-len / 2, -6, len, 12);
        ctx.restore();
      }
    }
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.repeat.set(2, 2);

    // Canvas Group
    const canvasGroup = new THREE.Group();

    // Canvas Mesh
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

    // Animation Loop with Visibility Pause
    let animationId: number;
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
        canvasGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.06;
        canvasGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.03;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause rendering when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.start();
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      boxGeo.dispose();
      bumpTexture.dispose();
      if (colorTexture) colorTexture.dispose();
      if (container) container.innerHTML = '';
    };
  }, [imageUrl, dimensions.width, dimensions.height, dimensions.depth]);

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
      lights.dirLight.intensity = 1.2;
      lights.dirLight.color.set(0xe6b93f);
      lights.spot1.intensity = 3.5;
      lights.spot1.color.set(0xff2a5f);
      lights.spot2.intensity = 3.0;
      lights.spot2.color.set(0x7c3aed);
    }
  }, [studioLight]);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] md:h-[550px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1A030A]/90 via-void to-[#1A030A]/90 border border-glass-border shadow-2xl">
      {/* Controls HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-void-card/90 border border-glass-border text-gold backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E60049] animate-ping" />
          3D Impasto Viewer
        </span>
        <button
          onClick={() =>
            setStudioLight((curr) =>
              curr === 'gallery' ? 'warm' : curr === 'warm' ? 'dramatic' : 'gallery'
            )
          }
          className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/20 border border-glass-border text-white backdrop-blur-md transition-colors"
        >
          💡 {studioLight === 'gallery' ? 'Studio Mode' : studioLight === 'warm' ? 'Warm Sunlight' : 'Dramatic Spotlight'}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <p className="text-[11px] text-white/60 font-mono">
          🔄 Drag to orbit • Pinch/Scroll to zoom
        </p>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />
    </div>
  );
};
