import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  // === LOGIN ===
  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
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
      const token = localStorage.getItem("token");
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out");
      router.push("/login");
    },
  });

  // ✅ Return semua agar bisa dipakai di seluruh app
  return { login, register, logout };
}
