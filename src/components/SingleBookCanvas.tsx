"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { BookVolume } from "@/data/portfolio";
import { getBookCoverTexture } from "@/lib/bookCoverTexture";

function FloatingBook({
  volume,
  accentHex,
  motionEnabled,
}: {
  volume: BookVolume;
  accentHex: string;
  motionEnabled: boolean;
}) {
  const { scene } = useGLTF("/assets/books/book_glb_source/source/book.glb");
  const ref = useRef<THREE.Group>(null);

  const cloned = useMemo(() => {
    const c = cloneSkinned(scene);
    const tex = getBookCoverTexture(volume, accentHex);
    c.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.name === "book_u") {
          const clonedMat = mat.clone();
          clonedMat.map = tex;
          clonedMat.roughness = 0.65;
          clonedMat.needsUpdate = true;
          mesh.material = clonedMat;
        }
      }
    });
    return c;
  }, [scene, volume, accentHex]);

  useFrame((state, delta) => {
    if (!ref.current || !motionEnabled) return;
    ref.current.rotation.y += delta * 0.45;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.1) * 0.04;
  });

  return (
    <group
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0.06, 0.75, -0.08]}
      scale={6.4}
    >
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <primitive object={cloned} />
      </group>
    </group>
  );
}

export function SingleBookCanvas({
  volume,
  accentHex,
  motionEnabled,
}: {
  volume: BookVolume;
  accentHex: string;
  motionEnabled: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.12, 3.1], fov: 35 }}
      >
        <ambientLight intensity={1.4} />
        <hemisphereLight args={["#fff8eb", "#2a241f", 0.55]} />
        <directionalLight position={[3, 5, 4]} intensity={1.45} />
        <directionalLight position={[-3, 2, -4]} intensity={0.65} />
        <Suspense fallback={null}>
          <FloatingBook
            volume={volume}
            accentHex={accentHex}
            motionEnabled={motionEnabled}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
