"use client";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { FC, useState } from "react";
import { propertyFormSchema } from "./schema";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { objectToFormData } from "@/lib/utils";
import { FileInput } from "@/components/filedropzone";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";

import PropertyLocationPicker from "./location-picker";
import TypeStatusInput from "./type-status";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  property?: Property;
};

const formSchema = propertyFormSchema;
type UserFormValue = z.infer<typeof formSchema>;

const PropertyForm: FC<Props> = ({ property }) => {
  const { push } = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property?.title ?? "",
      price: (property?.price as any) ?? "",
      county: property?.county ?? "",
      features: property?.features ?? "",
      listed: property?.listed ?? true,
      status: property?.status ?? "onRent",
      subCounty: property?.subCounty ?? "",
      typeId: property?.typeId ?? "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (data: UserFormValue) => {
    try {
      let response;
      if (property)
        response = await fetch(`/api/properties/${property.id}`, {
          method: "PUT",
          body: objectToFormData({ ...data, images }),
          redirect: "follow",
        });
      else
        response = await fetch("/api/properties", {
          method: "POST",
          body: objectToFormData({ ...data, images }),
          redirect: "follow",
        });
      if (response.ok) {
        const property: Property = await response.json();
        push("/dashboard/properties");
        toast({
          variant: "default",
          title: "Success!.",
          description: `Property ${
            property ? "updated" : "created"
          } successfully!.`,
        });
      } else {
        if (response.status === 400) {
          const errors = await response.json();
          for (const key in errors) {
            const errorMessage = (errors[key]._errors as string[]).join(",");
            if (key === "image")
              toast({
                variant: "destructive",
                title: "Success!.",
                description: errorMessage,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <div className="flex flex-col space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Plativen apartments"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g 4000"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TypeStatusInput />

              <PropertyLocationPicker />

              <FormField
                control={form.control}
                name="listed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 my-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Publish Listing</FormLabel>
                      <FormDescription>
                        Make it visible and accessible by the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter features ...."
                        rows={8}
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Property images</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {property?.images.map((image, index) => (
                  <div className="w-28 h-28 bg-accent rounded-full overflow-clip mb-3">
                    <Image
                      src={{
                        src: `/${image}`,
                        width: 100,
                        height: 100,
                      }}
                      className="w-full h-full object-cover"
                      alt="profile picture"
                    />
                  </div>
                ))}
              </div>
              <FileInput
                maxFiles={6}
                value={images}
                onValueChange={(files) => {
                  if (files.length <= 6)
                    setImages(
                      files.filter((file) => file.type.includes("image")),
                    );
                }}
              />
            </CardContent>
          </Card>
          <Button
            disabled={form.formState.isSubmitting}
            className="ml-auto w-full"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
