"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

export function QtyCounter({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="border rounded p-1.5 hover:cursor-pointer hover:dark:bg-neutral-700 duration-200"
        onClick={() => onChange(Math.max(1, qty - 1))}
      >
        <MinusIcon className="w-3 h-3"></MinusIcon>
      </div>

      <span>{qty}</span>

      <div
        className="border rounded p-1.5 hover:cursor-pointer hover:dark:bg-neutral-700 duration-200 "
        onClick={() => onChange(qty + 1)}
      >
        <PlusIcon className="w-3 h-3"></PlusIcon>
      </div>
    </div>
  );
}
