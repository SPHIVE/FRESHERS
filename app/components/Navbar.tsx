"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Shield, LogOut, Menu, X, User, ArrowRight, Home, Calendar, Users, DollarSign, BookOpen, KeyRound, UserPlus } from "lucide-react";
import { logoutUserAction } from "@/app/actions/auth";

interface UserProfileProps {
  full_name: string;
  approval_status: "pending" | "approved" | "rejected";
  is_admin: boolean;
}

export function Navbar({ profile }: { profile: UserProfileProps | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Listen for custom event triggered by "EXPLORE EXPERIENCE" CTA on hero
  useEffect(() => {
    const handleOpenMenu = () => setMenuOpen(true);
    window.addEventListener("open-nav-menu", handleOpenMenu);
    return () => window.removeEventListener("open-nav-menu", handleOpenMenu);
  }, []);

  // Prevent background body scroll when menu overlay is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mainNavItems = [
    { name: "HOME", href: "/", subtitle: "3D Cinematic Entry Experience", icon: Home },
    { name: "FRESHERS 2026", href: "/freshers", subtitle: "Event Lineup & Gala Details", icon: Calendar },
    { name: "CONTRIBUTORS", href: "/contributors", subtitle: "Wall of Honor & Organizers", icon: Users },
    { name: "FINANCIAL TRANSPARENCY", href: "/finance", subtitle: "100% Audited Expense Ledger", icon: DollarSign },
    { name: "STUDENT HELP HUB", href: "/help-hub", subtitle: "Verified Student Resource Portal", icon: BookOpen },
  ];

  return (
    <>
      {/* Top Floating Navbar (Minimal & Uncluttered) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full pointer-events-auto transition-all duration-300 ${
          isHomePage
            ? "bg-transparent py-6"
            : "bg-[#050914]/85 backdrop-blur-xl border-b border-[#D8B56A]/20 py-4 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Top-Left Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)] group-hover:scale-105 group-hover:border-[#D8B56A] transition-all">
              <Sparkles className="w-5 h-5 text-[#D8B56A]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-widest text-[#F4F1EA] uppercase">
                UNOFFICIAL
              </span>
              <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
                IICT
              </span>
            </div>
          </Link>

          {/* Top-Right Premium Hamburger Button (Desktop & Mobile) */}
          <div className="flex items-center gap-3">
            {profile && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 px-3.5 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/20">
                <User className="w-3.5 h-3.5 text-[#D8B56A]" />
                <span className="max-w-[110px] truncate font-semibold">{profile.full_name}</span>
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-3 rounded-2xl text-slate-200 bg-[#081221]/90 border border-[#D8B56A]/40 hover:border-[#D8B56A] hover:bg-[#081221] focus:outline-none transition-all shadow-[0_0_20px_rgba(216,181,106,0.15)] flex items-center gap-2.5 group cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D8B56A]">
                {menuOpen ? "CLOSE" : "MENU"}
              </span>
              {menuOpen ? (
                <X className="w-5 h-5 text-[#D8B56A] transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 text-[#D8B56A] group-hover:rotate-90 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern 3D Depth Navigation Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] w-full h-full min-h-screen bg-[#050914]/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto animate-in fade-in duration-300 selection:bg-[#D8B56A] selection:text-[#050914]">
          {/* Header Bar Inside Overlay */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#D8B56A]/20">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)]">
                <Sparkles className="w-5 h-5 text-[#D8B56A]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-widest text-[#F4F1EA] uppercase">
                  UNOFFICIAL
                </span>
                <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
                  IICT
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-full bg-[#081221] border border-[#D8B56A]/40 text-[#D8B56A] hover:bg-[#D8B56A] hover:text-[#050914] transition-all cursor-pointer shadow-lg"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center 3D Depth Navigation List */}
          <div className="max-w-4xl mx-auto w-full my-auto py-8 space-y-4 sm:space-y-6 [perspective:1000px]">
            {mainNavItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group relative flex items-center justify-between p-4 sm:p-6 rounded-2xl border transition-all duration-300 transform-gpu [transform-style:preserve-3d] hover:[transform:translateZ(20px)_scale(1.02)] ${
                    isActive
                      ? "bg-[#081221]/90 border-[#D8B56A] shadow-[0_0_30px_rgba(216,181,106,0.25)]"
                      : "bg-[#081221]/50 border-[#D8B56A]/20 hover:border-[#D8B56A]/70 hover:bg-[#081221]/80 hover:shadow-[0_0_25px_rgba(216,181,106,0.15)]"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <h2
                        className={`text-lg sm:text-2xl font-black uppercase tracking-wider transition-colors ${
                          isActive ? "text-[#D8B56A]" : "text-[#F4F1EA] group-hover:text-[#D8B56A]"
                        }`}
                      >
                        {item.name}
                      </h2>
                      <p className="text-xs text-slate-400 font-semibold tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#D8B56A] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>ENTER</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}

            {/* Auth Specific Menu Item */}
            {profile ? (
              <div className="pt-4 border-t border-[#D8B56A]/20 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.approval_status === "approved" && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="p-4 rounded-2xl bg-[#081221]/90 border border-[#D8B56A]/30 hover:border-[#D8B56A] flex items-center justify-between text-xs font-extrabold uppercase text-[#F4F1EA] hover:text-[#D8B56A] transition-all"
                    >
                      <span>PROFILE / DASHBOARD</span>
                      <ArrowRight className="w-4 h-4 text-[#D8B56A]" />
                    </Link>
                  )}

                  {profile.is_admin && (
                    <Link
                      href="/admin/students"
                      onClick={() => setMenuOpen(false)}
                      className="p-4 rounded-2xl bg-[#D8B56A]/15 border border-[#D8B56A]/50 flex items-center justify-between text-xs font-extrabold uppercase text-[#D8B56A] hover:bg-[#D8B56A]/25 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>ADMIN CONTROL PANEL</span>
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <form action={logoutUserAction}>
                  <button
                    type="submit"
                    className="w-full p-4 rounded-2xl bg-red-950/40 border border-red-900/60 hover:border-red-600 flex items-center justify-center gap-2 text-xs font-extrabold text-red-400 uppercase tracking-widest cursor-pointer transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>LOGOUT OF ACCOUNT</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#D8B56A]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="p-4 rounded-2xl bg-[#081221] border border-[#D8B56A]/40 hover:border-[#D8B56A] flex items-center justify-center gap-2.5 text-xs font-extrabold text-[#D8B56A] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <KeyRound className="w-4 h-4 text-[#D8B56A]" />
                  <span>LOGIN</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="p-4 rounded-2xl gold-gradient-btn flex items-center justify-center gap-2.5 text-xs font-extrabold uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>SIGN UP / REGISTER</span>
                </Link>
              </div>
            )}
          </div>

          {/* Footer Note Inside Overlay */}
          <div className="max-w-7xl mx-auto w-full pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
            <span>UNOFFICIAL IICT FRESHER PARTY 2026</span>
            <span>© 2026 IICT Student Association</span>
          </div>
        </div>
      )}
    </>
  );
}


