import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";

type ProfilePayload = {
  gender?: string;
  address?: string;
  phone_number?: string;
};

export function useProfile() {
  const updateProfile = useMutation({
    mutationFn: async (payload: ProfilePayload) => {
      const res = await api.post("/profile", payload);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Failed to update profile.");
    },
  });

  return { updateProfile };
}
