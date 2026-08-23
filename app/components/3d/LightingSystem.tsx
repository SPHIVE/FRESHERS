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
      spotLeftRef.current.position.x = Math.sin(t * 0.6) * 4.5 - 3;
      spotLeftRef.current.position.z = Math.cos(t * 0.6) * 2 + 3.5 - scrollProgress * 15;
    }

    if (spotRightRef.current) {
      spotRightRef.current.position.x = Math.cos(t * 0.6) * 4.5 + 3;
      spotRightRef.current.position.z = Math.sin(t * 0.6) * 2 + 3.5 - scrollProgress * 15;
    }

    if (spotVioletRef.current) {
      spotVioletRef.current.position.x = Math.sin(t * 0.4) * 4;
    }
  });

  const keyLightIntensity = 2.4 + scrollProgress * 0.4;

  return (
    <>
      {/* Deep Atmospheric Baseline Ambient Light (#081221) */}
      <ambientLight intensity={0.65} color="#081221" />

      {/* Main Overhead Warm Champagne Key Light (#D8B56A) */}
      <directionalLight
        position={[0, 10, 6.5]}
        intensity={keyLightIntensity}
        color="#D8B56A"
        castShadow
      />

      {/* Direct Front Fill Light for Metallic 3D Typography Brilliance */}
      <directionalLight
        position={[0, 2.5, 9]}
        intensity={2.8}
        color="#FFF8EA"
      />

      {/* Cool Deep Electric Blue Rim Light (#244C7A) */}
      <directionalLight
        position={[-7, 4.5, -4]}
        intensity={1.8}
        color="#244C7A"
      />

      {/* Warm Champagne Concert Spotlight 1 */}
      <spotLight
        ref={spotLeftRef}
        position={[-4.5, 8, 3.5]}
        angle={0.48}
        penumbra={0.8}
        intensity={4.2}
        color="#D8B56A"
        distance={34}
      />

      {/* Silver / Soft Champagne Concert Spotlight 2 */}
      <spotLight
        ref={spotRightRef}
        position={[4.5, 8, 3.5]}
        angle={0.48}
        penumbra={0.8}
        intensity={3.4}
        color="#F4F1EA"
        distance={34}
      />

      {/* Atmospheric Muted Violet Rim Beam (#6C63A8) */}
      <spotLight
        ref={spotVioletRef}
        position={[0, 8.5, -5.5]}
        angle={0.52}
        penumbra={0.85}
        intensity={2.4}
        color="#6C63A8"
        distance={32}
      />

      {/* Bottom Reflective Stage Glow */}
      <pointLight position={[0, -2.4, 2.5]} intensity={2.2} color="#D8B56A" distance={14} />
    </>
  );
}


