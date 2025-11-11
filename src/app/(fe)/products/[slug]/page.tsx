"use client";

import { useDetailProducts, useProducts } from "@/hooks/content/useProducts";
import { useParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonDetailProduct from "@/components/loader/detail-product";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/auth/useAuth";

export default function DetailProduct() {
  const params = useParams<{ slug: string }>();
  const { data: detailProduct, isLoading: loadingDetailProduct } =
    useDetailProducts(params.slug);
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link href={"/products"}>
        <Button
          variant={"outline"}
          className="hover:cursor-pointer duration-200"
        >
          <IoIosArrowBack />
          <p>Back to products</p>
        </Button>
      </Link>
      <div className="space-y-4 mt-4">
        <div className="bg-white dark:bg-black rounded-lg p-4 border">
          {loadingDetailProduct ? (
            <SkeletonDetailProduct></SkeletonDetailProduct>
          ) : (
            <div className="flex justify-center">
              <Carousel className="w-full max-w-lg">
                <CarouselContent>
                  {detailProduct?.galleries.map((_, index) => (
                    <CarouselItem
                      key={index}
                      className=" bg-white dark:bg-black flex justify-center items-center"
                    >
                      <div className="p-1">
                        <Image
                          src={process.env.NEXT_PUBLIC_STORAGE_URL + _.image}
                          width={480}
                          height={480}
                          alt="php"
                          className="p-2"
                          unoptimized
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="w-xl rounded ml-32 px-4 py-12">
                <div className="space-y-3">
                  <h1 className="text-3xl font-medium">
                    {detailProduct?.name}
                  </h1>
                  <Separator></Separator>
                  <p className="text-sm">{detailProduct?.description}</p>
                  <Separator></Separator>
                  <div>
                    <p className="text-lg font-medium">Product Variants</p>
                    <div className="flex flex-wrap gap-x-2">
                      {detailProduct?.variants.map((_, index) => (
                        <div
                          key={index}
                          className="border w-fit py-1 px-2 rounded mt-2 hover:border-primary hover:cursor-pointer duration-200"
                        >
                          <p className="text-sm">
                            {_.name} @
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(_.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {user ? (
                    <div className="mt-4">
                      <Button
                        size={"sm"}
                        className="w-full hover:cursor-pointer duration-200"
                      >
                        <ShoppingCartIcon />
                        <p className="font-medium">Add to cart</p>
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Link href={"/login"}>
                        <Button
                          size={"sm"}
                          className="w-full hover:cursor-pointer duration-200"
                        >
                          <p className="font-medium">
                            Log in to add items to your cart
                          </p>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="space-y-4">
            <div className="space-y-2 w-fit">
              <p className="text-xl font-medium">Related Product</p>
              <Separator></Separator>
            </div>
            <div className="flex size-full items-center justify-center bg-background">
              <Marquee>
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent
                  className="overflow-hidden"
                  pauseOnHover={false}
                >
                  {loadingProducts
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <MarqueeItem className="h-96 " key={index}>
                          <Skeleton className="w-96 h-96"></Skeleton>
                        </MarqueeItem>
                      ))
                    : products
                        ?.filter(function (p) {
                          return p.slug !== params.slug;
                        })
                        .map((_, index) => (
                          <MarqueeItem className="h-96 " key={index}>
                            <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer rounded border group h-full">
                              <Link
                                href={`/products/${_.slug}`}
                                className="h-full flex justify-center items-center"
                              >
                                <Image
                                  src={
                                    process.env.NEXT_PUBLIC_STORAGE_URL +
                                    _.image
                                  }
                                  width={320}
                                  height={320}
                                  alt="php"
                                  className="p-20 group-hover:scale-105 duration-300"
                                  unoptimized
                                />
                                <div className="absolute rounded-full border left-2 top-80">
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
                          </MarqueeItem>
                        ))}
                </MarqueeContent>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
