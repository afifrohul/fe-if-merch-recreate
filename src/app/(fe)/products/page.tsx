"use client";

import SkeletonCategory from "@/components/loader/category";
import SkeletonProduct from "@/components/loader/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/content/useCategory";
import { useProducts } from "@/hooks/content/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Products() {
  const { data: categories, isLoading: loadingCategory } = useCategories();
  const { data: products, isLoading: loadingProduct } = useProducts();

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");

  return (
    <div>
      <div className="flex gap-8">
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
          <div>
            <Input type="search" placeholder="Search for products..." />
          </div>
          {loadingProduct ? (
            <SkeletonProduct />
          ) : (
            products && (
              <div className="grid grid-cols-3 gap-4">
                {products
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
                          src={`https://be-if-merch-recreate.test/storage/${_.image}`}
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
            )
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
    </div>
  );
}
