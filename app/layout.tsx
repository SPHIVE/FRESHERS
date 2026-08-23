import type { Metadata } from "next";
import "./globals.css";
import { getCurrentProfile } from "@/lib/auth/helpers";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "IICT FRESHER PARTY 2026 & Student Help Hub",
  description: "Official 3D portal for IICT Fresher Party 2026, Student Directories, Leadership, and Help Hub resources.",
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
      <body className="min-h-screen flex flex-col bg-[#050914] text-[#F4F1EA] selection:bg-[#D8B56A] selection:text-[#050914] overflow-x-hidden antialiased">
        {/* Floating Smoked Dark Glass Navbar */}
        <Navbar profile={profile} />

        {/* Main Content Area */}
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>

        {/* Minimal Footer (hidden on homepage for 100vh 3D hero experience) */}
        <Footer />
      </body>
    </html>
  );
}
