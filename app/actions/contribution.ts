"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface SubmitContributionState {
  success: boolean;
  error?: string;
  message?: string;
}

export async function submitContributionAction(formData: FormData): Promise<SubmitContributionState> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "You must be logged in to submit a contribution." };
    }

    // Verify user profile is approved
    const { data: profile } = await supabase
      .from("profiles")
      .select("approval_status")
      .eq("id", user.id)
      .single();

    if (!profile || profile.approval_status !== "approved") {
      return { success: false, error: "Your student account must be approved before submitting a contribution." };
    }

    const amountRaw = formData.get("amount") as string;
    const paymentMode = formData.get("paymentMode") as string;
    const paymentDate = formData.get("paymentDate") as string || new Date().toISOString().split("T")[0];
    const transactionRefId = (formData.get("transactionRefId") as string || "").trim();

    const amount = parseFloat(amountRaw);
    if (isNaN(amount) || amount <= 0) {
      return { success: false, error: "Please enter a valid contribution amount greater than ₹0." };
    }

    if (!["upi", "cash", "bank_transfer", "other"].includes(paymentMode)) {
      return { success: false, error: "Please select a valid payment mode." };
    }

    // Insert pending contribution
    const { error: insertError } = await supabase
      .from("contributions")
      .insert({
        user_id: user.id,
        amount,
        payment_mode: paymentMode,
        payment_date: paymentDate,
        transaction_ref_id: transactionRefId || null,
        status: "pending",
      });

    if (insertError) {
      console.error("Contribution insertion error:", insertError);
      return { success: false, error: "Failed to record contribution. Please try again." };
    }

    revalidatePath("/contribution");
    revalidatePath("/finance");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Contribution submitted successfully! Verification is pending administrator review.",
    };
  } catch (err: any) {
    console.error("Contribution action exception:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export interface FinancialSummaryData {
  totalCollected: number;
  totalExpenses: number;
  remainingBalance: number;
  verifiedContributorsCount: number;
  expensesList: Array<{
    id: string;
    description: string;
    category: string;
    amount: number;
    expense_date: string;
    receipt_url: string | null;
    vendor_name: string | null;
  }>;
  categoryBreakdown: Record<string, number>;
}

export async function getFinancialData(): Promise<FinancialSummaryData> {
  try {
    const supabase = await createClient();

    // Sum verified contributions
    const { data: verifiedContribs } = await supabase
      .from("contributions")
      .select("amount")
      .eq("status", "verified");

    const totalCollected = (verifiedContribs || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const verifiedContributorsCount = (verifiedContribs || []).length;

    // Fetch expenses
    const { data: expenses } = await supabase
      .from("expenses")
      .select("id, description, category, amount, expense_date, receipt_url, vendor_name")
      .order("expense_date", { ascending: false });

    const totalExpenses = (expenses || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const remainingBalance = totalCollected - totalExpenses;

    const categoryBreakdown: Record<string, number> = {};
    (expenses || []).forEach((exp) => {
      categoryBreakdown[exp.category] = (categoryBreakdown[exp.category] || 0) + Number(exp.amount || 0);
    });

    return {
      totalCollected,
      totalExpenses,
      remainingBalance,
      verifiedContributorsCount,
      expensesList: (expenses || []).map((e) => ({
        ...e,
        amount: Number(e.amount),
      })),
      categoryBreakdown,
    };
  } catch (err) {
    console.error("Error fetching financial data:", err);
    return {
      totalCollected: 0,
      totalExpenses: 0,
      remainingBalance: 0,
      verifiedContributorsCount: 0,
      expensesList: [],
      categoryBreakdown: {},
    };
  }
}
