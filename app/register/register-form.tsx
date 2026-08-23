"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Hash, GraduationCap, Mail, Phone, Lock, Eye, EyeOff, Upload, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerStudentAction } from "@/app/actions/auth";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

interface BatchOption {
  id: string;
  label: string;
  start_year: number;
  end_year: number;
}

export default function RegisterForm({ batches }: { batches: BatchOption[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Handle Photo File Select & Direct Storage Upload
  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image size must be under 5MB.");
      return;
    }

    setError(null);
    setUploadingImage(true);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `registrations/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("student-profile-photos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        setError("Failed to upload profile photo. Please try another image.");
        setUploadingImage(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("student-profile-photos")
        .getPublicUrl(fileName);

      setPhotoUrl(publicUrlData.publicUrl);
    } catch (err: any) {
      console.error("Photo upload exception:", err);
      setError("Photo upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!photoUrl) {
      setError("Please select and upload your profile photo.");
      return;
    }

    if (!agreedTerms) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("profilePhotoUrl", photoUrl);

    const result = await registerStudentAction(formData);

    setSubmitting(false);

    if (!result.success) {
      setError(result.error || "Registration failed.");
    } else if (result.redirect) {
      router.push(result.redirect);
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-8 px-4">
      {/* 1. 3D Scene Backdrop */}
      <SceneCanvas />

      {/* 2. Smoked Dark Glass Registration Card (Matching input_file_0.png) */}
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-6">
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
              Create Account
            </h1>
            <p className="text-xs text-slate-400">
              Join IICT Freshers Family
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-start gap-2.5 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
            {/* Profile Photo Avatar Uploader */}
            <div className="p-3 rounded-2xl bg-navy-950/70 border border-navy-800 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl border-2 border-[#D8B56A]/40 bg-navy-900 overflow-hidden flex items-center justify-center relative shrink-0 shadow-sm">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-slate-500" />
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-[#050914]/80 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-[#D8B56A] animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5 text-[#D8B56A]" />
                  <span>{photoUrl ? "Change Photo" : "Upload Profile Photo"}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <p className="text-[10px] text-slate-400">
                  {photoUrl ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Uploaded successfully
                    </span>
                  ) : (
                    "Upload front-facing photo (max 5MB)"
                  )}
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
              </div>
            </div>

            {/* Roll Number */}
            <div>
              <div className="relative">
                <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="rollNumber"
                  required
                  placeholder="Roll Number (e.g. IICT-2024-042)"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 uppercase text-slate-100"
                />
              </div>
            </div>

            {/* Batch Selection */}
            <div>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                <select
                  name="batchId"
                  required
                  defaultValue=""
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input bg-[#050914] text-slate-100 cursor-pointer"
                >
                  <option value="" disabled>Select Batch</option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.id} className="bg-navy-900 text-slate-100">
                      Batch {batch.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-[#050914] text-[#D8B56A] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-300 cursor-pointer">
                I agree to the <span className="text-[#D8B56A] underline font-semibold">Terms & Conditions</span>
              </label>
            </div>

            {/* SIGN UP Gold Pill Button */}
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="w-full py-3.5 rounded-full font-extrabold text-xs gold-gradient-btn shadow-gold-glow flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest hover:scale-102 transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <span>SIGN UP</span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-2 text-center border-t border-navy-800/80 text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link href="/login" className="text-[#D8B56A] font-bold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
