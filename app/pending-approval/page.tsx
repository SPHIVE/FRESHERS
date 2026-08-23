import { redirect } from "next/navigation";
import { getCurrentProfile, requireAuthenticatedUser } from "@/lib/auth/helpers";
import { Clock, ShieldAlert, LogOut, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { logoutUserAction } from "@/app/actions/auth";
import { SceneCanvas } from "@/app/components/3d/SceneCanvas";

export const revalidate = 0;

export default async function PendingApprovalPage() {
  const user = await requireAuthenticatedUser();
  const profile = await getCurrentProfile();

  // If student is already approved, redirect to dashboard
  if (profile?.approval_status === "approved") {
    redirect("/dashboard");
  }

  const isRejected = profile?.approval_status === "rejected";

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-12 px-4">
      {/* 1. Full-Screen Atmospheric 3D Scene Backdrop */}
      <SceneCanvas isAuthPage={true} />

      <div className="relative z-10 w-full max-w-lg space-y-6">
        {/* Status Card */}
        <div className="backdrop-blur-2xl bg-[#050914]/85 p-8 sm:p-10 rounded-3xl space-y-6 text-center border border-[#D8B56A]/35 shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
          {/* Status Badge Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#081221] border-2 border-[#D8B56A]/50 text-[#D8B56A] mx-auto shadow-[0_0_20px_rgba(216,181,106,0.25)] relative">
            {isRejected ? (
              <ShieldAlert className="w-10 h-10 text-red-400" />
            ) : (
              <Clock className="w-10 h-10 text-[#D8B56A] animate-pulse" />
            )}
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081221] border border-[#D8B56A]/30 text-[#D8B56A] text-[10px] font-bold uppercase tracking-widest mx-auto">
              <Sparkles className="w-3 h-3 text-[#D8B56A] animate-pulse" />
              <span>IICT STUDENT ACCOUNT</span>
            </div>

            <h1 className="text-2xl font-black text-[#F4F1EA] uppercase tracking-tight">
              {isRejected ? "REGISTRATION NOT APPROVED" : "REGISTRATION RECEIVED"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {isRejected
                ? "Your registration request was reviewed and could not be approved at this time. Please contact IICT administration for assistance."
                : "Your registration has been submitted successfully. Access to protected Student Help Hub resources will be available after administrator approval."}
            </p>
          </div>

          {/* Student Profile Card Summary */}
          {profile && (
            <div className="p-4 rounded-2xl bg-[#081221]/80 border border-[#D8B56A]/20 text-left space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#D8B56A]/40 overflow-hidden bg-[#050914] shrink-0">
                  {profile.profile_photo_url ? (
                    <img
                      src={profile.profile_photo_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D8B56A] text-base font-bold">
                      {profile.full_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F4F1EA]">{profile.full_name}</h3>
                  <p className="text-xs text-slate-400">Roll: {profile.roll_number}</p>
                  <p className="text-xs text-[#D8B56A] font-semibold">
                    Batch: {profile.batch?.label || "IICT"}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    isRejected
                      ? "bg-red-950 text-red-400 border border-red-800"
                      : "bg-[#D8B56A]/15 text-[#D8B56A] border border-[#D8B56A]/30"
                  }`}
                >
                  {profile.approval_status}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="/pending-approval"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-[#081221] hover:bg-[#0D1624] text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REFRESH STATUS</span>
            </a>

            <form action={logoutUserAction} className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-950/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOG OUT</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

