"use client";

import ConfirmButton from "@/components/confirm-button";
import SkeletonCart from "@/components/loader/cart";
import { QtyCounter } from "@/components/qty-counter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/cart/useCart";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Cart() {
  const {
    data: carts,
    isLoading: loadingCart,
    deleteCart,
    toggleCheck,
    updateQty,
  } = useCart();

  const handleDelete = (id: number) => {
    deleteCart(id, {
      onSuccess: () => {
        toast.success("Item removed from cart");
      },
      onError: () => {
        toast.error("Failed to remove item");
      },
    });
  };

  const checked_carts = carts?.filter(function (c) {
    return Boolean(c.is_checked) === true;
  });

  const total = checked_carts?.reduce((sum, item) => {
    const price = Number(item.variant.price);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <div className="w-fit">
        <h1 className="text-lg">Cart</h1>
        <Separator />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="col-span-2 border rounded dark:bg-black p-4 flex flex-col gap-4">
          {loadingCart ? (
            <SkeletonCart />
          ) : (
            carts &&
            carts?.map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <Checkbox
                  checked={Boolean(_.is_checked)}
                  onCheckedChange={() =>
                    toggleCheck(_.id, { onError: () => toast.error("Failed") })
                  }
                  className=""
                />

                <div className="flex gap-4 w-full">
                  <div className="border rounded p-2">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_STORAGE_URL + _.product.image
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
                      <p className="font-medium">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(_.variant.price)}
                      </p>
                      <div className="flex gap-4 items-center">
                        <ConfirmButton
                          onConfirm={() => handleDelete(_.id)}
                          title="Do you want to remove this item from your cart?"
                        >
                          <div className="border w-fit h-fit p-1.5 rounded hover:cursor-pointer duration-200 hover:bg-neutral-100 hover:dark:bg-neutral-700">
                            <TrashIcon className="w-3 h-3" />
                          </div>
                        </ConfirmButton>
                        <Separator orientation="vertical"></Separator>
                        <QtyCounter
                          qty={_.quantity}
                          onChange={(newQty) =>
                            updateQty(
                              { id: _.id, quantity: newQty },
                              {
                                onError: () =>
                                  toast.error("Failed to update quantity"),
                              }
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
            <Link href={"/checkout"}>
              <Button
                size={"sm"}
                className="w-full hover:cursor-pointer duration-200"
                disabled={checked_carts?.length == 0}
              >
                Buy{" "}
                {(checked_carts?.length ?? 0) > 0
                  ? `(${checked_carts?.length ?? 0})`
                  : null}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
