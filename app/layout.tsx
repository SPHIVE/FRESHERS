import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Sparkles, Shield, UserCheck, LogOut } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth/helpers";
import { logoutUserAction } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "IICT Fresher Party 2026 & Student Help Hub",
  description: "Official portal for IICT Fresher Party 2026, Student Directories, Leadership, and Help Hub resources.",
  keywords: ["IICT", "Fresher Party 2026", "Student Help Hub", "IICT Students", "Batch Directory"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfile();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-gold-500 selection:text-navy-950">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-950/80 border-b border-navy-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-navy-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wider gold-gradient-text uppercase">
                  IICT Portal
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Freshers 2026 & Help Hub
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              {profile ? (
                <div className="flex items-center gap-3">
                  {profile.approval_status === "approved" && (
                    <Link
                      href="/dashboard"
                      className="text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors hidden sm:block"
                    >
                      Dashboard
                    </Link>
                  )}
                  {profile.is_admin && (
                    <Link
                      href="/admin/students"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Admin
                    </Link>
                  )}
                  <span className="text-xs text-slate-400 hidden md:inline-block">
                    {profile.full_name}
                  </span>
                  <form action={logoutUserAction}>
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-red-950 transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-gold-400 hover:bg-navy-850 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold gold-gradient-btn shadow-gold-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-navy-800/60 py-6 text-center text-xs text-slate-500">
          <p>© 2026 IICT Student Association. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
