import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const fetchFAQ = async (): Promise<FAQ[]> => {
  const res = await api.get("/faqs");
  return res.data.data;
};

export function useFAQs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQ,
  });
}
