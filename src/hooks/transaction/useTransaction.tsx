import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

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
  midtrans_order_id: string;
  created_at: string;
  items: Items[];
};

const fetchTransaction = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data.data;
};

export function useTransaction() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["transaction"],
    queryFn: fetchTransaction,
  });

  return { ...query };
}
