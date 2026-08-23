"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function DataRings() {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const midRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Cool Precision Glass Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#244C7A"
          metalness={0.8}
          roughness={0.2}
          emissive="#244C7A"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh ref={midRingRef} rotation={[-Math.PI / 4, 0, Math.PI / 3]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#D8B56A" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating Geometric Node */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#081221"
            wireframe={true}
            emissive="#244C7A"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function FinanceHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 5]} intensity={1.5} color="#244C7A" />
        <pointLight position={[-4, -3, 2]} intensity={1.2} color="#D8B56A" />
        <Environment preset="city" environmentIntensity={1.2} />
        <DataRings />
      </Canvas>
    </div>
  );
}
