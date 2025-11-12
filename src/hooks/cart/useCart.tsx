import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Product = {
  id: number;
  image: string;
  name: string;
  slug: string;
  price: number;
  category: string;
};

type Variant = {
  id: number;
  product_id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
};

type Cart = {
  id: number;
  user_id: number;
  product_id: number;
  product_variant_id: number;
  product: Product;
  variant: Variant;
};

const fetchCart = async (): Promise<Cart[]> => {
  const res = await api.get("/cart");
  return res.data.data;
};

export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const deleteCart = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { ...cartQuery, deleteCart };
}
