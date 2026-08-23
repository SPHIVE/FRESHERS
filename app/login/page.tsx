"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
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
    <div className="relative min-h-[85vh] flex items-center justify-center py-8 px-4">
      {/* 1. 3D Scene Backdrop */}
      <SceneCanvas />

      {/* 2. Smoked Dark Glass Auth Card (Matching input_file_0.png) */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-6">
        <div className="backdrop-blur-2xl bg-[#050914]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-2xl space-y-6 text-center">
          {/* Logo Crest & IICT BHADOHI */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-sm">
              <Sparkles className="w-6 h-6 text-[#050914]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest gold-gradient-text uppercase">
                IICT
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                BHADOHI
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#F4F1EA]">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400">
              Login to continue your journey
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-start gap-2.5 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email or Phone Number"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-right pt-1.5">
                <a href="#" className="text-[11px] text-[#D8B56A] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* LOGIN Gold Pill Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest hover:scale-102 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                  <span>LOGGING IN...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-2 text-center border-t border-navy-800/80 text-xs text-slate-400">
            <span>Don't have an account? </span>
            <Link href="/register" className="text-[#D8B56A] font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
