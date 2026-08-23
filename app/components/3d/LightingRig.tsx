"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function LightingRig() {
  const spotLeftRef = useRef<THREE.SpotLight>(null);
  const spotRightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (spotLeftRef.current) {
      spotLeftRef.current.position.x = Math.sin(t * 0.8) * 4 - 3;
      spotLeftRef.current.position.z = Math.cos(t * 0.8) * 2 + 3;
    }

    if (spotRightRef.current) {
      spotRightRef.current.position.x = Math.cos(t * 0.8) * 4 + 3;
      spotRightRef.current.position.z = Math.sin(t * 0.8) * 2 + 3;
    }
  });

  return (
    <>
      {/* Ambient Dark Navy/Gold Baseline Light */}
      <ambientLight intensity={0.4} color="#111726" />

      {/* Main Overhead Gold Key Light */}
      <directionalLight
        position={[0, 10, 6]}
        intensity={1.8}
        color="#f5d77f"
        castShadow
      />

      {/* Cool Silver/Blue Fill Light */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.7}
        color="#94a3b8"
      />

      {/* Moving Concert Spotlight 1 (Gold Accent) */}
      <spotLight
        ref={spotLeftRef}
        position={[-4, 7, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={3.5}
        color="#d4af37"
        distance={25}
      />

      {/* Moving Concert Spotlight 2 (Silver/Bright White Accent) */}
      <spotLight
        ref={spotRightRef}
        position={[4, 7, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.8}
        color="#f8fafc"
        distance={25}
      />

      {/* Bottom Rim Glow */}
      <pointLight position={[0, -2.5, 2]} intensity={1.2} color="#f5d77f" distance={10} />
    </>
  );
}
