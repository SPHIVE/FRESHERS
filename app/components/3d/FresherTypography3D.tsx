"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface TypographyProps {
  isMobile?: boolean;
}

export function FresherTypography3D({ isMobile = false }: TypographyProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle float oscillation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.05;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.02;
    }
  });

  const fontPath = "/fonts/helvetiker_bold.typeface.json";
  const titleSize = isMobile ? 0.72 : 1.35;
  const yearSize = isMobile ? 0.55 : 1.05;
  const heightExtrude = isMobile ? 0.18 : 0.32;
  const bevelThickness = isMobile ? 0.02 : 0.04;
  const bevelSize = isMobile ? 0.015 : 0.025;

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, 0.45, 0]}>
        {/* FRESHER - Brushed Chrome / Silver 3D Extrusion */}
        <Center position={[0, isMobile ? 1.0 : 1.45, 0]}>
          <Text3D
            font={fontPath}
            size={titleSize}
            height={heightExtrude}
            curveSegments={20}
            bevelEnabled
            bevelThickness={bevelThickness}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={6}
            letterSpacing={0.06}
            castShadow
            receiveShadow
          >
            FRESHER
            <meshStandardMaterial
              color="#F8FAFC"
              metalness={0.88}
              roughness={0.18}
              envMapIntensity={2.5}
            />
          </Text3D>
        </Center>

        {/* PARTY - Metallic Champagne Gold (#D8B56A) 3D Extrusion */}
        <Center position={[0, 0, 0]}>
          <Text3D
            font={fontPath}
            size={titleSize}
            height={heightExtrude}
            curveSegments={20}
            bevelEnabled
            bevelThickness={bevelThickness}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={6}
            letterSpacing={0.08}
            castShadow
            receiveShadow
          >
            PARTY
            <meshStandardMaterial
              color="#D8B56A"
              metalness={0.88}
              roughness={0.20}
              emissive="#7F6014"
              emissiveIntensity={0.25}
              envMapIntensity={2.2}
            />
          </Text3D>
        </Center>

        {/* 2026 - Warmer Illumination Gold (#F1D28A) 3D Extrusion */}
        <Center position={[0, isMobile ? -0.85 : -1.25, 0]}>
          <Text3D
            font={fontPath}
            size={yearSize}
            height={heightExtrude * 0.9}
            curveSegments={20}
            bevelEnabled
            bevelThickness={bevelThickness * 0.9}
            bevelSize={bevelSize * 0.9}
            bevelOffset={0}
            bevelSegments={6}
            letterSpacing={0.12}
            castShadow
            receiveShadow
          >
            2026
            <meshStandardMaterial
              color="#F1D28A"
              metalness={0.82}
              roughness={0.22}
              emissive="#D8B56A"
              emissiveIntensity={0.45}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}


