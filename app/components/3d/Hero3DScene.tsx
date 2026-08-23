"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Compass } from "lucide-react";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { LightingRig } from "./LightingRig";
import { StageEnvironment } from "./StageEnvironment";
import { Fresher3DTitle } from "./Fresher3DTitle";
import * as THREE from "three";

function CameraController({ mousePos }: { mousePos: { x: number; y: number } }) {
  const vec = new THREE.Vector3();

  useFrame((state) => {
    // Parallax mouse follow camera control
    const targetX = mousePos.x * 0.8;
    const targetY = mousePos.y * 0.5 + 0.2;

    state.camera.position.lerp(vec.set(targetX, targetY, 7.5), 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Hero3DScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleExploreScroll = () => {
    const nextSection = document.getElementById("quick-access-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[620px] max-h-[900px] overflow-hidden bg-navy-950 rounded-3xl border border-navy-700/60 shadow-2xl mb-12">
      {/* 3D Canvas Background Scene */}
      <WebGLErrorBoundary>
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0.2, 7.5], fov: isMobile ? 55 : 45 }}
            dpr={[1, 1.5]}
            gl={{ powerPreference: "high-performance", antialias: true }}
          >
            <CameraController mousePos={mousePos} />
            <LightingRig />
            <StageEnvironment isMobile={isMobile} />
            <Fresher3DTitle isMobile={isMobile} />
          </Canvas>
        </div>
      </WebGLErrorBoundary>

      {/* Top Branding Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-bold tracking-wider pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>IICT BHADOHI • OFFICIAL EVENT PORTAL</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/70 backdrop-blur-md text-[11px] text-slate-400 border border-navy-700 pointer-events-auto">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>Interactive 3D Stage</span>
        </div>
      </div>

      {/* Hero Bottom CTA Content Overlay */}
      <div className="absolute bottom-8 left-0 right-0 z-10 text-center px-4 space-y-4 max-w-xl mx-auto pointer-events-auto">
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 uppercase drop-shadow-md">
          “A New Beginning. A Lifetime of Memories.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={handleExploreScroll}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 group cursor-pointer transition-all"
          >
            <span>Explore Experience</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            href="/help-hub"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs bg-navy-950/80 backdrop-blur-md hover:bg-navy-800 text-slate-200 border border-slate-700 hover:border-gold-500/40 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>Student Help Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
