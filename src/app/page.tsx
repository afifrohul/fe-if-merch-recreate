"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { useFAQs } from "@/hooks/content/useFAQ";
import SkeletonFAQ from "@/components/loader/faq";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SimpleLoader from "@/components/loader/simple-loader";

export default function Home() {
  const [isClientChecked, setIsClientChecked] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { data: faqs, isLoading } = useFAQs();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) setIsReady(true);
    else setShowLoader(true);
    setIsClientChecked(true);
  }, []);

  useEffect(() => {
    if (showLoader && !isLoading) {
      sessionStorage.setItem("hasLoaded", "true");
      setTimeout(() => setIsFadingOut(true), 100);
      const timeout = setTimeout(() => {
        setShowLoader(false);
        setIsReady(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [showLoader, isLoading]);

  if (!isClientChecked) return null;
  if (showLoader && !isReady) return <SimpleLoader fadingOut={isFadingOut} />;

  const content = [
    {
      image: "/product/bucket.png",
      name: "Infortination Bucket Hat",
      price: 39000,
    },
    {
      image: "/product/tumblr.png",
      name: "Informatics Tumbler",
      price: 59000,
    },
    {
      image: "/product/jacketCream.png",
      name: "Informatics Jacket",
      price: 140000,
    },
    {
      image: "/product/phphd.png",
      name: "T-shirt PHP Web Programmer",
      price: 89000,
    },
    {
      image: "/product/lanyard.png",
      name: "IF Merch Lanyard",
      price: 15000,
    },
    {
      image: "/product/ganci.png",
      name: "Keychain Infortination",
      price: 10000,
    },
    {
      image: "/product/serealhd.png",
      name: "T-shirt Sereal Coding",
      price: 89000,
    },
    {
      image: "/product/bag.png",
      name: "Totebag IF Merch",
      price: 45000,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Navbar></Navbar>
      <div className="px-4 space-y-4 mt-24">
        <div className="grid grid-cols-[repeat(3, 1fr)] grid-rows-[repeat(2, 1fr)] gap-4">
          <div className="bg-white dark:bg-black relative relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-span-2 row-span-2 group">
            <Image
              src={"/product/jshd.png"}
              width={720}
              height={720}
              alt="js"
              className="p-24 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-16 top-[450px]">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>T-shirt Javascript Web Programmer</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(89000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-start-3 group">
            <Image
              src={"/product/jacket.png"}
              width={360}
              height={360}
              alt="php"
              className="p-12 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-4 top-72">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>Informatics Jacket</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(140000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer   rounded border col-start-3 row-start-2 group">
            <Image
              src={"/product/cap.png"}
              width={360}
              height={360}
              alt="sereal"
              className="p-12 group-hover:scale-105 duration-300"
            />
            <div className="absolute rounded-full border left-4 top-72">
              <div className="py-1 pr-1 pl-4 flex items-center gap-4 text-sm font-semibold">
                <p>Infortination Cap Hat</p>
                <div className="bg-primary rounded-full px-2 py-1">
                  <p className="">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(45000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex size-full items-center justify-center bg-background">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent className="overflow-hidden" pauseOnHover={false}>
              {content.map((_, index) => (
                <MarqueeItem className="" key={index}>
                  <div className="bg-white dark:bg-black relative flex justify-center items-center hover:border-primary duration-200 hover:cursor-pointer  rounded border col-start-3 group">
                    <Image
                      src={_.image}
                      width={320}
                      height={320}
                      alt="php"
                      className="p-16 group-hover:scale-105 duration-300"
                    />
                    <div className="absolute rounded-full border left-4 top-64">
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
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
        <div className=" p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="w-fit">
                <h1 className="font-semibold">About IF MERCH</h1>
                <Separator className="my-2"></Separator>
              </div>
              <div className="mt-6">
                <p className="text-sm">
                  IF MERCH is a branding product of the Entrepreneurship
                  Division of HMIF UNEJ that guarantees 100% premium quality
                  materials. Our products include T-shirts, jackets, hats, and
                  various accessories with an informatics theme.
                </p>
              </div>
            </div>
            <div>
              <div className="w-fit">
                <h1 className="font-semibold">
                  Frequently Asked Questions (FAQ)
                </h1>
                <Separator className="my-2"></Separator>
              </div>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  {isLoading ? (
                    <SkeletonFAQ />
                  ) : (
                    faqs &&
                    faqs.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <p>{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </motion.div>
  );
}
