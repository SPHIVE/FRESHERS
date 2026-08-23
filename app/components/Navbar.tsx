"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, LogOut, Menu, X, User } from "lucide-react";
import { logoutUserAction } from "@/app/actions/auth";

interface UserProfileProps {
  full_name: string;
  approval_status: "pending" | "approved" | "rejected";
  is_admin: boolean;
}

export function Navbar({ profile }: { profile: UserProfileProps | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-auto bg-[#050914]/60 backdrop-blur-xl border-b border-[#D8B56A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Left Logo & Branding (Crest + Text - matching input_file_0.png) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)] group-hover:scale-105 group-hover:border-[#D8B56A] transition-all">
            <Sparkles className="w-5 h-5 text-[#D8B56A]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-widest text-[#F4F1EA] uppercase">
              IICT
            </span>
            <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
              BHADOHI
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop - matching reference image) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-300">
          <Link href="/" className="text-[#D8B56A] hover:text-[#F1D28A] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#D8B56A] after:rounded-full">
            HOME
          </Link>
          <a href="#quick-access-section" className="hover:text-[#D8B56A] transition-colors">
            ABOUT
          </a>
          <a href="#legendary-section" className="hover:text-[#D8B56A] transition-colors">
            EVENT
          </a>
          <a href="#contributors-section" className="hover:text-[#D8B56A] transition-colors">
            CONTRIBUTORS
          </a>
          <Link href="/help-hub" className="hover:text-[#D8B56A] transition-colors">
            HELP HUB
          </Link>
          <a href="#financial-section" className="hover:text-[#D8B56A] transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Right Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {profile ? (
            <div className="flex items-center gap-3">
              {profile.approval_status === "approved" && (
                <Link
                  href="/dashboard"
                  className="text-xs font-bold uppercase text-slate-300 hover:text-[#D8B56A] transition-colors"
                >
                  Dashboard
                </Link>
              )}
              {profile.is_admin && (
                <Link
                  href="/admin/students"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#D8B56A]/15 text-[#D8B56A] border border-[#D8B56A]/40 hover:bg-[#D8B56A]/25 transition-all"
                >
                  <Shield className="w-3.5 h-3.5" />
                  ADMIN
                </Link>
              )}
              <div className="flex items-center gap-1.5 text-xs text-slate-300 px-3.5 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/20">
                <User className="w-3.5 h-3.5 text-[#D8B56A]" />
                <span className="max-w-[120px] truncate font-semibold">{profile.full_name}</span>
              </div>
              <form action={logoutUserAction}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-red-900 transition-all cursor-pointer font-bold uppercase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full text-[11px] font-extrabold gold-outline-btn tracking-widest uppercase hover:scale-105 transition-all"
            >
              LOGIN / REGISTER
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-[#D8B56A] bg-[#081221]/90 border border-[#D8B56A]/30 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-6 backdrop-blur-2xl bg-[#050914]/95 border-b border-[#D8B56A]/30 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3.5 text-xs font-bold uppercase tracking-widest text-slate-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#D8B56A]"
            >
              HOME
            </Link>
            <a
              href="#quick-access-section"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B56A]"
            >
              ABOUT
            </a>
            <a
              href="#legendary-section"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B56A]"
            >
              EVENT
            </a>
            <a
              href="#contributors-section"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B56A]"
            >
              CONTRIBUTORS
            </a>
            <Link
              href="/help-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B56A]"
            >
              HELP HUB
            </Link>
            <a
              href="#financial-section"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B56A]"
            >
              CONTACT
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-800/80">
            {profile ? (
              <div className="space-y-3">
                {profile.approval_status === "approved" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center bg-[#081221] text-slate-200"
                  >
                    DASHBOARD
                  </Link>
                )}
                {profile.is_admin && (
                  <Link
                    href="/admin/students"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#D8B56A]/15 text-[#D8B56A] border border-[#D8B56A]/30"
                  >
                    ADMIN CONTROL PANEL
                  </Link>
                )}
                <form action={logoutUserAction}>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-red-950/40 text-red-400 border border-red-900/60 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>LOGOUT</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full text-xs font-extrabold text-center gold-outline-btn tracking-widest uppercase"
                >
                  LOGIN / REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
