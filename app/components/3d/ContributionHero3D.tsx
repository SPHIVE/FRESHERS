"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function ConvergingParticles() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Central Symbolic Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#081221"
            metalness={0.9}
            roughness={0.1}
            emissive="#D8B56A"
            emissiveIntensity={0.25}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Orbiting Concentric Warm Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.025, 16, 100]} />
        <meshStandardMaterial color="#D8B56A" metalness={0.95} roughness={0.05} />
      </mesh>

      <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.0, 0.02, 16, 100]} />
        <meshStandardMaterial color="#F1D28A" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function ContributionHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#F1D28A" />
        <pointLight position={[-3, -4, -2]} intensity={1.2} color="#D8B56A" />
        <Environment preset="studio" environmentIntensity={1.4} />
        <ConvergingParticles />
        <Sparkles count={55} scale={7} size={2} speed={0.5} color="#F1D28A" opacity={0.7} />
      </Canvas>
    </div>
  );
}
