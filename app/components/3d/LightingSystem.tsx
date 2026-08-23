"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LightingProps {
  scrollProgress?: number;
}

export function LightingSystem({ scrollProgress = 0 }: LightingProps) {
  const spotLeftRef = useRef<THREE.SpotLight>(null);
  const spotRightRef = useRef<THREE.SpotLight>(null);
  const spotVioletRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (spotLeftRef.current) {
      spotLeftRef.current.position.x = Math.sin(t * 0.7) * 4 - 3;
      spotLeftRef.current.position.z = Math.cos(t * 0.7) * 2 + 3 - scrollProgress * 15;
    }

    if (spotRightRef.current) {
      spotRightRef.current.position.x = Math.cos(t * 0.7) * 4 + 3;
      spotRightRef.current.position.z = Math.sin(t * 0.7) * 2 + 3 - scrollProgress * 15;
    }

    if (spotVioletRef.current) {
      spotVioletRef.current.position.x = Math.sin(t * 0.5) * 5;
    }
  });

  const keyLightIntensity = 2.0 + scrollProgress * 0.5;

  return (
    <>
      {/* Dark Ambient Baseline */}
      <ambientLight intensity={0.45} color="#081221" />

      {/* Main Overhead Warm Champagne Key Light (#D8B56A) */}
      <directionalLight
        position={[0, 9, 6]}
        intensity={keyLightIntensity}
        color="#D8B56A"
        castShadow
      />

      {/* Cool Deep Electric Blue Rim Light (#244C7A) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={1.4}
        color="#244C7A"
      />

      {/* Warm Champagne Concert Spotlight 1 */}
      <spotLight
        ref={spotLeftRef}
        position={[-4, 7.5, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={3.8}
        color="#D8B56A"
        distance={32}
      />

      {/* Silver / Soft Ivory Concert Spotlight 2 */}
      <spotLight
        ref={spotRightRef}
        position={[4, 7.5, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={3.0}
        color="#F4F1EA"
        distance={32}
      />

      {/* Atmospheric Muted Violet Rim Beam (#6C63A8) */}
      <spotLight
        ref={spotVioletRef}
        position={[0, 8, -5]}
        angle={0.5}
        penumbra={0.9}
        intensity={2.2}
        color="#6C63A8"
        distance={30}
      />

      {/* Bottom Stage Glow */}
      <pointLight position={[0, -2.5, 2]} intensity={1.5} color="#D8B56A" distance={12} />
    </>
  );
}
