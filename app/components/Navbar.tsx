"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, LogOut, Menu, X, BookOpen, User } from "lucide-react";
import { logoutUserAction } from "@/app/actions/auth";

interface UserProfileProps {
  full_name: string;
  approval_status: "pending" | "approved" | "rejected";
  is_admin: boolean;
}

export function Navbar({ profile }: { profile: UserProfileProps | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto pointer-events-auto">
      <div className="backdrop-blur-xl bg-[#050914]/85 border border-[#D8B56A]/30 rounded-2xl px-4 sm:px-6 h-16 flex items-center justify-between shadow-2xl">
        {/* Left Branding */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#050914]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-widest gold-gradient-text uppercase">
              IICT BHADOHI
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider">
              FRESHER PARTY 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {profile ? (
            <div className="flex items-center gap-3">
              {profile.approval_status === "approved" && (
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              {profile.is_admin && (
                <Link
                  href="/admin/students"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 transition-all"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-1.5 text-xs text-slate-300 px-2.5 py-1.5 rounded-xl bg-navy-900/60 border border-navy-700">
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span className="max-w-[120px] truncate">{profile.full_name}</span>
              </div>
              <form action={logoutUserAction}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-red-900 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-navy-900/60 transition-all border border-transparent hover:border-slate-800"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="px-4.5 py-1.5 rounded-xl text-xs font-bold gold-gradient-btn shadow-gold-sm"
              >
                REGISTER
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-gold-400 bg-navy-900/80 border border-navy-700 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-5 rounded-2xl backdrop-blur-2xl bg-[#050914]/95 border border-[#D8B56A]/30 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          {profile ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-navy-900/80 border border-navy-700 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">{profile.full_name}</span>
                <span className="text-[10px] uppercase font-bold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30">
                  {profile.approval_status}
                </span>
              </div>

              {profile.approval_status === "approved" && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-navy-800/60 text-slate-200 border border-navy-700"
                >
                  Dashboard
                </Link>
              )}

              {profile.is_admin && (
                <Link
                  href="/admin/students"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30"
                >
                  Admin Control Panel
                </Link>
              )}

              <Link
                href="/help-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-navy-800/60 text-slate-200 border border-navy-700"
              >
                <BookOpen className="w-4 h-4 text-gold-400" />
                <span>Student Help Hub</span>
              </Link>

              <form action={logoutUserAction} className="w-full">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-red-950/40 text-red-400 border border-red-900/60 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center bg-navy-800/60 text-slate-200 border border-slate-700"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center gold-gradient-btn shadow-gold-sm"
              >
                REGISTER
              </Link>
              <Link
                href="/help-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-navy-900/80 text-slate-300 border border-navy-700"
              >
                <BookOpen className="w-4 h-4 text-gold-400" />
                <span>Student Help Hub</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
