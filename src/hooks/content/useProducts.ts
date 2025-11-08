import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Variant = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type Gallery = {
  id: number;
  image: string;
};

type Product = {
  id: number;
  image: string;
  name: string;
  slug: string;
  price: number;
  category: string;
};

type DetailProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  variants: Variant[];
  galleries: Gallery[];
};

const fetchProduct = async ({
  search,
}: {
  search: string;
}): Promise<Product[]> => {
  const res = await api.get(`/products?search=${search}`);
  return res.data.data;
};

function useProducts(search: string = "") {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProduct({ search }),
  });
}

const fetchDetailProduct = async ({
  slug,
}: {
  slug: string;
}): Promise<DetailProduct> => {
  const res = await api.get(`/product/${slug}`);
  return res.data.data;
};

function useDetailProducts(slug: string = "") {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchDetailProduct({ slug }),
  });
}

export { useProducts, useDetailProducts };
