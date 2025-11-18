"use client";

import { useDebounce } from "@uidotdev/usehooks";
import SkeletonCategory from "@/components/loader/category";
import SkeletonProduct from "@/components/loader/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/content/useCategory";
import { useProducts } from "@/hooks/content/useProducts";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Products() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: categories, isLoading: loadingCategory } = useCategories();
  const { data: products, isLoading: loadingProduct } =
    useProducts(debouncedSearchTerm);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex gap-8 min-h-screen">
        <div className=" pr-12">
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Categories
          </p>
          {loadingCategory ? (
            <SkeletonCategory />
          ) : (
            categories && (
              <div className="flex flex-col mt-2">
                <Button
                  variant={"link"}
                  size={"sm"}
                  className={`w-fit p-0 text-black hover:cursor-pointer duration-200 dark:text-white ${
                    category === "" ? "underline" : null
                  }`}
                  onClick={() => setCategory("")}
                >
                  All
                </Button>
                {categories.map((item, index) => (
                  <Button
                    key={index}
                    variant={"link"}
                    size={"sm"}
                    className={`w-fit p-0 text-black hover:cursor-pointer duration-200 dark:text-white ${
                      category === item.name ? "underline" : null
                    }`}
                    onClick={() => setCategory(item.name)}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            )
          )}
        </div>
        <div className=" flex-1 space-y-4">
          <div className="flex gap-4">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button disabled={loadingProduct}>
              {loadingProduct ? <Spinner /> : <SearchIcon />}
            </Button>
          </div>
          {loadingProduct ? (
            <SkeletonProduct />
          ) : products?.length === 0 ? (
            <div className="text-center mt-6">
              There are no products that match{" "}
              <span className="font-semibold">"{debouncedSearchTerm}"</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {(products ?? [])
                .filter(function (p) {
                  if (category != "") {
                    return p.category === category;
                  } else {  
                    return p;
                  }
                })
                .sort((a, b) => {
                  if (sort === "asc") {
                    return a.price - b.price;
                  } else {
                    return b.price - a.price;
                  }
                })
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer  rounded border   group"
                  >
                    <Link href={`/products/${_.slug}`}>
                      <Image
                        src={process.env.NEXT_PUBLIC_STORAGE_URL + _.image}
                        width={320}
                        height={320}
                        alt={_.name}
                        loading="eager"
                        unoptimized
                        className="p-16 group-hover:scale-105 duration-300"
                      />
                      <div className="absolute rounded-full border left-4 top-2">
                        <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-xs font-semibold">
                          <p>{_.name}</p>
                          <div className="bg-primary rounded-full px-2 py-1">
                            <p className="">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(_.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className=" pr-12">
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Sort By
          </p>
          <div className="flex flex-col mt-2">
            <Button
              variant={"link"}
              size={"sm"}
              className={`w-fit p-0 text-black hover:cursor-pointer duration-200 dark:text-white ${
                sort === "asc" ? "underline" : null
              }`}
              onClick={() => setSort("asc")}
            >
              Price: Low to high
            </Button>
            <Button
              variant={"link"}
              size={"sm"}
              className={`w-fit p-0 text-black hover:cursor-pointer duration-200 dark:text-white ${
                sort === "desc" ? "underline" : null
              }`}
              onClick={() => setSort("desc")}
            >
              Price: High to low
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
