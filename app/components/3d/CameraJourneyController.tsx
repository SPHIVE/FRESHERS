"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraProps {
  mousePos: { x: number; y: number };
  isMobile?: boolean;
  onScrollProgress?: (progress: number) => void;
}

export function CameraJourneyController({
  mousePos,
  isMobile = false,
  onScrollProgress,
}: CameraProps) {
  const vec = useRef(new THREE.Vector3());
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      scrollProgressRef.current = progress;
      if (onScrollProgress) {
        onScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollProgress]);

  useFrame((state) => {
    const p = scrollProgressRef.current;

    // Mouse parallax effect
    const mouseX = mousePos.x * (isMobile ? 0.3 : 0.6);
    const mouseY = mousePos.y * (isMobile ? 0.2 : 0.35) + (isMobile ? 0.35 : 0.2);

    const baseZ = isMobile ? 9.8 : 7.8;
    const targetZ = baseZ - p * 21;
    const targetY = mouseY + p * 0.5;
    const targetX = mouseX + (p > 0.3 ? (p - 0.3) * 2.5 : 0);

    state.camera.position.lerp(
      vec.current.set(targetX, targetY, targetZ),
      0.05
    );

    // Look target shifts smoothly as camera pushes forward
    const lookZ = -p * 20;
    state.camera.lookAt(0, 0, lookZ);
  });

  return null;
}

