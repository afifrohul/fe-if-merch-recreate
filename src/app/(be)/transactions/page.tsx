"use client";

import { Separator } from "@/components/ui/separator";
import { useTransaction } from "@/hooks/transaction/useTransaction";
import Image from "next/image";
import { format } from "date-fns";
import { ShoppingBagIcon } from "lucide-react";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { RiMoneyDollarCircleLine, RiRefund2Line } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { TbClockExclamation } from "react-icons/tb";
import SkeletonTransaction from "@/components/loader/transaction";
import { Button } from "@/components/ui/button";
import ConfirmButton from "@/components/confirm-button";
import { toast } from "sonner";
import { useState } from "react";

export default function Transaction() {
  const {
    data: transactions,
    isLoading: loadingTransaction,
    updateCancel,
    updateComplete,
  } = useTransaction();

  const [filter, setFilter] = useState("");

  return (
    <div className="p-4 space-y-4">
      <div className="w-fit">
        <h1 className="text-lg">Transactions</h1>
        <Separator></Separator>
      </div>
      <div className="flex gap-2 items-center border p-3 rounded w-fit dark:bg-black">
        <p className="text-sm">Transaction Status</p>
        <div className="flex gap-2">
          <div
            className={`border rounded p-2 w-fit hover:cursor-pointer hover:border-primary hover:text-primary duration-200 ${
              filter === "" ? "border-primary text-primary" : null
            }`}
            onClick={() => setFilter("")}
          >
            <p className="text-sm">All</p>
          </div>
          <div
            className={`border rounded p-2 w-fit hover:cursor-pointer hover:border-primary hover:text-primary duration-200 ${
              filter === "pending" ? "border-primary text-primary" : null
            }`}
            onClick={() => setFilter("pending")}
          >
            <p className="text-sm">Pending</p>
          </div>
          <div
            className={`border rounded p-2 w-fit hover:cursor-pointer hover:border-primary hover:text-primary duration-200 ${
              filter === "canceled" ? "border-primary text-primary" : null
            }`}
            onClick={() => setFilter("canceled")}
          >
            <p className="text-sm">Canceled</p>
          </div>
          <div
            className={`border rounded p-2 w-fit hover:cursor-pointer hover:border-primary hover:text-primary duration-200 ${
              filter === "paid" ? "border-primary text-primary" : null
            }`}
            onClick={() => setFilter("paid")}
          >
            <p className="text-sm">Paid</p>
          </div>
          <div
            className={`border rounded p-2 w-fit hover:cursor-pointer hover:border-primary hover:text-primary duration-200 ${
              filter === "completed" ? "border-primary text-primary" : null
            }`}
            onClick={() => setFilter("completed")}
          >
            <p className="text-sm">Completed</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-2">
        <div className=" flex flex-col gap-4">
          {loadingTransaction ? (
            <SkeletonTransaction />
          ) : (
            transactions &&
            transactions
              ?.filter(function (t) {
                if (filter != "") {
                  return t.status === filter;
                } else {
                  return t;
                }
              })
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col  gap-3 border rounded dark:bg-black p-4 "
                >
                  <div className="flex gap-4 w-full">
                    <div className="flex items-center gap-2 justify-between text-xs w-full">
                      <div className="flex items-center gap-2">
                        <ShoppingBagIcon className="w-4 h-4" />
                        <p className="">
                          {format(
                            new Date(_.created_at),
                            "MMMM dd, yyyy H:ii:ss"
                          )}
                        </p>
                        <p>{_.midtrans_order_id}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div>Transaction Status</div>
                          {_.status === "pending" ? (
                            <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 font-medium text-orange-500">
                              <div className="flex items-center gap-1 text-xs">
                                <FiLoader className="h-4" /> Pending
                              </div>
                            </div>
                          ) : _.status === "paid" ? (
                            <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                              <div className="flex items-center gap-1 text-xs">
                                <RiMoneyDollarCircleLine className="h-4" /> Paid
                              </div>
                            </div>
                          ) : _.status === "canceled" ? (
                            <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                              <div className="flex items-center gap-1 text-xs">
                                <RxCrossCircled className="h-4" /> Canceled
                              </div>
                            </div>
                          ) : _.status === "completed" ? (
                            <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                              <div className="flex items-center gap-1 text-xs">
                                <FaRegCircleCheck className="h-4" /> Completed
                              </div>
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div>Payment Status</div>
                          <div>
                            {_.payment_status === "waiting" ? (
                              <div className="w-fit rounded border border-orange-300 bg-orange-50 px-1.5 py-0.5 font-medium text-orange-500">
                                <div className="flex items-center gap-1 text-xs">
                                  <FiLoader className="h-4" /> Waiting
                                </div>
                              </div>
                            ) : _.payment_status === "paid" ? (
                              <div className="w-fit rounded border border-green-300 bg-green-50 px-1.5 py-0.5 font-medium text-green-500">
                                <div className="flex items-center gap-1 text-xs">
                                  <RiMoneyDollarCircleLine className="h-4" />{" "}
                                  Paid
                                </div>
                              </div>
                            ) : _.payment_status === "failed" ? (
                              <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                <div className="flex items-center gap-1 text-xs">
                                  <BsExclamationCircle className="h-4" /> Failed
                                </div>
                              </div>
                            ) : _.payment_status === "expired" ? (
                              <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                <div className="flex items-center gap-1 text-xs">
                                  <TbClockExclamation className="h-4" /> Expired
                                </div>
                              </div>
                            ) : _.payment_status === "refunded" ? (
                              <div className="w-fit rounded border border-red-300 bg-red-50 px-1.5 py-0.5 font-medium text-red-500">
                                <div className="flex items-center gap-1 text-xs">
                                  <RiRefund2Line className="h-4" /> Refunded
                                </div>
                              </div>
                            ) : (
                              <span>-</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator></Separator>
                  <div className="grid grid-cols-4">
                    <div className="space-y-4 col-span-3">
                      {_.items.map((i, index) => (
                        <div className="flex gap-4 w-full" key={index}>
                          <div className="border rounded p-2">
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_STORAGE_URL +
                                i.product_image
                              }
                              width={64}
                              height={64}
                              alt="image"
                              unoptimized
                            ></Image>
                          </div>
                          <div>
                            <div>
                              <p className="">
                                {i.product_name} |{" "}
                                <span className="text-muted-foreground text-sm">
                                  {i.variant_name} | {i.sku}
                                </span>
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {i.quantity} item(s) x{" "}
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(Number(i.price))}
                              </p>
                              <p className="text-muted-foreground text-sm font-semibold">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(i.quantity * Number(i.price))}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-l px-6 text-sm">
                      <p>Total Amount</p>
                      <p className="font-semibold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(Number(_.total_amount))}
                      </p>
                    </div>
                  </div>
                  <Separator></Separator>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold">Deliver Address</p>
                      <p className="text-muted-foreground">{_.notes}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Payment Method</p>
                      <p className="text-muted-foreground">
                        {_.payment_method || "-"}
                      </p>
                    </div>
                    {_.payment_status === "waiting" && (
                      <div>
                        <p className="font-semibold">Payment Link</p>
                        <p className="text-muted-foreground">
                          <a
                            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-800 duration-200"
                            href={
                              process.env
                                .NEXT_PUBLIC_MIDTRANS_SNAP_TOKEN_REDIRECTION +
                              _.midtrans_snap_token
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here to pay
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                  <Separator></Separator>
                  <div className="flex justify-end">
                    {_.payment_status === "waiting" && (
                      <ConfirmButton
                        onConfirm={() =>
                          updateCancel.mutate(_.id, {
                            onError: () => toast.error("Failed"),
                          })
                        }
                      >
                        <Button
                          className="hover:cursor-pointer duration-200"
                          size={"sm"}
                          variant={"destructive"}
                        >
                          Cancel Transaction
                        </Button>
                      </ConfirmButton>
                    )}
                    {_.payment_status === "paid" && _.status === "paid" && (
                      <ConfirmButton
                        description="Complete transaction means you have received the product from the seller."
                        onConfirm={() =>
                          updateComplete.mutate(_.id, {
                            onError: () => toast.error("Failed"),
                          })
                        }
                      >
                        <Button
                          className="hover:cursor-pointer duration-200"
                          size={"sm"}
                        >
                          Complete Transaction
                        </Button>
                      </ConfirmButton>
                    )}
                    {_.status === "canceled" && (
                      <p className="text-sm text-red-600 font-semibold">
                        Transaction Canceled
                      </p>
                    )}
                    {_.status === "completed" && (
                      <p className="text-sm text-green-600 font-semibold">
                        Transaction Completed
                      </p>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
