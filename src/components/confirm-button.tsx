"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmButtonProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  children?: ReactNode;
  onConfirm?: () => void;
}

export default function ConfirmButton({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes, I'm sure",
  cancelText = "Cancel",
  variant = "default",
  children,
  onConfirm,
}: ConfirmButtonProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
            <Button variant={variant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
