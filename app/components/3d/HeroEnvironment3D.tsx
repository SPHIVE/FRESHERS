"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnvironmentProps {
  isMobile?: boolean;
}

export function HeroEnvironment3D({ isMobile = false }: EnvironmentProps) {
  const stageRef = useRef<THREE.Group>(null);
  const trussRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const polyhedraGroupRef = useRef<THREE.Group>(null);

  // Floating Particle System (Gold and Silver Confetti)
  const particleCount = isMobile ? 90 : 220;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color("#D8B56A");
    const silverColor = new THREE.Color("#e2e8f0");

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 14 - 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      const isGold = Math.random() > 0.35;
      const c = isGold ? goldColor : silverColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [particleCount]);

  // Floating Polyhedra / Diamonds
  const polyhedraCount = isMobile ? 6 : 14;
  const polyhedraData = useMemo(() => {
    return Array.from({ length: polyhedraCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * 16,
        Math.random() * 8 - 1,
        (Math.random() - 0.5) * 12 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.15,
      rotSpeed: (Math.random() - 0.5) * 0.8,
    }));
  }, [polyhedraCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += delta * 0.25;
        if (posArr[i * 3 + 1] > 9) {
          posArr[i * 3 + 1] = -3;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (polyhedraGroupRef.current) {
      polyhedraGroupRef.current.children.forEach((child, idx) => {
        child.rotation.x += delta * (0.3 + idx * 0.05);
        child.rotation.y += delta * (0.4 + idx * 0.05);
      });
    }

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.03;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Fog for Atmospheric Depth */}
      <fog attach="fog" args={["#050914", 4, 28]} />

      {/* =================================================== */}
      {/* OVERHEAD CONCERT LIGHTING TRUSS / RIG */}
      {/* =================================================== */}
      <group ref={trussRef} position={[0, 5.2, -1]}>
        {/* Main Circular Truss Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.2, 0.12, 16, 64]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Truss Fixture Lights */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 5.2;
          const z = Math.sin(angle) * 5.2;
          const isGoldFixture = i % 2 === 0;

          return (
            <group key={i} position={[x, 0, z]}>
              <mesh>
                <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
              </mesh>
              <pointLight
                intensity={1.2}
                distance={6}
                color={isGoldFixture ? "#D8B56A" : "#6C63A8"}
              />
            </group>
          );
        })}
      </group>

      {/* =================================================== */}
      {/* MAIN ARCHITECTURAL CONCERT STAGE PEDESTAL */}
      {/* =================================================== */}
      <group ref={stageRef} position={[0, -2.8, 0]}>
        {/* Glossy Dark Reflective Stage Floor */}
        <mesh position={[0, -0.25, 0]} receiveShadow>
          <cylinderGeometry args={[4.8, 5.5, 0.5, 64]} />
          <meshStandardMaterial
            color="#081221"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Champagne Gold Ring (#D8B56A) */}
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <ringGeometry args={[4.5, 4.75, 64]} />
          <meshStandardMaterial
            color="#D8B56A"
            metalness={0.95}
            roughness={0.1}
            emissive="#7f6014"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Glowing Stage Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 2.9, 64]} />
          <meshBasicMaterial color="#F1D28A" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* =================================================== */}
      {/* FLOATING METALLIC POLYHEDRA / DIAMONDS */}
      {/* =================================================== */}
      <group ref={polyhedraGroupRef}>
        {polyhedraData.map((item, idx) => (
          <mesh key={idx} position={item.position} scale={item.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#f8fafc" : "#D8B56A"}
              metalness={0.95}
              roughness={0.15}
              envMapIntensity={2}
            />
          </mesh>
        ))}
      </group>

      {/* =================================================== */}
      {/* FLOATING DUST & CONFETTI PARTICLES */}
      {/* =================================================== */}
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
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
