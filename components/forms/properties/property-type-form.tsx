"use client";
import React, { FC, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/filedropzone";
import { objectToFormData } from "@/lib/utils";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { propertyTypeSchema } from "./schema";
import { PropertyType } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  propertyType?: PropertyType;
};

const formSchema = propertyTypeSchema;

type UserFormValue = z.infer<typeof formSchema>;

const PropertyTypeForm: FC<Props> = ({ propertyType }) => {
  const [image, setImage] = useState<File>();
  const { push } = useRouter();

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
      const response = await fetch("/api/property-types", {
        method: "POST",
        body: objectToFormData({ ...data, icon: image }),
        redirect: "follow",
      });
      if (response.ok) {
        const propertyType: PropertyType = await response.json();
        push("/dashboard/properties/types");
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <Card className="col-span-2 ">
            <CardHeader>
              <CardTitle>Type Icon</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="w-28 h-28 bg-accent rounded-full overflow-clip mb-3">
                {propertyType?.icon ? (
                  <Image
                    src={{
                      src: `/${propertyType?.icon}`,
                      width: 100,
                      height: 100,
                    }}
                    className="w-full h-full object-cover"
                    alt="profile picture"
                  />
                ) : (
                  <User2 className="w-full h-full opacity-70" />
                )}
              </div>
              <FileInput
                maxFiles={1}
                value={image ? [image] : []}
                onValueChange={(files) => {
                  if (
                    files.length > 0 &&
                    files[files.length - 1].type.includes("image")
                  )
                    setImage(files[files.length - 1]);
                  else setImage(undefined);
                }}
              />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            {/* <Separator /> */}
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Land"
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 my-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Active</FormLabel>
                      <FormDescription>
                        Make it visible and accessible by the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button
            disabled={form.formState.isSubmitting}
            className="ml-auto w-full"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyTypeForm;
