"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function StageRings() {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const coreMeshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2;
      outerRingRef.current.rotation.y += delta * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.3;
      innerRingRef.current.rotation.z += delta * 0.25;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Outer Champagne Gold Torus Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3.2, 0.04, 32, 100]} />
        <meshStandardMaterial
          color="#D8B56A"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Inner Champagne Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.4, 0.03, 32, 100]} />
        <meshStandardMaterial
          color="#F1D28A"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2.8}
        />
      </mesh>

      {/* Floating Abstract Stage Crystal Core */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh ref={coreMeshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#081221"
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
            emissive="#D8B56A"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function FreshersHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F1D28A" />
        <pointLight position={[-4, -3, -2]} intensity={1.2} color="#6C63A8" />
        <Environment preset="night" environmentIntensity={1.5} />
        <StageRings />
        <Sparkles count={40} scale={8} size={2.5} speed={0.4} color="#D8B56A" opacity={0.6} />
      </Canvas>
    </div>
  );
}
