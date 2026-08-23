import { requireAdmin } from "@/lib/auth/helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import StudentList, { StudentRecord } from "./student-list";
import { Shield } from "lucide-react";

export const revalidate = 0;

export default async function AdminStudentsPage() {
  await requireAdmin();

  const adminSupabase = createAdminClient();

  // Fetch all student profiles with batch information
  const { data: profiles, error: profileError } = await adminSupabase
    .from("profiles")
    .select("*, batch:batches(label)")
    .order("created_at", { ascending: false });

  // Fetch users from Supabase Auth to retrieve registration email addresses
  const { data: authUsersData, error: authUsersError } = await adminSupabase.auth.admin.listUsers();

  const emailMap = new Map<string, string>();
  if (authUsersData?.users) {
    authUsersData.users.forEach((u) => {
      if (u.email) {
        emailMap.set(u.id, u.email);
      }
    });
  }

  const studentRecords: StudentRecord[] = (profiles || []).map((p) => ({
    ...p,
    email: emailMap.get(p.id) || "Email unavailable",
  }));

  return (
    <div className="space-y-8 py-4">
      {/* Admin Title Header */}
      <div className="space-y-2 border-b border-navy-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Student Registrations
          </h1>
          <p className="text-xs text-slate-400">
            Review pending student registrations, inspect submitted credentials, and grant access to IICT portal.
          </p>
        </div>
      </div>

      {/* Interactive Management Grid */}
      <StudentList initialStudents={studentRecords} />
    </div>
  );
}
