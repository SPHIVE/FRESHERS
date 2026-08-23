"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnvironmentProps {
  isMobile?: boolean;
}

export function HeroEnvironment3D({ isMobile = false }: EnvironmentProps) {
  const stageRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = isMobile ? 80 : 200;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color("#D8B56A");
    const silverColor = new THREE.Color("#cbd5e1");

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 12 - 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      const isGold = Math.random() > 0.4;
      const c = isGold ? goldColor : silverColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += delta * 0.25;
        if (posArr[i * 3 + 1] > 8) {
          posArr[i * 3 + 1] = -3;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Fog for Atmospheric Depth */}
      <fog attach="fog" args={["#050914", 4, 26]} />

      {/* Main Architectural Concert Pedestal */}
      <group ref={stageRef} position={[0, -2.8, 0]}>
        {/* Dark Reflective Stage Floor */}
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <cylinderGeometry args={[4.5, 5.2, 0.5, 64]} />
          <meshStandardMaterial
            color="#081221"
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>

        {/* Outer Champagne Gold Ring (#D8B56A) */}
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <ringGeometry args={[4.2, 4.45, 64]} />
          <meshStandardMaterial
            color="#D8B56A"
            metalness={0.95}
            roughness={0.1}
            emissive="#7f6014"
            emissiveIntensity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Glowing Stage Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.6, 2.7, 64]} />
          <meshBasicMaterial color="#F1D28A" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Floating Dust & Confetti Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
