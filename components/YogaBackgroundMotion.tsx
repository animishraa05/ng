'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ASANA_SCROLL_STAGES } from '@/lib/studio-data';

export type BackgroundMotionMode = 'three-hybrid' | 'three-pure' | 'state-1-classic';

interface YogaBackgroundMotionProps {
  mode?: BackgroundMotionMode;
  activeStageIndex?: number;
  scrollProgress?: number;
}

// Module-scope reusable math objects for Zero-GC in the render loop
const _dummy = new THREE.Object3D();
const _tempColor = new THREE.Color();

export default function YogaBackgroundMotion({
  mode = 'three-hybrid',
  activeStageIndex = 0,
  scrollProgress = 0,
}: YogaBackgroundMotionProps) {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<BackgroundMotionMode>(mode);
  const scrollRef = useRef<number>(scrollProgress);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // 1. Scene & Palette-Matched Atmosphere (#F6F2E9 Warm Cream)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf6f2e9, 0.032);

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 11.5);

    // 3. Modern WebGLRenderer (Three.js r160+ pipeline)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isHeadless,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0xf6f2e9, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Mandatory Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // 5. Balanced 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xfff8eb, 0xd8e6d5, 1.15);
    scene.add(hemiLight);

    const sunKeyLight = new THREE.DirectionalLight(0xffe7b3, 2.2);
    sunKeyLight.position.set(6, 8, 7);
    scene.add(sunKeyLight);

    const terracottaRimLight = new THREE.DirectionalLight(0xf3c6b6, 1.3);
    terracottaRimLight.position.set(-7, -4, 4);
    scene.add(terracottaRimLight);

    // 6. Procedural Sunlit Asana Silhouette & Mandala CanvasTexture (Zero external 404s)
    const createSacredBackdropTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1024, 1024);

        // Soft warm radial aura matching #F7D98C -> #D8E6D5 -> transparent
        const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 480);
        grad.addColorStop(0, 'rgba(247, 217, 140, 0.42)');
        grad.addColorStop(0.45, 'rgba(216, 230, 213, 0.28)');
        grad.addColorStop(0.78, 'rgba(243, 198, 182, 0.14)');
        grad.addColorStop(1, 'rgba(246, 242, 233, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 1024);

        // Crisp architectural sacred geometry dial markings
        ctx.strokeStyle = 'rgba(27, 67, 50, 0.22)';
        ctx.lineWidth = 2;
        for (let r = 140; r <= 440; r += 75) {
          ctx.beginPath();
          ctx.arc(512, 512, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 24 Solar Nadi rays
        ctx.strokeStyle = 'rgba(20, 20, 19, 0.12)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 24; i++) {
          const angle = (i * Math.PI * 2) / 24;
          ctx.beginPath();
          ctx.moveTo(512 + Math.cos(angle) * 140, 512 + Math.sin(angle) * 140);
          ctx.lineTo(512 + Math.cos(angle) * 440, 512 + Math.sin(angle) * 440);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const sacredDialTexture = createSacredBackdropTexture();

    // 7. Composite 10-Part Procedural 3D Sacred Lotus & Prana Sculpture (THREE.Group)
    const rootSculptureGroup = new THREE.Group();
    rootSculptureGroup.position.set(2.4, 0.1, 0);
    scene.add(rootSculptureGroup);

    // Backdrop Sacred Aura Disc (Part 1)
    const auraPlaneGeo = new THREE.PlaneGeometry(11, 11);
    const auraPlaneMat = new THREE.MeshBasicMaterial({
      map: sacredDialTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const auraDisc = new THREE.Mesh(auraPlaneGeo, auraPlaneMat);
    auraDisc.position.set(0, 0, -2.2);
    rootSculptureGroup.add(auraDisc);

    // Materials matching the studio palette (#F7D98C, #D8E6D5, #F3C6B6, #1B4332, #E2DCF5)
    const brushedMarigoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7d98c,
      metalness: 0.82,
      roughness: 0.22,
      anisotropy: 0.75,
      clearcoat: 0.4,
    });

    const sageCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e6d5,
      metalness: 0.12,
      roughness: 0.48,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
    });

    const terracottaClayMat = new THREE.MeshStandardMaterial({
      color: 0xf3c6b6,
      metalness: 0.08,
      roughness: 0.68,
    });

    const forestEmeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b4332,
      metalness: 0.35,
      roughness: 0.28,
      clearcoat: 0.8,
    });

    const inkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x141413,
      metalness: 0.5,
      roughness: 0.4,
    });

    // Part 2, 3, 4: Concentric Gyroscopic Chakra Rings
    const outerChakraRingGeo = new THREE.TorusGeometry(3.35, 0.055, 24, 120);
    const outerChakraRing = new THREE.Mesh(outerChakraRingGeo, brushedMarigoldMat);
    rootSculptureGroup.add(outerChakraRing);

    const midSageRingGeo = new THREE.TorusGeometry(2.55, 0.07, 24, 100);
    const midSageRing = new THREE.Mesh(midSageRingGeo, sageCeramicMat);
    midSageRing.rotation.x = Math.PI * 0.22;
    rootSculptureGroup.add(midSageRing);

    const innerForestRingGeo = new THREE.TorusGeometry(1.75, 0.045, 20, 90);
    const innerForestRing = new THREE.Mesh(innerForestRingGeo, forestEmeraldMat);
    innerForestRing.rotation.y = Math.PI * 0.28;
    rootSculptureGroup.add(innerForestRing);

    // Part 5 & 6: Sculpted 3D Lotus Petals (ExtrudeGeometry with bevels)
    const lotusGroup = new THREE.Group();
    rootSculptureGroup.add(lotusGroup);

    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.38, 0.35, 0.45, 1.05, 0, 1.55);
    petalShape.bezierCurveTo(-0.45, 1.05, -0.38, 0.35, 0, 0);

    const petalExtrudeGeo = new THREE.ExtrudeGeometry(petalShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    petalExtrudeGeo.center();

    const petalCount = 8;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalMesh = new THREE.Mesh(
        petalExtrudeGeo,
        i % 2 === 0 ? terracottaClayMat : sageCeramicMat
      );
      petalMesh.position.set(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0);
      petalMesh.rotation.z = angle - Math.PI / 2;
      petalMesh.rotation.x = 0.28;
      lotusGroup.add(petalMesh);
    }

    // Part 7: Central Atman Core Sphere + Brushed Ring
    const coreSphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const coreSphere = new THREE.Mesh(coreSphereGeo, brushedMarigoldMat);
    rootSculptureGroup.add(coreSphere);

    const coreOrbitGeo = new THREE.TorusGeometry(0.68, 0.03, 16, 64);
    const coreOrbit = new THREE.Mesh(coreOrbitGeo, inkAccentMat);
    rootSculptureGroup.add(coreOrbit);

    // Part 8: 3D Harmonic Prana Breath Ribbon (TubeGeometry along a 3D harmonic curve)
    const curvePoints: THREE.Vector3[] = [];
    const totalCurvePts = 80;
    for (let i = 0; i <= totalCurvePts; i++) {
      const t = (i / totalCurvePts) * Math.PI * 2;
      const x = Math.cos(t * 2) * 2.9;
      const y = Math.sin(t * 3) * 1.9;
      const z = Math.sin(t * 2) * 0.9;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const pranaCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    const pranaTubeGeo = new THREE.TubeGeometry(pranaCurve, 140, 0.032, 12, true);
    const pranaTube = new THREE.Mesh(pranaTubeGeo, forestEmeraldMat);
    rootSculptureGroup.add(pranaTube);

    // Part 9: Full-Width Flowing Prana Silk Wave Ribbon across Lower Horizon (onBeforeCompile PBR extension)
    const waveRibbonGeo = new THREE.PlaneGeometry(26, 5.5, 96, 24);
    const waveUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
    };

    const waveRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xd8e6d5,
      emissive: 0xf7d98c,
      emissiveIntensity: 0.12,
      roughness: 0.45,
      metalness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
    });

    waveRibbonMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = waveUniforms.uTime;
      shader.uniforms.uScroll = waveUniforms.uScroll;
      shader.vertexShader =
        `
        uniform float uTime;
        uniform float uScroll;
        ` +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
          #include <begin_vertex>
          float waveA = sin(transformed.x * 0.45 + uTime * 1.1 + uScroll * 4.0) * 0.55;
          float waveB = cos(transformed.y * 0.85 + uTime * 0.8) * 0.35;
          transformed.z += waveA + waveB;
          `
        );
    };

    const waveRibbonMesh = new THREE.Mesh(waveRibbonGeo, waveRibbonMat);
    waveRibbonMesh.position.set(0, -3.1, -1.8);
    waveRibbonMesh.rotation.x = -Math.PI * 0.34;
    scene.add(waveRibbonMesh);

    // Part 10: 48 Instanced Floating Prana Sunlit Orbs (THREE.InstancedMesh)
    const orbCount = 48;
    const orbGeo = new THREE.SphereGeometry(0.085, 14, 14);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.4,
    });
    const instancedOrbs = new THREE.InstancedMesh(orbGeo, orbMat, orbCount);

    const paletteHexes = [0xf7d98c, 0xd8e6d5, 0xf3c6b6, 0xe2dcf5, 0x1b4332];
    const orbSeeds: {
      x: number;
      y: number;
      z: number;
      scale: number;
      speed: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < orbCount; i++) {
      const seed = {
        x: (Math.sin(i * 12.9898) * 0.5 + 0.5 - 0.5) * 18,
        y: (Math.cos(i * 78.233) * 0.5 + 0.5 - 0.5) * 11,
        z: (Math.sin(i * 37.719) * 0.5 + 0.5 - 0.5) * 5 - 1.5,
        scale: 0.7 + (i % 5) * 0.14,
        speed: 0.35 + (i % 4) * 0.15,
        phase: i * 0.6,
      };
      orbSeeds.push(seed);

      _dummy.position.set(seed.x, seed.y, seed.z);
      _dummy.scale.setScalar(seed.scale);
      _dummy.updateMatrix();
      instancedOrbs.setMatrixAt(i, _dummy.matrix);

      _tempColor.setHex(paletteHexes[i % paletteHexes.length]);
      instancedOrbs.setColorAt(i, _tempColor);
    }
    instancedOrbs.instanceMatrix.needsUpdate = true;
    if (instancedOrbs.instanceColor) instancedOrbs.instanceColor.needsUpdate = true;
    instancedOrbs.computeBoundingSphere();
    scene.add(instancedOrbs);

    // Pre-compile shaders once
    renderer.compile(scene, camera);

    // Pointer & Scroll tracking for silky exponential damping
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;
    let smoothedScroll = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetPointerX = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleWindowScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      // Adjust sculpture horizontal offset on mobile vs desktop
      rootSculptureGroup.position.x = newW < 768 ? 0 : 2.35;
    };

    handleResize();
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop with THREE.Clock & THREE.MathUtils.damp
    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Exponential damping for pointer and scroll
      currentPointerX = THREE.MathUtils.damp(currentPointerX, targetPointerX, 4.0, delta);
      currentPointerY = THREE.MathUtils.damp(currentPointerY, targetPointerY, 4.0, delta);
      smoothedScroll = THREE.MathUtils.damp(smoothedScroll, scrollRef.current, 5.0, delta);

      waveUniforms.uTime.value = elapsed;
      waveUniforms.uScroll.value = smoothedScroll;

      // Pranayama 4-second breath expansion cycle
      const breathPulse = 1 + Math.sin(elapsed * 1.35) * 0.065;

      // Sculptural Asana & Mandala progression driven by scroll + breath
      rootSculptureGroup.rotation.y = currentPointerX * 0.35 + smoothedScroll * Math.PI * 0.85;
      rootSculptureGroup.rotation.x = -currentPointerY * 0.25 + Math.sin(elapsed * 0.4) * 0.08;
      rootSculptureGroup.position.y =
        0.15 + Math.sin(elapsed * 0.7) * 0.18 + (0.5 - smoothedScroll) * 0.6;

      outerChakraRing.rotation.z = elapsed * 0.18 + smoothedScroll * Math.PI * 1.4;
      outerChakraRing.rotation.x = Math.sin(elapsed * 0.35) * 0.35 + smoothedScroll * 0.8;

      midSageRing.rotation.y = -elapsed * 0.24 - smoothedScroll * Math.PI;
      midSageRing.rotation.z = elapsed * 0.12;

      innerForestRing.rotation.x = elapsed * 0.32 + smoothedScroll * Math.PI * 1.6;
      innerForestRing.scale.setScalar(breathPulse);

      lotusGroup.rotation.z = -elapsed * 0.15 + smoothedScroll * Math.PI * 0.9;
      lotusGroup.scale.setScalar(breathPulse);

      coreSphere.scale.setScalar(0.95 + Math.sin(elapsed * 2.0) * 0.1);
      coreOrbit.rotation.x = elapsed * 0.7;
      coreOrbit.rotation.y = elapsed * 0.5;

      pranaTube.rotation.z = elapsed * 0.1 + smoothedScroll * 1.2;
      auraDisc.rotation.z = -elapsed * 0.06 - smoothedScroll * 0.8;

      // Update floating instanced prana orbs (Zero-GC)
      for (let i = 0; i < orbCount; i++) {
        const s = orbSeeds[i];
        const yOffset = Math.sin(elapsed * s.speed + s.phase) * 0.65;
        const xOffset = Math.cos(elapsed * (s.speed * 0.7) + s.phase) * 0.35;
        _dummy.position.set(
          s.x + xOffset + currentPointerX * 0.45,
          s.y + yOffset + (smoothedScroll - 0.5) * 2.2,
          s.z
        );
        _dummy.scale.setScalar(s.scale * (0.9 + Math.sin(elapsed * 1.5 + s.phase) * 0.15));
        _dummy.updateMatrix();
        instancedOrbs.setMatrixAt(i, _dummy.matrix);
      }
      instancedOrbs.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleResize);

      auraPlaneGeo.dispose();
      auraPlaneMat.dispose();
      sacredDialTexture.dispose();
      outerChakraRingGeo.dispose();
      midSageRingGeo.dispose();
      innerForestRingGeo.dispose();
      petalExtrudeGeo.dispose();
      coreSphereGeo.dispose();
      coreOrbitGeo.dispose();
      pranaTubeGeo.dispose();
      waveRibbonGeo.dispose();
      waveRibbonMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      brushedMarigoldMat.dispose();
      sageCeramicMat.dispose();
      terracottaClayMat.dispose();
      forestEmeraldMat.dispose();
      inkAccentMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  const currentStage =
    ASANA_SCROLL_STAGES[
      Math.max(0, Math.min(ASANA_SCROLL_STAGES.length - 1, activeStageIndex))
    ] || ASANA_SCROLL_STAGES[0];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Subtle Architectural Dot Grid matching #141413 Ink */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(#141413 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Layer 2: Unboxed Dynamic Palette-Matched Yoga Photography Aura (Embedded directly into background, no container box!) */}
      {mode === 'three-hybrid' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: 0.24,
            mixBlendMode: 'multiply',
            WebkitMaskImage:
              'radial-gradient(ellipse 72% 68% at 72% 46%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.45) 58%, transparent 92%)',
            maskImage:
              'radial-gradient(ellipse 72% 68% at 72% 46%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.45) 58%, transparent 92%)',
          }}
        >
          <img
            src={currentStage.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
            style={{
              filter: 'sepia(0.28) saturate(0.85) contrast(1.06)',
            }}
          />
        </div>
      )}

      {/* Layer 3: Full-Viewport Three.js WebGL 3D Prana & Lotus Mandala Canvas */}
      <div
        ref={canvasMountRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          mode === 'state-1-classic' ? 'opacity-20' : 'opacity-45'
        }`}
      />
    </div>
  );
}
