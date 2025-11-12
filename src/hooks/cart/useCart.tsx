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

// --- GET ALL CART ---
const fetchCart = async (): Promise<Cart[]> => {
  const res = await api.get("/cart");
  return res.data.data;
};

// --- DELETE ITEM ---
const deleteCartItem = async (id: number): Promise<void> => {
  await api.delete(`/cart/${id}`);
};

// --- ADD ITEM ---
const addToCart = async (payload: {
  product_id: number;
  product_variant_id: number;
}): Promise<void> => {
  await api.post("/cart", payload);
};

export function useCart() {
  const queryClient = useQueryClient();

  // Fetch cart data
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  // Delete cart item
  const deleteMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Add item to cart
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    ...query,
    addToCart: addMutation.mutate,
    deleteCart: deleteMutation.mutate,
    adding: addMutation.isPending,
    deleting: deleteMutation.isPending,
  };
}
