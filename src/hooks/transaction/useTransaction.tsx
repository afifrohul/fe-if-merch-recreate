"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Items = {
  id: number;
  product_image: string;
  product_name: string;
  variant_name: string;
  sku: string;
  price: string;
  quantity: number;
};

type Transaction = {
  id: number;
  invoice_number: string;
  total_amount: string;
  status: string;
  payment_status: string;
  payment_method: string;
  midtrans_order_id: string;
  midtrans_snap_token: string;
  notes: string;
  created_at: string;
  items: Items[];
};

const fetchTransaction = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data.data;
};

type ItemTransactions = {
  product_variant_id: number;
  quantity: number;
};

const createTransaction = async (payload: {
  items: ItemTransactions[];
  note: string;
}): Promise<void> => {
  const res = await api.post("/transactions", payload);
  return res.data;
};

export function useTransaction() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["transaction"],
    queryFn: fetchTransaction,
  });

  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction created successfully");

      router.push("/transactions");

      if (response?.redirect_url) {
        window.open(response.redirect_url, "_blank");
      }
    },
  });

  const updateCancel = useMutation({
    mutationFn: async (id: number) => {
      return await api.put(`/update-cancel/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction cancelled successfully");
    },
  });

  const updateComplete = useMutation({
    mutationFn: async (id: number) => {
      return await api.put(`/update-complete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction completed successfully");
    },
  });

  return { ...query, createMutation, updateCancel, updateComplete };
}
