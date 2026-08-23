"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Lock, Eye, EyeOff, AlertCircle, Loader2, KeyRound } from "lucide-react";
import { loginUserAction } from "@/app/actions/auth";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginUserAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed");
    } else if (result.redirect) {
      router.push(result.redirect);
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-12 px-4 selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 1. Full-Screen Atmospheric 3D Scene Backdrop */}
      <SceneCanvas isAuthPage={true} />

      {/* 2. Asymmetrical Desktop Composition Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Side: Editorial Atmospheric Branding Area (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-6 p-8 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/40 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B56A]" />
            <span>UNOFFICIAL IICT</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight leading-tight">
            STUDENT <span className="gold-gradient-text">AUTHENTICATION</span>
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Welcome to the official IICT Fresher Party 2026 and Student Help Hub portal. Log in to access verified student directories, contribution records, and protected resources.
          </p>

          <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-[#D8B56A]">
            <div className="w-2 h-2 rounded-full bg-[#D8B56A] animate-ping" />
            <span className="uppercase tracking-widest text-[10px]">Secure Supabase Auth Active</span>
          </div>
        </div>

        {/* Right Side: Smoked Dark Glass Auth Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="backdrop-blur-2xl bg-[#050914]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-[0_16px_50px_rgba(0,0,0,0.7)] space-y-6 text-center">
            {/* Logo Crest & UNOFFICIAL IICT */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-11 h-11 rounded-xl bg-[#081221] border border-[#D8B56A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(216,181,106,0.15)]">
                <Sparkles className="w-5 h-5 text-[#D8B56A]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs tracking-widest text-[#F4F1EA] uppercase">
                  UNOFFICIAL
                </span>
                <span className="text-[9px] text-[#D8B56A] font-bold tracking-widest uppercase -mt-0.5">
                  IICT
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-[#F4F1EA] uppercase">
                WELCOME BACK
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Continue your journey
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2.5 text-left">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* LOGIN Gold Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                    <span>LOGGING IN...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>LOGIN</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="pt-3 text-center border-t border-slate-800/80 text-xs text-slate-400">
              <span>New here? </span>
              <Link href="/register" className="text-[#D8B56A] font-bold hover:underline">
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
