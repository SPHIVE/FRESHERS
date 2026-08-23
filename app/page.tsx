"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";
import { QuickAccess3D } from "@/app/components/3d/QuickAccess3D";
import { Financial3DSection } from "@/app/components/3d/Financial3DSection";
import { ContributorsTeaser } from "@/app/components/3d/ContributorsTeaser";
import { HelpHubPortal } from "@/app/components/3d/HelpHubPortal";
import { EventTeaserScene } from "@/app/components/3d/EventTeaserScene";

export default function LandingPage() {
  const handleExploreClick = () => {
    const nextSection = document.getElementById("quick-access-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative text-[#F4F1EA] selection:bg-[#D8B56A] selection:text-[#050914] pb-16">
      {/* 1. Full-Screen 100vw x 100dvh 3D Scene Background */}
      <SceneCanvas />

      {/* 2. Hero Viewport Overlay (Matching input_file_0.png) */}
      <div className="relative z-10 min-h-[92vh] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        {/* Spacer top for floating Navbar */}
        <div className="h-16" />

        {/* Center Tagline & Gold Pill CTA Button */}
        <div className="text-center space-y-4 max-w-xl mx-auto my-auto pt-36 sm:pt-48 pointer-events-auto">
          <p className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F4F1EA] uppercase drop-shadow-md">
            IICT BHADOHI
          </p>

          <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase drop-shadow-md">
            A NEW BEGINNING. A LIFETIME OF MEMORIES.
          </p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={handleExploreClick}
              className="px-8 py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2.5 group cursor-pointer transition-all uppercase tracking-widest hover:scale-105"
            >
              <span>EXPLORE EXPERIENCE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Social Links (Left), Scroll Indicator (Center), Transparency Badge (Right) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto text-[11px] text-slate-400 font-semibold tracking-widest uppercase border-t border-navy-800/40">
          {/* Social Media Links (Matching reference left bottom) */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full bg-navy-900/80 border border-navy-700 flex items-center justify-center text-slate-300 hover:text-[#D8B56A] hover:border-[#D8B56A]/40 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-7 h-7 rounded-full bg-navy-900/80 border border-navy-700 flex items-center justify-center text-slate-300 hover:text-[#D8B56A] hover:border-[#D8B56A]/40 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-7 h-7 rounded-full bg-navy-900/80 border border-navy-700 flex items-center justify-center text-slate-300 hover:text-[#D8B56A] hover:border-[#D8B56A]/40 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-full bg-navy-900/80 border border-navy-700 flex items-center justify-center text-slate-300 hover:text-[#D8B56A] hover:border-[#D8B56A]/40 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Mouse Icon + Scroll to Explore (Center bottom) */}
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={handleExploreClick}>
            <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#D8B56A] animate-bounce" />
            </div>
            <span className="text-[10px]">SCROLL TO EXPLORE</span>
          </div>

          {/* Transparency Assurance Badge (Right bottom) */}
          <div className="flex items-center gap-2 text-right">
            <ShieldCheck className="w-4 h-4 text-[#D8B56A] shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-slate-200 font-bold">100% TRANSPARENT</span>
              <span className="text-[9px] text-slate-400">EVERY PENNY ACCOUNTED FOR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Lower Homepage Interactive 3D Journey Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-16 pt-12">
        <QuickAccess3D />
        <Financial3DSection totalCollected={0} totalExpenses={0} />
        <ContributorsTeaser contributors={[]} />
        <HelpHubPortal />
        <EventTeaserScene />
      </div>
    </div>
  );
}
