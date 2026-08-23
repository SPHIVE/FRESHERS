import Link from "next/link";
import { requireApprovedUser } from "@/lib/auth/helpers";
import { Sparkles, GraduationCap, UserCheck, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
  const { profile } = await requireApprovedUser();

  const firstName = profile.full_name.split(" ")[0] || profile.full_name;

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden glass-card p-6 sm:p-8 rounded-3xl border border-gold-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-radial opacity-30 pointer-events-none -mr-20 -mt-20 blur-2xl" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Official Approved IICT Student</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            Welcome, <span className="gold-gradient-text">{firstName}</span>!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Your account is verified and fully active. Explore Student Help Hub resources, connect with your batchmates, and prepare for upcoming IICT events.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-navy-950/60 px-3 py-1.5 rounded-lg border border-navy-700">
              <GraduationCap className="w-4 h-4 text-gold-400" />
              <span>Batch: <strong className="text-slate-200">{profile.batch?.label || "IICT"}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-navy-950/60 px-3 py-1.5 rounded-lg border border-navy-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Status: <strong className="text-emerald-400 uppercase">Approved</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Quick Access</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Student Help Hub */}
          <Link
            href="/help-hub"
            className="group glass-card glass-card-hover p-6 rounded-2xl border border-navy-700/60 block space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-100 flex items-center justify-between">
                <span>Student Help Hub</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access IICT college information, faculty directory, batch rosters, senior guides, and student position directories.
              </p>
            </div>
          </Link>

          {/* Card 2: My Profile */}
          <div className="glass-card p-6 rounded-2xl border border-navy-700/60 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-gold-500/40 overflow-hidden bg-navy-900 shrink-0">
                {profile.profile_photo_url ? (
                  <img
                    src={profile.profile_photo_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-gold-400 text-lg">
                    {profile.full_name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100">{profile.full_name}</h3>
                <p className="text-xs text-gold-400">Batch {profile.batch?.label}</p>
                <p className="text-[11px] text-slate-400">Roll: {profile.roll_number}</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 border-t border-navy-800 flex items-center justify-between">
              <span>Account Privacy Level:</span>
              <span className="text-emerald-400 font-semibold">Protected (RLS Active)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
