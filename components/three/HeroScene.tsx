"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

function DeformingPlane() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime() * 0.05;
    const geom = mesh.current.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const n = noise3D(x * 0.15, y * 0.15, time);
      pos.setZ(i, n * 0.25);
    }

    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[12, 12, 128, 128]} />
      <meshStandardMaterial
        color="#eaeaea"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <DeformingPlane />
    </Canvas>
  );
}
