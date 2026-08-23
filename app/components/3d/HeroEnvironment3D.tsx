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

  // Floating Particle System (Gold and Silver Confetti Dust)
  const particleCount = isMobile ? 100 : 250;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color("#D8B56A");
    const silverColor = new THREE.Color("#F4F1EA");

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 16 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      const isGold = Math.random() > 0.35;
      const c = isGold ? goldColor : silverColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [particleCount]);

  // Floating Polyhedra / Diamonds (Geometric background elements in reference image)
  const polyhedraCount = isMobile ? 8 : 16;
  const polyhedraData = useMemo(() => {
    return Array.from({ length: polyhedraCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * (isMobile ? 14 : 22),
        Math.random() * 10 - 2,
        (Math.random() - 0.5) * 14 - 3,
      ] as [number, number, number],
      scale: Math.random() * 0.35 + 0.18,
      rotSpeedX: (Math.random() - 0.5) * 0.6,
      rotSpeedY: (Math.random() - 0.5) * 0.6,
    }));
  }, [polyhedraCount, isMobile]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += delta * 0.2;
        if (posArr[i * 3 + 1] > 10) {
          posArr[i * 3 + 1] = -4;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (polyhedraGroupRef.current) {
      polyhedraGroupRef.current.children.forEach((child, idx) => {
        const item = polyhedraData[idx];
        if (item) {
          child.rotation.x += delta * item.rotSpeedX;
          child.rotation.y += delta * item.rotSpeedY;
        }
      });
    }

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Fog for Atmospheric Depth */}
      <fog attach="fog" args={["#050914", 5, 30]} />

      {/* =================================================== */}
      {/* OVERHEAD CONCERT LIGHTING TRUSS / RIG */}
      {/* =================================================== */}
      <group ref={trussRef} position={[0, 5.6, -1.2]}>
        {/* Main Circular Metal Truss Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[5.8, 0.14, 16, 64]} />
          <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Truss Fixture Spotlights */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const x = Math.cos(angle) * 5.8;
          const z = Math.sin(angle) * 5.8;
          const isGoldFixture = i % 2 === 0;

          return (
            <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <mesh rotation={[0.4, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.22, 0.45, 16]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Volumetric Beam Cones */}
              <mesh position={[0, -2.2, 0.8]} rotation={[0.4, 0, 0]}>
                <coneGeometry args={[0.6, 4.5, 32, 1, true]} />
                <meshBasicMaterial
                  color={isGoldFixture ? "#D8B56A" : "#6C63A8"}
                  transparent
                  opacity={0.12}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* =================================================== */}
      {/* MAIN ARCHITECTURAL CONCERT STAGE PEDESTAL */}
      {/* =================================================== */}
      <group ref={stageRef} position={[0, -2.7, 0]}>
        {/* Glossy Dark Reflective Stage Base */}
        <mesh position={[0, -0.3, 0]} receiveShadow>
          <cylinderGeometry args={[5.8, 6.8, 0.6, 64]} />
          <meshStandardMaterial
            color="#081221"
            metalness={0.96}
            roughness={0.06}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Outer Champagne Gold Stage Ring (#D8B56A) */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[5.3, 5.65, 64]} />
          <meshStandardMaterial
            color="#D8B56A"
            metalness={0.95}
            roughness={0.1}
            emissive="#7F6014"
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Glowing Stage Ring (#F1D28A) */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 3.75, 64]} />
          <meshBasicMaterial color="#F1D28A" side={THREE.DoubleSide} />
        </mesh>

        {/* Center Polished Stage Floor Disc */}
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[3.55, 64]} />
          <meshStandardMaterial
            color="#050914"
            metalness={0.98}
            roughness={0.04}
            envMapIntensity={3}
          />
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
              color={idx % 2 === 0 ? "#F4F1EA" : "#D8B56A"}
              metalness={0.95}
              roughness={0.12}
              envMapIntensity={2.5}
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
          size={isMobile ? 0.1 : 0.14}
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

