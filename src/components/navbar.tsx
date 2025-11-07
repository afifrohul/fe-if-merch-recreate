"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToogle from "@/components/theme-toogle";
import { ShoppingCartIcon } from "lucide-react";

export default function Navbar() {
  // const pathname = usePathname();
  const navItems = [
    { href: "/products", label: "All" },
    { href: "/clothes", label: "Clothes" },
    { href: "/accessories", label: "Accessories" },
    // { href: "/experiences", label: "experiences" },
  ];
  return (
    <div className="w-full flex justify-center ">
      <nav className="fixed top-0 z-10 bg-background mx-auto rounded w-full bg-white/30 dark:bg-black/30 backdrop-blur-xs">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            <div className="flex items-center gap-8">
              <Link href={"/"}>
                <div className="flex justify-center items-center gap-2">
                  <div className="border p-2 rounded-lg bg-black">
                    <Image
                      src={"/logo-white.png"}
                      width={16}
                      height={16}
                      alt="logo"
                    ></Image>
                  </div>
                  <p className="font-bold">IF MERCH.</p>
                </div>
              </Link>
              <div className="flex gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs lg:text-sm transition-all duration-300 hover:text-primary hover:underline font-medium`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="border p-2 rounded-lg bg-primary">
                <ShoppingCartIcon className="w-4 h-4 text-secondary"></ShoppingCartIcon>
              </div>
              <ThemeToogle></ThemeToogle>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
