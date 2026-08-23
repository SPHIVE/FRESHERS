"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StageProps {
  isMobile?: boolean;
}

export function StageEnvironment({ isMobile = false }: StageProps) {
  const stageRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate floating gold/silver particle positions
  const particleCount = isMobile ? 70 : 180;
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);

    const goldColor = new THREE.Color("#d4af37");
    const silverColor = new THREE.Color("#e2e8f0");

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 9 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const isGold = Math.random() > 0.35;
      const c = isGold ? goldColor : silverColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() * 0.12 + 0.04;
    }
    return [pos, col, siz];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += delta * 0.3;
        if (posArr[i * 3 + 1] > 7) {
          posArr[i * 3 + 1] = -2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={stageRef} position={[0, -2.8, 0]}>
      {/* Concert Stage Base Pedestal */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.8, 0.5, 64]} />
        <meshStandardMaterial
          color="#0b0f19"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Metallic Ring */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <ringGeometry args={[4.0, 4.25, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.1}
          emissive="#aa8625"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Glowing Stage Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial color="#f5d77f" side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Particles / Confetti */}
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
          size={0.14}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
