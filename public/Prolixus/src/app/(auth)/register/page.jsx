"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to login page with register mode, preserving redirect if any
    const redirect = searchParams.get("redirect");
    const loginUrl = `/login?mode=register${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`;
    router.replace(loginUrl);
  }, [router, searchParams]);

  return null;
}
