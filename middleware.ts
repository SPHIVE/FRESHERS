import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env variables are placeholders during build or initial dev setup, pass through
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder-url")) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const isStudentProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/help-hub");
  const isAdminRoute = pathname.startsWith("/admin");
  const isPendingRoute = pathname.startsWith("/pending-approval");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (!user) {
    if (isStudentProtectedRoute || isAdminRoute || isPendingRoute) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Fetch profile status for authenticated user
  const { data: profile } = await supabase
    .from("profiles")
    .select("approval_status, is_admin")
    .eq("id", user.id)
    .single();

  const isApproved = profile?.approval_status === "approved";
  const isAdmin = Boolean(profile?.is_admin);

  if (isAdminRoute) {
    if (!isAdmin) {
      url.pathname = isApproved ? "/profile" : "/pending-approval";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (isStudentProtectedRoute) {
    if (!isApproved && !isAdmin) {
      url.pathname = "/pending-approval";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (isPendingRoute) {
    if (isApproved) {
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (isAuthRoute) {
    if (isAdmin) {
      url.pathname = "/admin/students";
      return NextResponse.redirect(url);
    }
    if (isApproved) {
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    url.pathname = "/pending-approval";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
