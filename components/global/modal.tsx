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
  open?: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  title: string;
};
export default function Modal({ trigger, children, title }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || "Open Modal"}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
