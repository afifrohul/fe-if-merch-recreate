"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import ConfirmButton from "@/components/confirm-button";
import SkeletonCart from "@/components/loader/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/cart/useCart";
import Image from "next/image";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/hooks/auth/useAuth";
import { useEffect } from "react";
import { useTransaction } from "@/hooks/transaction/useTransaction";

const formSchema = z.object({
  note: z.string().max(150, "Address must be at most 150 characters."),
});

export default function Checkout() {
  const { user } = useAuth();
  const profile = user?.data[0].profile;
  const { createMutation } = useTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: profile?.address || "",
    },
  });

  useEffect(() => {
    if (profile?.address) {
      form.reset({
        note: profile.address,
      });
    }
  }, [profile?.address, form]);

  const { data: carts, isLoading: loadingCart } = useCart();

  const checkout = carts?.filter(function (c) {
    return Boolean(c.is_checked) === true;
  });

  const extraPayload = checkout?.map((item) => ({
    product_variant_id: item.variant.id,
    quantity: item.quantity,
  }));

  const total = checkout?.reduce((sum, item) => {
    const price = Number(item.variant.price);
    return sum + price * item.quantity;
  }, 0);

  function onSubmit(data: z.infer<typeof formSchema>) {
    createMutation.mutate({
      ...data,
      items: extraPayload || [],
    });
  }

  return (
    <div className="p-4">
      <div className="w-fit">
        <h1 className="text-lg">Checkout</h1>
        <Separator />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="col-span-2 space-y-4">
            <div className="border rounded dark:bg-black p-4 flex flex-col gap-4">
              <div>
                <Controller
                  name="note"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="address">
                        Delivery Address
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="address"
                        aria-invalid={fieldState.invalid}
                        placeholder="Address..."
                        className="min-h-[90px]"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-4">
              {loadingCart ? (
                <SkeletonCart />
              ) : (
                checkout &&
                checkout?.map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 border rounded dark:bg-black p-4"
                  >
                    <div className="flex gap-4 w-full">
                      <div className="border rounded p-2">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_STORAGE_URL +
                            _.product.image
                          }
                          width={64}
                          height={64}
                          alt="image"
                          unoptimized
                        ></Image>
                      </div>
                      <div className="flex justify-between w-full">
                        <div>
                          <p className="">{_.product.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {_.variant.name}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <p className="font-semibold">
                            {_.quantity} x{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(_.variant.price)}
                          </p>
                          <p>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(_.variant.price * _.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="border rounded dark:bg-black p-4 h-fit">
            <h1 className="font-semibold">Shopping Summary</h1>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-muted-foreground">Total</p>
              <p className="font-semibold">
                {total
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(total)
                  : "-"}
              </p>
            </div>
            <Separator className="my-1"></Separator>
            <div className="w-full mt-2">
              <Button
                size={"sm"}
                className="w-full hover:cursor-pointer duration-200"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
