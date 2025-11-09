"use client";

import { useRedirectIfAuthenticated } from "@/hooks/auth/useRedirectIfAuthenticated";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  useRedirectIfAuthenticated();
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
