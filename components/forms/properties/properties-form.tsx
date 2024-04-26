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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyLocationPicker from "./location-picker";

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
      const response = await fetch("/api/profile", {
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
            form.setError(key as any, {
              message: (errors[key]._errors as string[]).join(","),
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

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        // disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a country"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {[{ name: "Home", id: "1" }].map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Status</FormLabel>
                      <Select
                        // disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a city"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {[
                            { name: "On Rent", id: "onRent" },
                            { name: "On Sale", id: "onSale" },
                          ].map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

             <PropertyLocationPicker/>

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
                onValueChange={setImages}
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
