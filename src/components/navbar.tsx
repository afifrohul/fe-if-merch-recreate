"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToogle from "@/components/theme-toogle";
import { ShoppingCartIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [{ href: "/products", label: "Products" }];

  return (
    <div className="w-full flex justify-center">
      <nav className="fixed top-0 z-10 bg-background mx-auto rounded w-full bg-white/30 dark:bg-black/30 backdrop-blur-xs">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* LEFT */}
            <div className="flex items-center gap-8">
              <Link href={"/"}>
                <div className="flex justify-center items-center gap-2">
                  <div className="border p-2 rounded-lg bg-black">
                    <Image
                      src={"/logo-white.png"}
                      width={16}
                      height={16}
                      alt="logo"
                    />
                  </div>
                  <p className="font-bold">IF MERCH.</p>
                </div>
              </Link>
              <div className="flex gap-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-xs lg:text-sm hover:text-primary font-medium ${
                      pathname === item.href ? "text-primary underline" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <p className="text-sm font-medium hidden md:block">
                    Hi, {user.data[0].name}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logout.mutate()}
                    className="flex items-center gap-2 hover:cursor-pointer duration-200"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                  <Link href={"/cart"}>
                    <div className="border p-2 rounded-lg bg-primary hover:opacity-80 duration-200">
                      <ShoppingCartIcon className="w-4 h-4 text-secondary" />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"/login"}>
                    <p className="text-sm hover:underline">Log in</p>
                  </Link>
                  <Link href={"/register"}>
                    <div className="border px-2 py-1.5 rounded hover:bg-accent duration-200">
                      <p className="text-sm">Register</p>
                    </div>
                  </Link>
                </>
              )}
              <ThemeToogle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
