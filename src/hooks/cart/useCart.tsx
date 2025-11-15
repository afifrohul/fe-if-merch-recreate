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
  quantity: number;
  is_checked: boolean;
  product: Product;
  variant: Variant;
};

const fetchCart = async (): Promise<Cart[]> => {
  const res = await api.get("/cart");
  return res.data.data;
};

const deleteCartItem = async (id: number): Promise<void> => {
  await api.delete(`/cart/${id}`);
};

const addToCart = async (payload: {
  product_id: number;
  product_variant_id: number;
}): Promise<void> => {
  await api.post("/cart", payload);
};

export function useCart() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const toggleCheck = useMutation({
    mutationFn: async (id: number) => {
      return await api.put(`/update-check/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQty = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return await api.put(`/update-qty/${id}`, { quantity });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return {
    ...query,
    addToCart: addMutation.mutate,
    deleteCart: deleteMutation.mutate,
    adding: addMutation.isPending,
    deleting: deleteMutation.isPending,
    toggleCheck: toggleCheck.mutate,
    updateQty: updateQty.mutate,
  };
}
