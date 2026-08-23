-- ==========================================
-- PHASE 1 DATABASE MIGRATION & RLS POLICIES
-- IICT Fresher Party 2026 & Student Help Hub
-- ==========================================

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. BATCHES TABLE
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL UNIQUE,
    start_year INT NOT NULL,
    end_year INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed initial batches
INSERT INTO public.batches (label, start_year, end_year)
VALUES 
    ('2023–2027', 2023, 2027),
    ('2024–2028', 2024, 2028),
    ('2025–2029', 2025, 2029),
    ('2026–2030', 2026, 2030)
ON CONFLICT (label) DO NOTHING;

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    roll_number TEXT NOT NULL UNIQUE,
    batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    phone TEXT NOT NULL,
    profile_photo_url TEXT,
    approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    is_admin BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance & lookups
CREATE INDEX IF NOT EXISTS idx_profiles_batch_id ON public.profiles(batch_id);
CREATE INDEX IF NOT EXISTS idx_profiles_approval_status ON public.profiles(approval_status);
CREATE INDEX IF NOT EXISTS idx_profiles_roll_number ON public.profiles(roll_number);

-- Auto-update updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 3. SECURITY DEFINER HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_approved_student()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND approval_status = 'approved'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. ROW LEVEL SECURITY (RLS) FOR BATCHES
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Anyone (public or authenticated) can read active batches (required for registration dropdown)
CREATE POLICY "Batches are readable by everyone"
    ON public.batches
    FOR SELECT
    USING (true);

-- Only admins can modify batches
CREATE POLICY "Admins can insert/update batches"
    ON public.batches
    FOR ALL
    USING (public.is_admin());

-- 5. ROW LEVEL SECURITY (RLS) FOR PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can insert their own profile during registration
CREATE POLICY "Users can create their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Policy 2: Users can view their own profile
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Policy 3: Users can update their allowed profile fields (e.g. photo/phone)
CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy 4: Administrators have full access (select, insert, update, delete) to all profiles
CREATE POLICY "Admins have full access to all profiles"
    ON public.profiles
    FOR ALL
    USING (public.is_admin());

-- 6. PUBLIC SAFE STUDENT PROFILES VIEW (For future approved student listing without leaking private fields)
CREATE OR REPLACE VIEW public.public_student_profiles AS
SELECT 
    p.id,
    p.full_name,
    p.profile_photo_url,
    p.batch_id,
    b.label AS batch_label,
    p.created_at
FROM public.profiles p
LEFT JOIN public.batches b ON p.batch_id = b.id
WHERE p.approval_status = 'approved';

-- Grant access to public view for authenticated approved users
GRANT SELECT ON public.public_student_profiles TO authenticated;

-- 7. SUPABASE STORAGE BUCKET FOR STUDENT PROFILE PHOTOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-profile-photos', 'student-profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 1. Anyone (public or authenticated) can upload a registration profile photo
CREATE POLICY "Anyone can upload registration profile photo"
    ON storage.objects
    FOR INSERT
    TO public, authenticated
    WITH CHECK (bucket_id = 'student-profile-photos');

-- 2. Anyone can view public profile photos
CREATE POLICY "Public profile photos read access"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'student-profile-photos');

-- 3. Users can update/delete their own profile photo or Admin can manage all
CREATE POLICY "Users and Admins can update profile photos"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'student-profile-photos');

CREATE POLICY "Users and Admins can delete profile photos"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'student-profile-photos');
