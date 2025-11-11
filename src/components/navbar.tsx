"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToogle from "@/components/theme-toogle";
import {
  ShoppingCartIcon,
  LogOut,
  LayoutDashboardIcon,
  UserRoundPenIcon,
  BanknoteIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [{ href: "/products", label: "Products" }];

  return (
    <div className="w-full flex justify-center">
      <nav className="bg-background mx-auto rounded w-full bg-white/30 dark:bg-black/30 backdrop-blur-xs ">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex gap-1 items-center hover:cursor-pointer duration-200">
                        <p className="text-sm">Hi, {user.data[0].name}</p>
                        <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link
                            href={"/profile"}
                            className="flex gap-2 items-center"
                          >
                            <UserRoundPenIcon className="w-4 h-4" /> Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={"/cart"}
                            className="flex gap-2 items-center"
                          >
                            <ShoppingCartIcon className="w-4 h-4" />
                            Cart
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={"/transactions"}
                            className="flex gap-2 items-center"
                          >
                            <BanknoteIcon className="w-4 h-4" /> Transactions
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => logout.mutate()}>
                        <LogOut className="w-4 h-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
