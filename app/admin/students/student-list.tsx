"use client";

import { useState } from "react";
import { UserCheck, UserX, Clock, Mail, Phone, Hash, Calendar, CheckCircle2, XCircle, Loader2, ShieldCheck, Filter } from "lucide-react";
import { updateStudentApprovalStatus } from "@/app/actions/admin";

export interface StudentRecord {
  id: string;
  full_name: string;
  roll_number: string;
  phone: string;
  profile_photo_url: string | null;
  approval_status: "pending" | "approved" | "rejected";
  is_admin: boolean;
  created_at: string;
  email?: string;
  batch?: {
    label: string;
  } | null;
}

export default function StudentList({ initialStudents }: { initialStudents: StudentRecord[] }) {
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [filterStatus, setFilterStatus] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleStatusUpdate(studentId: string, newStatus: "approved" | "rejected") {
    setUpdatingId(studentId);
    setActionMessage(null);

    const result = await updateStudentApprovalStatus(studentId, newStatus);

    setUpdatingId(null);

    if (result.success) {
      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, approval_status: newStatus } : s))
      );
      setActionMessage({ type: "success", text: result.message || `Status updated to ${newStatus}` });
    } else {
      setActionMessage({ type: "error", text: result.error || "Failed to update status" });
    }
  }

  const filteredStudents = students.filter((student) => {
    if (filterStatus === "all") return true;
    return student.approval_status === filterStatus;
  });

  const pendingCount = students.filter((s) => s.approval_status === "pending").length;
  const approvedCount = students.filter((s) => s.approval_status === "approved").length;
  const rejectedCount = students.filter((s) => s.approval_status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            actionMessage.type === "success"
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-red-950/60 border-red-800 text-red-300"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setFilterStatus("pending")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filterStatus === "pending"
              ? "bg-gold-500/10 border-gold-500/60 shadow-gold-sm"
              : "glass-card border-navy-700/60 hover:border-gold-500/30"
          }`}
        >
          <div className="flex items-center justify-between text-gold-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-100">{pendingCount}</p>
        </button>

        <button
          onClick={() => setFilterStatus("approved")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filterStatus === "approved"
              ? "bg-emerald-500/10 border-emerald-500/60 shadow-md"
              : "glass-card border-navy-700/60 hover:border-emerald-500/30"
          }`}
        >
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Approved</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-100">{approvedCount}</p>
        </button>

        <button
          onClick={() => setFilterStatus("rejected")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filterStatus === "rejected"
              ? "bg-red-500/10 border-red-500/60 shadow-md"
              : "glass-card border-navy-700/60 hover:border-red-500/30"
          }`}
        >
          <div className="flex items-center justify-between text-red-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
            <UserX className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-100">{rejectedCount}</p>
        </button>

        <button
          onClick={() => setFilterStatus("all")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            filterStatus === "all"
              ? "bg-navy-800 border-gold-500/50"
              : "glass-card border-navy-700/60 hover:border-slate-500"
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
            <Filter className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-100">{students.length}</p>
        </button>
      </div>

      {/* Filter Tabs Header */}
      <div className="flex items-center justify-between border-b border-navy-700/60 pb-3">
        <h2 className="text-base font-bold text-slate-100 capitalize">
          {filterStatus} Registrations ({filteredStudents.length})
        </h2>
      </div>

      {/* Student List Grid */}
      {filteredStudents.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-navy-700/60 space-y-3">
          <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No {filterStatus} registrations found</h3>
          <p className="text-xs text-slate-500">
            {filterStatus === "pending"
              ? "All student registrations have been reviewed."
              : `There are currently no ${filterStatus} student accounts.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => {
            const isProcessing = updatingId === student.id;
            const regDate = new Date(student.created_at).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <div
                key={student.id}
                className="glass-card p-5 rounded-2xl border border-navy-700/60 flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  {/* Photo & Name */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-gold-500/40 overflow-hidden bg-navy-900 shrink-0 shadow-sm">
                      {student.profile_photo_url ? (
                        <img
                          src={student.profile_photo_url}
                          alt={student.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-gold-400 text-lg">
                          {student.full_name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm text-slate-100 truncate">
                          {student.full_name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
                            student.approval_status === "approved"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : student.approval_status === "rejected"
                              ? "bg-red-950 text-red-400 border border-red-800"
                              : "bg-gold-500/10 text-gold-400 border border-gold-500/30"
                          }`}
                        >
                          {student.approval_status}
                        </span>
                      </div>

                      <p className="text-xs text-gold-400 font-semibold">
                        Batch: {student.batch?.label || "IICT"}
                      </p>

                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Hash className="w-3 h-3 text-slate-500" />
                        <span>Roll: <strong className="text-slate-200">{student.roll_number}</strong></span>
                      </p>
                    </div>
                  </div>

                  {/* Private Info Box (Admin Access Only) */}
                  <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800 text-[11px] space-y-1.5">
                    {student.email && (
                      <p className="text-slate-300 flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </p>
                    )}
                    <p className="text-slate-300 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{student.phone}</span>
                    </p>
                    <p className="text-slate-400 flex items-center gap-2 text-[10px] pt-1 border-t border-navy-900">
                      <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>Registered: {regDate}</span>
                    </p>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(student.id, "approved")}
                    disabled={isProcessing || student.approval_status === "approved"}
                    className="flex-1 py-2 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-slate-950 flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UserCheck className="w-3.5 h-3.5" />
                    )}
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(student.id, "rejected")}
                    disabled={isProcessing || student.approval_status === "rejected"}
                    className="flex-1 py-2 px-3 rounded-xl font-bold text-xs bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800 flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UserX className="w-3.5 h-3.5" />
                    )}
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
