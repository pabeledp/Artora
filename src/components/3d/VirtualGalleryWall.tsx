'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ARTWORKS_DATA } from '@/lib/art-data';
import { useRouter } from '@/i18n/routing';

export const VirtualGalleryWall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 650;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 3.5;
    controls.maxDistance = 8.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(0, 8, 5);
    scene.add(mainLight);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(40, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c10,
      roughness: 0.2,
      metalness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.4;
    scene.add(floor);

    // Back Wall
    const wallGeo = new THREE.PlaneGeometry(40, 10);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x121217,
      roughness: 0.9,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 1, -0.6);
    scene.add(wall);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const clickableMeshes: { mesh: THREE.Mesh; slug: string }[] = [];

    // Hang Paintings
    const artworksToShow = ARTWORKS_DATA.slice(0, 5);
    const paintingGroups: THREE.Group[] = [];

    artworksToShow.forEach((art, index) => {
      const xPos = (index - 2) * 3.4;
      const group = new THREE.Group();
      group.position.set(xPos, 0.4, 0);

      // Outer Luxury Black Frame
      const frameGeo = new THREE.BoxGeometry(2.5, 3.2, 0.1);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x14141a,
        roughness: 0.5,
        metalness: 0.8,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(0, 0, -0.05);
      group.add(frame);

      // Gold Trim
      const goldTrimGeo = new THREE.BoxGeometry(2.34, 3.04, 0.04);
      const goldTrimMat = new THREE.MeshStandardMaterial({
        color: 0xe6b93f,
        metalness: 0.9,
        roughness: 0.2,
      });
      const goldTrim = new THREE.Mesh(goldTrimGeo, goldTrimMat);
      goldTrim.position.set(0, 0, -0.01);
      group.add(goldTrim);

      // Painting Texture Face
      const artTexture = textureLoader.load(art.primaryImage, () => {
        renderer.render(scene, camera);
      });
      artTexture.colorSpace = THREE.SRGBColorSpace;

      const artFaceGeo = new THREE.PlaneGeometry(2.2, 2.9);
      const artFaceMat = new THREE.MeshStandardMaterial({
        map: artTexture,
        roughness: 0.4,
      });
      const artFace = new THREE.Mesh(artFaceGeo, artFaceMat);
      artFace.position.set(0, 0, 0.02);
      group.add(artFace);
      clickableMeshes.push({ mesh: artFace, slug: art.slug });

      // Spotlight for this painting
      const spot = new THREE.SpotLight(0xfff6e6, 2.8);
      spot.position.set(xPos, 2.8, 1.8);
      spot.target = group;
      spot.angle = 0.5;
      spot.penumbra = 0.6;
      scene.add(spot);

      scene.add(group);
      paintingGroups.push(group);
    });

    // Click handler for paintings
    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableMeshes.map((m) => m.mesh));

      if (intersects.length > 0) {
        const hit = clickableMeshes.find((m) => m.mesh === intersects[0].object);
        if (hit) {
          router.push(`/art/${hit.slug}`);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

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
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      floorGeo.dispose();
      wallGeo.dispose();
      if (container) container.innerHTML = '';
    };
  }, [router]);

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden bg-void border border-glass-border shadow-2xl">
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-void-card/90 border border-glass-border text-gold backdrop-blur-md">
          🏛️ 3D Virtual Gallery Wall • Click any painting to view full details
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-xs text-white/60 pointer-events-none">
        <span className="bg-void-card/90 px-3 py-1.5 rounded-lg border border-glass-border backdrop-blur-md">
          ↔️ Pan left & right to stroll the gallery wall
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
};
