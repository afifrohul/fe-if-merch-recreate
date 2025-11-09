"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/hooks/auth/useAuth";

const formSchema = z.object({
  email: z.email("Input must be valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(12, "Password must be at most 12 characters."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    login.mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href={"/"}>
              <div className="flex justify-center items-center gap-2">
                <div className="border p-2 rounded-lg bg-black">
                  <Image
                    src={"/logo-white.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  ></Image>
                </div>
                <p className="font-bold">IF MERCH.</p>
              </div>
            </Link>
            <h1 className="text-xl font-bold">Welcome to IF MERCH.</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </FieldDescription>
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="m@example.com"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? "Loading..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
