// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Cookies from "js-cookie";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function useAuth() {
  const router = useRouter();
  const qc = useQueryClient();

  // === LOGIN ===
  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      // simpan token di cookie (non-HttpOnly untuk sekarang)
      if (data.token) {
        Cookies.set("token", data.token, { sameSite: "lax" });
      }
      // refresh data user
      qc.invalidateQueries({ queryKey: ["auth-check"] });
      toast.success("Login success!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Invalid email or password."
      );
    },
  });

  // === REGISTER ===
  const register = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await api.post("/register", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registration successful! You can now log in.");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Registration failed.");
    },
  });

  // === LOGOUT ===
  const logout = useMutation({
    mutationFn: async () => {
      // api will read cookie (if necessary) or Authorization header from interceptor
      await api.post("/logout");
    },
    onSuccess: () => {
      Cookies.remove("token");
      qc.invalidateQueries({ queryKey: ["auth-check"] });
      toast.success("Logged out");
      router.push("/login");
    },
    onError: () => {
      // tetap remove token secara lokal
      Cookies.remove("token");
      qc.invalidateQueries({ queryKey: ["auth-check"] });
      router.push("/login");
    },
  });

  // === AUTH CHECK (GET CURRENT USER) ===
  const {
    data: user,
    isLoading: checking,
    refetch: refetchUser,
    isError,
  } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      // If backend requires Bearer header, interceptor already sets it from cookie
      const res = await api.get("/user");
      return res.data;
    },
    retry: false,
    // jika token tidak ada di cookie, kita bisa langsung throw untuk menghindari request
    enabled: typeof window !== "undefined" ? true : false, // only run on client by default
  });

  // cleanup token ketika user invalid
  useEffect(() => {
    if (!checking && isError) {
      Cookies.remove("token");
    }
  }, [checking, isError]);

  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);

  return {
    login,
    register,
    logout,
    user,
    checking,
    refetchUser,
    isAuthenticated,
  };
}
