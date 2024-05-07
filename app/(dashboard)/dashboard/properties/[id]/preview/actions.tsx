"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Property, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropertyRejectionForm from "@/components/forms/properties/property-rejection-form";

interface Props {
  user: User;
  property: Property;
}

const PropertyPriviewAction: FC<Props> = ({ property, user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleApprove = async () => {
    const response = await fetch(`/api/properties/${property.id}/approve`, {
      method: "PUT",
    });
    if (response.ok) {
      router.refresh();
      toast({
        title: "Success!",
        description: "Property approved successfully!",
      });
    }
  };
  return (
    <div>
      {!property.isActive && (
        <Button className="w-full" onClick={handleApprove}>
          Aproove
        </Button>
      )}
      {property.isActive && (
        <Button className="w-full" onClick={() => setOpen(!open)}>
          Reject
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Property Rejection</DialogTitle>
            <DialogDescription>
              {`${property.title} Rejection `}
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <PropertyRejectionForm
            property={property}
            onSubmited={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyPriviewAction;
