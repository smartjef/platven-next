"use client";
import { FileInput } from "@/components/filedropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { objectToFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyType } from "@prisma/client";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { propertyTypeSchema } from "./schema";

type Props = {
  propertyType?: PropertyType;
};

const formSchema = propertyTypeSchema;

type UserFormValue = z.infer<typeof formSchema>;

const PropertyTypeForm: FC<Props> = ({ propertyType }) => {
  const [image, setImage] = useState<File>();
  const { replace } = useRouter();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: propertyType?.title ?? "",
      isActive: propertyType?.isActive ?? true,
    },
  });
  const { toast } = useToast();

  const onSubmit = async (data: UserFormValue) => {
    try {
      let response;
      if (propertyType)
        response = await fetch(`/api/property-types/${propertyType.id}`, {
          method: "PUT",
          body: objectToFormData({ ...data, icon: image }),
          redirect: "follow",
        });
      else
        response = await fetch("/api/property-types", {
          method: "POST",
          body: objectToFormData({ ...data, icon: image }),
          redirect: "follow",
        });
      if (response.ok) {
        const propertyType: PropertyType = await response.json();
        replace("/dashboard/properties/types");
        toast({
          variant: "default",
          title: "Success!.",
          description: `Property type ${
            propertyType ? "updated" : "created"
          } successfully!.`,
        });
      } else {
        if (response.status === 400) {
          const errors = await response.json();
          for (const key in errors) {
            const errorMessage = (errors[key]._errors as string[]).join(",");
            if (key === "icon")
              toast({
                variant: "destructive",
                title: "Failure!.",
                description: `${errorMessage}`,
              });
            form.setError(key as any, {
              message: errorMessage,
            });
          }
        }
        console.log();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    
  );
};

export default PropertyTypeForm;
