import { requireApprovedUser } from "@/lib/auth/helpers";
import { BookOpen, Building2, UserCheck, Users, Award, Sparkles, Lock, ArrowUpRight } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Student Help Hub | IICT Bhadohi",
  description: "Verified student resource portal, batch directory, faculty info, and campus guidelines.",
};

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
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 border-b border-slate-800/80 pb-8 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221] border border-[#D8B56A]/40 text-[#D8B56A] text-xs font-bold uppercase tracking-widest shadow-sm">
          <BookOpen className="w-4 h-4 text-[#D8B56A]" />
          <span>PROTECTED STUDENT RESOURCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight">
          STUDENT <span className="gold-gradient-text">HELP HUB</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Welcome to the centralized IICT Help Hub. Access verified student directories, academic resources, and campus leadership contacts.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comingFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="backdrop-blur-2xl bg-[#081221]/80 p-7 rounded-3xl border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#050914] text-slate-400 border border-slate-800">
                    <Lock className="w-3 h-3 text-[#D8B56A]" />
                    {feature.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-base text-[#F4F1EA] group-hover:text-[#D8B56A] transition-colors uppercase tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
                <span>Verified Student Module</span>
                <ArrowUpRight className="w-4 h-4 text-[#D8B56A]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

