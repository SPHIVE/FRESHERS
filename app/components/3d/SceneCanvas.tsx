"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { LightingSystem } from "./LightingSystem";
import { HeroEnvironment3D } from "./HeroEnvironment3D";
import { FresherTypography3D } from "./FresherTypography3D";
import { NavDestinations3D } from "./NavDestinations3D";
import { CameraJourneyController } from "./CameraJourneyController";

export function SceneCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 w-screen h-screen min-h-screen z-0 pointer-events-none bg-[#050914] overflow-hidden">
        <Canvas
          camera={{
            position: isMobile ? [0, 0.4, 9.2] : [0, 0.3, 7.5],
            fov: isMobile ? 52 : 42,
          }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: true }}
        >
          <CameraJourneyController
            mousePos={mousePos}
            onScrollProgress={setScrollProgress}
          />
          <LightingSystem scrollProgress={scrollProgress} />
          <HeroEnvironment3D isMobile={isMobile} />
          <FresherTypography3D isMobile={isMobile} />
          <NavDestinations3D />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
