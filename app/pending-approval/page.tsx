import { redirect } from "next/navigation";
import { getCurrentProfile, requireAuthenticatedUser } from "@/lib/auth/helpers";
import { Clock, ShieldAlert, CheckCircle2, LogOut, RefreshCw } from "lucide-react";
import { logoutUserAction } from "@/app/actions/auth";

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
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Status Card */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6 text-center border border-navy-700/70">
          {/* Status Badge Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border-2 border-gold-500/40 text-gold-400 mx-auto shadow-gold-sm">
            {isRejected ? (
              <ShieldAlert className="w-8 h-8 text-red-400" />
            ) : (
              <Clock className="w-8 h-8 text-gold-400 animate-pulse" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-100">
              {isRejected ? "Registration Not Approved" : "Registration Received"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {isRejected
                ? "Your registration request was reviewed and could not be approved at this time. Please contact IICT administration for assistance."
                : "Thank you for registering! Your application is under administrator review. Access to protected Student Help Hub resources will be unlocked as soon as your account is approved."}
            </p>
          </div>

          {/* Student Submitted Summary */}
          {profile && (
            <div className="p-4 rounded-xl bg-navy-950/70 border border-navy-700/60 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-gold-500/30 overflow-hidden bg-navy-900 shrink-0">
                  {profile.profile_photo_url ? (
                    <img
                      src={profile.profile_photo_url}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                      {profile.full_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{profile.full_name}</h3>
                  <p className="text-xs text-slate-400">Roll No: {profile.roll_number}</p>
                  <p className="text-[11px] text-gold-400">
                    Batch: {profile.batch?.label || "IICT"}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Account Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                    isRejected
                      ? "bg-red-950 text-red-400 border border-red-800"
                      : "bg-gold-500/10 text-gold-400 border border-gold-500/30"
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs glass-card hover:bg-navy-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Status</span>
            </a>

            <form action={logoutUserAction} className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-950/80 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
