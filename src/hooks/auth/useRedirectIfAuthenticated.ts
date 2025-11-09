"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

export function useRedirectIfAuthenticated() {
  const router = useRouter();
  const { isAuthenticated, checking } = useAuth();

  useEffect(() => {
    if (!checking && isAuthenticated) {
      router.replace("/");
    }
  }, [checking, isAuthenticated, router]);
}
