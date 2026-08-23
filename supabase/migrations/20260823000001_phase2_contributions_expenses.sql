-- ==========================================
-- PHASE 2 DATABASE MIGRATION: CONTRIBUTIONS & EXPENSES
-- IICT Fresher Party 2026 & Financial Transparency
-- ==========================================

-- 1. CONTRIBUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    payment_mode TEXT NOT NULL CHECK (payment_mode IN ('upi', 'cash', 'bank_transfer', 'other')),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    transaction_ref_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for quick lookups
CREATE INDEX IF NOT EXISTS idx_contributions_user_id ON public.contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON public.contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_payment_date ON public.contributions(payment_date);

-- Auto-update updated_at trigger for contributions
DROP TRIGGER IF EXISTS set_contributions_updated_at ON public.contributions;
CREATE TRIGGER set_contributions_updated_at
    BEFORE UPDATE ON public.contributions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 2. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Decoration', 'Food', 'Sound', 'Photography', 'Venue', 'Printing', 'Other')),
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_url TEXT,
    vendor_name TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for expenses
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(expense_date);

-- Auto-update updated_at trigger for expenses
DROP TRIGGER IF EXISTS set_expenses_updated_at ON public.expenses;
CREATE TRIGGER set_expenses_updated_at
    BEFORE UPDATE ON public.expenses
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 3. RLS POLICIES FOR CONTRIBUTIONS
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Policy 1: Authenticated users can submit their own contribution
CREATE POLICY "Users can create their own contribution"
    ON public.contributions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy 2: Users can view their own contributions
CREATE POLICY "Users can view their own contributions"
    ON public.contributions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy 3: Admins have full control over contributions
CREATE POLICY "Admins have full control over contributions"
    ON public.contributions
    FOR ALL
    TO authenticated
    USING (public.is_admin());

-- Policy 4: Approved students can view verified contributions (for totals & Wall of Honor)
CREATE POLICY "Approved students can view verified contributions"
    ON public.contributions
    FOR SELECT
    TO authenticated
    USING (status = 'verified' AND public.is_approved_student());

-- 4. RLS POLICIES FOR EXPENSES
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone / Approved students can read expenses for financial transparency
CREATE POLICY "Expenses readable by approved students"
    ON public.expenses
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy 2: Only admins can manage expenses
CREATE POLICY "Admins can manage expenses"
    ON public.expenses
    FOR ALL
    TO authenticated
    USING (public.is_admin());

-- 5. PUBLIC VERIFIED CONTRIBUTORS SECURE VIEW (Wall of Honor)
CREATE OR REPLACE VIEW public.public_verified_contributors AS
SELECT 
    c.id AS contribution_id,
    c.user_id,
    c.amount,
    c.payment_date,
    p.full_name,
    p.profile_photo_url,
    b.label AS batch_label
FROM public.contributions c
JOIN public.profiles p ON c.user_id = p.id
LEFT JOIN public.batches b ON p.batch_id = b.id
WHERE c.status = 'verified' AND p.approval_status = 'approved';

-- Grant access to authenticated users
GRANT SELECT ON public.public_verified_contributors TO authenticated;
