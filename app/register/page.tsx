import { createClient } from "@/lib/supabase/server";
import RegisterForm from "./register-form";

export const revalidate = 0;

export default async function RegisterPage() {
  const supabase = await createClient();

  // Fetch batches from dynamic database table
  const { data: batches, error } = await supabase
    .from("batches")
    .select("id, label, start_year, end_year")
    .eq("active", true)
    .order("start_year", { ascending: true });

  const fallbackBatches = [
    { id: "11111111-1111-1111-1111-111111111111", label: "2023–2027", start_year: 2023, end_year: 2027 },
    { id: "22222222-2222-2222-2222-222222222222", label: "2024–2028", start_year: 2024, end_year: 2028 },
    { id: "33333333-3333-3333-3333-333333333333", label: "2025–2029", start_year: 2025, end_year: 2029 },
    { id: "44444444-4444-4444-4444-444444444444", label: "2026–2030", start_year: 2026, end_year: 2030 },
  ];

  const activeBatches = batches && batches.length > 0 ? batches : fallbackBatches;

  return <RegisterForm batches={activeBatches} />;
}
