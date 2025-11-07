import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Category = {
  id: number;
  name: string;
  slug: string;
};

const fetchCategory = async (): Promise<Category[]> => {
  const res = await api.get("/product-categories");
  return res.data.data;
};

export function useCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: fetchCategory,
  });
}
