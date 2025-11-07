import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Product = {
  id: number;
  image: string;
  name: string;
  slug: string;
  price: number;
  category: string;
};

const fetchProduct = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data.data;
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });
}
