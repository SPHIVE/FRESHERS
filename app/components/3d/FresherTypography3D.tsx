"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Center } from "@react-three/drei";
import * as THREE from "three";

interface TypographyProps {
  isMobile?: boolean;
}

export function FresherTypography3D({ isMobile = false }: TypographyProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle float oscillation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.02;
    }
  });

  const titleSize = isMobile ? 1.1 : 1.85;
  const yearSize = isMobile ? 0.85 : 1.35;

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0.4, 0]}>
        {/* FRESHER - Brushed Silver/Chrome */}
        <Center position={[0, 1.35, 0]}>
          <Text
            fontSize={titleSize}
            fontStyle="italic"
            letterSpacing={0.12}
            lineHeight={1}
            castShadow
            receiveShadow
          >
            FRESHER
            <meshStandardMaterial
              color="#f1f5f9"
              metalness={0.95}
              roughness={0.1}
              envMapIntensity={2.5}
            />
          </Text>
        </Center>

        {/* PARTY - Metallic Champagne Gold (#D8B56A) */}
        <Center position={[0, 0, 0]}>
          <Text
            fontSize={titleSize}
            letterSpacing={0.18}
            lineHeight={1}
            castShadow
            receiveShadow
          >
            PARTY
            <meshStandardMaterial
              color="#D8B56A"
              metalness={0.9}
              roughness={0.15}
              emissive="#7f6014"
              emissiveIntensity={0.2}
            />
          </Text>
        </Center>

        {/* 2026 - Glowing Emissive Gold (#F1D28A) */}
        <Center position={[0, -1.15, 0]}>
          <Text
            fontSize={yearSize}
            letterSpacing={0.3}
            lineHeight={1}
          >
            2026
            <meshStandardMaterial
              color="#F1D28A"
              metalness={0.8}
              roughness={0.2}
              emissive="#D8B56A"
              emissiveIntensity={0.55}
            />
          </Text>
        </Center>
      </group>
    </Float>
  );
}
