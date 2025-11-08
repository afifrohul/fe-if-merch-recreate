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

const fetchProduct = async ({
  search,
}: {
  search: string;
}): Promise<Product[]> => {
  const res = await api.get(`/products?search=${search}`);
  return res.data.data;
};

export function useProducts(search: string = "") {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProduct({ search }),
  });
}
