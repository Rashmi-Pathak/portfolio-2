"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { BookVolume } from "@/data/portfolio";
import { getBookCoverTexture } from "@/lib/bookCoverTexture";

const SHELF_STAGGER = [
  { y: 0.0, z: 0.0, rotZ: 0.0 },
  { y: -0.02, z: 0.03, rotZ: 0.03 },
  { y: 0.02, z: -0.02, rotZ: 0.0 },
  { y: -0.01, z: 0.04, rotZ: -0.035 },
  { y: 0.03, z: -0.01, rotZ: 0.0 },
  { y: 0.0, z: 0.02, rotZ: 0.025 },
  { y: -0.02, z: 0.0, rotZ: 0.0 },
  { y: 0.02, z: 0.03, rotZ: -0.03 },
  { y: 0.0, z: -0.02, rotZ: 0.0 },
  { y: -0.015, z: 0.02, rotZ: 0.03 },
  { y: 0.02, z: 0.0, rotZ: 0.0 },
  { y: -0.01, z: 0.03, rotZ: -0.025 },
  { y: 0.015, z: -0.01, rotZ: 0.0 },
  { y: -0.02, z: 0.02, rotZ: 0.03 },
  { y: 0.01, z: 0.0, rotZ: 0.0 },
  { y: -0.01, z: 0.03, rotZ: -0.15 },
];

interface BookInstanceProps {
  volume: BookVolume;
  index: number;
  total: number;
  isActive: boolean;
  accentHex: string;
  motionEnabled: boolean;
  onHover: (idx: number | null) => void;
}

function BookMeshInstance({
  volume,
  index,
  total,
  isActive,
  accentHex,
  motionEnabled,
  onHover,
}: BookInstanceProps) {
  const { scene } = useGLTF("/assets/books/book_glb_source/source/book.glb");
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const c = cloneSkinned(scene);
    const coverTex = getBookCoverTexture(volume, accentHex);

    c.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.name === "book_u") {
          const clonedMat = mat.clone();
          clonedMat.map = coverTex;
          clonedMat.roughness = 0.65;
          clonedMat.metalness = 0.05;
          clonedMat.needsUpdate = true;
          mesh.material = clonedMat;
        } else if (mat && mat.name === "book_pages") {
          const pagesMat = mat.clone();
          pagesMat.roughness = 0.85;
          pagesMat.needsUpdate = true;
          mesh.material = pagesMat;
        }
      }
    });
    return c;
  }, [scene, volume, accentHex]);

  const center = (total - 1) / 2;
  const stagger = SHELF_STAGGER[index % SHELF_STAGGER.length];

  const baseX = (index - center) * 0.195 + (index === total - 1 ? 0.04 : 0);
  const baseY = isActive ? 0.04 : stagger.y;
  const baseZ = isActive ? 0.78 : stagger.z;
  const baseRotY = isActive
    ? Math.PI - 1.15
    : Math.PI + (index - center) * 0.015;
  const baseRotZ = isActive ? 0.02 : stagger.rotZ;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const speed = motionEnabled ? Math.min(1, delta * 9) : 1;
    const floatOffset =
      motionEnabled && isActive
        ? Math.sin(state.clock.getElapsedTime() * 2.2) * 0.035
        : 0;
    const targetY = baseY + floatOffset;

    if (
      Math.abs(g.position.z - baseZ) > 0.001 ||
      Math.abs(g.position.y - targetY) > 0.001 ||
      Math.abs(g.rotation.y - baseRotY) > 0.001 ||
      Math.abs(g.rotation.z - baseRotZ) > 0.001
    ) {
      g.position.x = THREE.MathUtils.lerp(g.position.x, baseX, speed);
      g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, speed);
      g.position.z = THREE.MathUtils.lerp(g.position.z, baseZ, speed);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, baseRotY, speed);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, baseRotZ, speed);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[baseX, baseY, baseZ]}
      rotation={[0, baseRotY, baseRotZ]}
      scale={4.8}
      onClick={(e) => {
        e.stopPropagation();
        onHover(isActive ? null : index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(index);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
        onHover(null);
      }}
    >
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

function FloatingShelfGroup({
  volumes,
  activeIndex,
  accentHex,
  motionEnabled,
  onHoverIndex,
}: {
  volumes: BookVolume[];
  activeIndex: number | null;
  accentHex: string;
  motionEnabled: boolean;
  onHoverIndex: (idx: number | null) => void;
}) {
  const shelfRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!shelfRef.current || !motionEnabled) return;
    const t = state.clock.getElapsedTime();
    shelfRef.current.position.y = -0.05 + Math.sin(t * 1.15) * 0.035;
  });

  return (
    <group ref={shelfRef} position={[0, -0.05, 0]}>
      {volumes.map((vol, idx) => (
        <BookMeshInstance
          key={vol.id}
          volume={vol}
          index={idx}
          total={volumes.length}
          isActive={activeIndex === idx}
          accentHex={accentHex}
          motionEnabled={motionEnabled}
          onHover={onHoverIndex}
        />
      ))}
    </group>
  );
}

interface BookShelfCanvasProps {
  volumes: BookVolume[];
  activeIndex: number | null;
  accentHex: string;
  motionEnabled: boolean;
  onHoverIndex: (idx: number | null) => void;
}

export function BookShelfCanvas({
  volumes,
  activeIndex,
  accentHex,
  motionEnabled,
  onHoverIndex,
}: BookShelfCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0.05, 0.22, 4.45], fov: 38 }}
        className="h-full w-full"
        onPointerLeave={() => onHoverIndex(null)}
      >
        <ambientLight intensity={1.35} />
        <hemisphereLight args={["#fff8eb", "#2a241f", 0.55]} />
        <directionalLight position={[4, 6, 5]} intensity={1.45} />
        <directionalLight position={[-4, 3, -2]} intensity={0.45} />
        <Suspense fallback={null}>
          <FloatingShelfGroup
            volumes={volumes}
            activeIndex={activeIndex}
            accentHex={accentHex}
            motionEnabled={motionEnabled}
            onHoverIndex={onHoverIndex}
          />
          <ContactShadows
            frames={1}
            resolution={256}
            position={[0, -0.78, 0]}
            opacity={0.3}
            scale={10}
            blur={2.0}
            far={2.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/books/book_glb_source/source/book.glb");
