"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useSessionContext from "@/hooks/useSessionContext";
import { Property, PropertyRequest } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { FC } from "react";

interface Props {
  message: PropertyRequest & { property: Property };
}
const PropertyRequestAction: FC<Props> = ({ message }) => {
  const { user } = useSessionContext();
  const router = useRouter();
  const { toast } = useToast();
  const handleToggle = async () => {
    const response = await fetch(`/api/property-request/${message.id}`, {
      method: "PUT",
      body: JSON.stringify({
        propertyId: message.propertyId,
        email: message.email,
        phoneNumber: message.phoneNumber,
        message: message.message,
        name: message.name,
        isActive: !message.isActive,
      }),
    });
    if (response.ok) {
      router.refresh();
      toast({
        title: "Success!",
        description: "Message addresed status updated successfully!",
      });
    }
  };
  const handleDelete = async () => {
    const response = await fetch(`/api/property-request/${message.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
      toast({
        title: "Success!",
        description: "Property deleted successfully!",
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            window.open(
              `mailto:${message.email}?subject=Request For property ${message.property.title}}`,
              "popup",
            )
          }
        >
          Reply
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggle}>
          {message.isActive ? "Mark Un addressed" : "Mark as Addressed"}
        </DropdownMenuItem>
        {(user?.isStaff || user?.isSuperUser) && (
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertyRequestAction;
