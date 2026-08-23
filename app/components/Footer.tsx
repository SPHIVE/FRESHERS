"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Do NOT render footer on homepage to preserve 100% full-screen 3D hero experience
  if (pathname === "/") return null;

  return (
    <footer className="relative z-10 border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 bg-[#050914]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[11px]">
          <span className="text-[#D8B56A]">UNOFFICIAL IICT</span>
          <span>•</span>
          <span>FRESHER PARTY 2026</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-400">
          <Link href="/freshers" className="hover:text-[#D8B56A] transition-colors">Freshers</Link>
          <Link href="/contributors" className="hover:text-[#D8B56A] transition-colors">Contributors</Link>
          <Link href="/finance" className="hover:text-[#D8B56A] transition-colors">Finance</Link>
          <Link href="/help-hub" className="hover:text-[#D8B56A] transition-colors">Help Hub</Link>
        </div>
        <p className="text-[10px] text-slate-500 font-medium">© 2026 IICT Student Association. All rights reserved.</p>
      </div>
    </footer>
  );
}
