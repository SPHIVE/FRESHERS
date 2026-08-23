import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface UserProfile {
  id: string;
  full_name: string;
  roll_number: string;
  batch_id: string | null;
  phone: string;
  profile_photo_url: string | null;
  approval_status: "pending" | "approved" | "rejected";
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  batch?: {
    label: string;
  } | null;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function getCurrentProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*, batch:batches(label)")
    .eq("id", user.id)
    .single();

  return profile as UserProfile | null;
}

export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireApprovedUser() {
  const user = await requireAuthenticatedUser();
  const profile = await getCurrentProfile();

  if (!profile || profile.approval_status !== "approved") {
    redirect("/pending-approval");
  }

  return { user, profile };
}

export async function requireAdmin() {
  const user = await requireAuthenticatedUser();
  const profile = await getCurrentProfile();

  if (!profile || !profile.is_admin) {
    redirect("/dashboard");
  }

  return { user, profile };
}
