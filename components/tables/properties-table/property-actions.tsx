import MakePaymentForm from "@/components/forms/payment/make-payment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Property } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type Props = {
  property: Property;
};

const PropertyActions: FC<Props> = ({ property }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { push, refresh } = useRouter();
  const { user } = useSessionContext();
  const { toast } = useToast();

  const handleDelete = async () => {
    const response = await fetch(`/api/properties/${property.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      refresh();
      toast({
        title: "Success!",
        description: "Property deleted successfully!",
      });
    }
  };
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
          <DropdownMenuItem
            onClick={() => push(`/dashboard/properties/${property.id}/preview`)}
          >
            View Property
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => push(`/dashboard/properties/${property.id}`)}
          >
            Update property
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Delete Property
          </DropdownMenuItem>
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
