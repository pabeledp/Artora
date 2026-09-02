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
    let height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3.0;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 3.5;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(4, 6, 5);
    dirLight.castShadow = true;
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
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const ctx = bumpCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);

      // Heavy impasto knife streaks
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const len = 70 + Math.random() * 160;
        const angle = Math.random() * Math.PI;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const grad = ctx.createLinearGradient(0, -12, 0, 12);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        grad.addColorStop(0.5, 'rgba(128, 128, 128, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, len, 10 + Math.random() * 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Canvas weave grain
      for (let x = 0; x < 512; x += 4) {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(x, 0, 2, 512);
      }
      for (let y = 0; y < 512; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.fillRect(0, y, 512, 2);
      }
    }

    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;

    // Load Painting Image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    let colorTexture: THREE.Texture | null = null;
    if (imageUrl) {
      colorTexture = textureLoader.load(imageUrl, () => {
        renderer.render(scene, camera);
      });
      colorTexture.colorSpace = THREE.SRGBColorSpace;
    }

    // Canvas Mesh Materials
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x14141a,
      roughness: 0.8,
      metalness: 0.1,
      bumpMap: bumpTexture,
      bumpScale: 0.03,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      color: colorTexture ? 0xffffff : 0xe62450,
      map: colorTexture || undefined,
      bumpMap: bumpTexture,
      bumpScale: 0.08, // Gives visible raised impasto ridges
      roughness: 0.45,
      metalness: 0.25, // Gives acrylic varnish sheen
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a221b, // Raw canvas & cedar stretcher bar
      roughness: 0.9,
    });

    const materials = [
      sideMaterial, // right
      sideMaterial, // left
      sideMaterial, // top
      sideMaterial, // bottom
      frontMaterial, // front
      backMaterial, // back
    ];

    // Stretched Canvas Box
    const canvasGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
    const canvasMesh = new THREE.Mesh(boxGeo, materials);
    canvasMesh.castShadow = true;
    canvasMesh.receiveShadow = true;
    canvasGroup.add(canvasMesh);

    // Floating Gold Plaque
    const plaqueGeo = new THREE.BoxGeometry(dimensions.width * 0.7, 0.35, 0.04);
    const plaqueMat = new THREE.MeshStandardMaterial({
      color: 0xe6b93f,
      metalness: 0.9,
      roughness: 0.2,
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, -dimensions.height / 2 - 0.35, 0.05);
    canvasGroup.add(plaqueMesh);

    // Drop Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(dimensions.width * 1.8, dimensions.height * 1.8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, 0, -0.6);
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    scene.add(canvasGroup);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    let isDragging = false;
    controls.addEventListener('start', () => {
      isDragging = true;
    });
    controls.addEventListener('end', () => {
      isDragging = false;
    });

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle breathing float when not dragging
      if (!isDragging) {
        canvasGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.08;
        canvasGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.05;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      boxGeo.dispose();
      plaqueGeo.dispose();
      shadowGeo.dispose();
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
    <div className="relative w-full h-[480px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-void-light/90 via-void to-void-light/90 border border-glass-border shadow-2xl">
      {/* Controls HUD */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-void-card/90 border border-glass-border text-gold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
          3D Impasto Viewer
        </span>
        <button
          onClick={() =>
            setStudioLight((curr) =>
              curr === 'gallery' ? 'warm' : curr === 'warm' ? 'dramatic' : 'gallery'
            )
          }
          className="px-3 py-1 rounded-full text-xs bg-void-card/80 border border-glass-border text-white/90 hover:border-gold transition-colors backdrop-blur-md"
        >
          💡 Light: <span className="text-gold capitalize">{studioLight}</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-xs text-white/60 pointer-events-none">
        <span className="bg-void-card/90 px-3 py-1.5 rounded-lg border border-glass-border backdrop-blur-md">
          🔄 Drag to orbit 360° | Scroll to inspect impasto depth
        </span>
        <span className="hidden sm:inline bg-void-card/90 px-3 py-1.5 rounded-lg border border-glass-border text-gold backdrop-blur-md">
          Virtual Studio Lighting Active
        </span>
      </div>

      {/* Pure Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
};
