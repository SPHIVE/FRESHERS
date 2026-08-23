import { requireApprovedUser } from "@/lib/auth/helpers";
import { BookOpen, Building2, UserCheck, Users, Award, Sparkles, Lock, ArrowUpRight } from "lucide-react";

export const revalidate = 0;

export default async function HelpHubPage() {
  await requireApprovedUser();

  const comingFeatures = [
    {
      title: "College Information",
      description: "Official academic guidelines, campus resources, and important IICT operational updates.",
      icon: Building2,
      badge: "Coming Soon",
    },
    {
      title: "Faculty Information",
      description: "Comprehensive directory of IICT professors, department heads, and academic advisors.",
      icon: UserCheck,
      badge: "Coming Soon",
    },
    {
      title: "All Batches Directory",
      description: "Explore student profiles across all active batches (2023–2027, 2024–2028, 2025–2029, 2026–2030).",
      icon: Users,
      badge: "Coming Soon",
    },
    {
      title: "Know Your Seniors",
      description: "Visual senior directory to help new students connect with experienced IICT mentors.",
      icon: Sparkles,
      badge: "Coming Soon",
    },
    {
      title: "Student Positions Directory",
      description: "Official student council reps, General Secretary, TPRs, Sports and Cultural Secretaries.",
      icon: Award,
      badge: "Coming Soon",
    },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3 border-b border-navy-700/60 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs text-gold-300 border border-gold-500/30">
          <BookOpen className="w-4 h-4 text-gold-400" />
          <span>Protected Student Resource</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Student Help Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Welcome to the centralized IICT Help Hub. Phase 1 provides the secure verified student shell. Advanced directory and academic resources are currently being loaded.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comingFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-navy-700/60 flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-950 text-slate-400 border border-navy-800">
                    <Lock className="w-3 h-3 text-gold-400" />
                    {feature.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-gold-300 transition-colors flex items-center gap-1">
                    <span>{feature.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Phase 1 Protected Shell</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
