"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendAdminNewRegistrationNotification } from "@/lib/email/service";
import { registerSchema, loginSchema } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerStudentAction(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      rollNumber: formData.get("rollNumber") as string,
      batchId: formData.get("batchId") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      profilePhotoUrl: formData.get("profilePhotoUrl") as string,
    };

    // Server-side Zod validation
    const validationResult = registerSchema.safeParse(rawData);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues[0]?.message || "Invalid registration form data";
      return { success: false, error: errorMsg };
    }

    const { fullName, rollNumber, batchId, email, phone, password, profilePhotoUrl } = validationResult.data;

    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    // Check if roll number already exists
    const { data: existingRoll } = await adminSupabase
      .from("profiles")
      .select("id")
      .eq("roll_number", rollNumber)
      .single();

    if (existingRoll) {
      return { success: false, error: "A student with this Roll Number is already registered." };
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          roll_number: rollNumber,
        },
      },
    });

    if (authError || !authData.user) {
      if (authError?.message?.includes("User already registered") || authError?.message?.includes("already exists")) {
        return { success: false, error: "An account with this email address already exists." };
      }
      return { success: false, error: authError?.message || "Failed to create user account." };
    }

    const userId = authData.user.id;

    // Fetch batch label for email notification
    const { data: batchData } = await adminSupabase
      .from("batches")
      .select("label")
      .eq("id", batchId)
      .single();

    const batchLabel = batchData?.label || "Unknown Batch";

    // Insert Profile Record (using service role / admin client to ensure clean setup regardless of immediate auth session trigger)
    const { error: profileError } = await adminSupabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: fullName,
        roll_number: rollNumber,
        batch_id: batchId,
        phone,
        profile_photo_url: profilePhotoUrl,
        approval_status: "pending",
        is_admin: false,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return { success: false, error: "Failed to create student profile record." };
    }

    // Trigger Admin Email Notification
    const registrationTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    await sendAdminNewRegistrationNotification({
      studentName: fullName,
      rollNumber,
      batchLabel,
      registeredAt: registrationTime,
      email,
      phone,
    });

    return { success: true, redirect: "/pending-approval" };
  } catch (err: any) {
    console.error("Registration action exception:", err);
    return { success: false, error: "An unexpected error occurred during registration. Please try again." };
  }
}

export async function loginUserAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message || "Invalid email or password" };
    }

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return { success: false, error: "Invalid email or password. Please try again." };
    }

    // Fetch user profile status
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("approval_status, is_admin")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      return { success: true, redirect: "/pending-approval" };
    }

    if (profile.is_admin) {
      return { success: true, redirect: "/admin" };
    }

    if (profile.approval_status === "approved") {
      return { success: true, redirect: "/dashboard" };
    }

    return { success: true, redirect: "/pending-approval" };
  } catch (err: any) {
    console.error("Login action exception:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function logoutUserAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
