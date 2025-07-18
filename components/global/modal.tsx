import React, { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean | undefined;
  setOpen?: React.Dispatch<SetStateAction<boolean | undefined>>;
  title: string;
};
export default function Modal({
  trigger,
  children,
  title,
  open,
  setOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || "Open Modal"}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
