import React, { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import MakePaymentForm from "@/components/forms/payment/make-payment-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property } from "@prisma/client";

type Props = {
  property: Property;
};

const PropertyActions: FC<Props> = ({ property }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {((property as any).payment?.complete === false ||
            !(property as any).payment) && (
            <DropdownMenuItem onClick={() => setShowPrompt(!showPrompt)}>
              Pay to list
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Property</DropdownMenuItem>
          <DropdownMenuItem>Update property</DropdownMenuItem>
          <DropdownMenuItem>Delete Property</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{`${property.title}`}</DialogTitle>
            <DialogDescription>Mpesa payment options</DialogDescription>
          </DialogHeader>
          <MakePaymentForm property={property} setOpen={setShowPrompt} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyActions;
