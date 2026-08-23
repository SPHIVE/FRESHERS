"use server";

import { requireAdmin } from "@/lib/auth/helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateStudentApprovalStatus(
  studentId: string,
  newStatus: "approved" | "rejected"
) {
  try {
    // Enforce server-side admin check
    await requireAdmin();

    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase
      .from("profiles")
      .update({
        approval_status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", studentId);

    if (error) {
      console.error("Failed to update student approval status:", error);
      return { success: false, error: "Failed to update approval status." };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/students");

    return {
      success: true,
      message: `Student status successfully updated to ${newStatus}.`,
    };
  } catch (err: any) {
    console.error("Error in updateStudentApprovalStatus action:", err);
    return { success: false, error: err.message || "Unauthorized action." };
  }
}
