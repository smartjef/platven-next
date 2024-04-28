"use client";
import { Heading } from "@/components/ui/heading";
import React, { FC } from "react";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash, User2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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
import { staffFormSchema } from "./schema";
import { Team, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { objectToFormData } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { FileInput } from "@/components/filedropzone";
import Image from "next/image";

const formSchema = staffFormSchema;

type ProductFormValues = z.infer<typeof formSchema>;

interface Props {
  user?: User & { team?: Team };
}

const StaffForm: FC<Props> = ({ user }) => {
  const [image, setImage] = useState<File>();
  const { refresh } = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: user?.address ?? "",
      email: user?.email ?? "",
      name: user?.name ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      position: user?.team?.position ?? "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: objectToFormData({ ...data, image }),
        redirect: "follow",
      });
      if (response.ok) {
        const user: User = await response.json();
        refresh();
        setImage(undefined);
        toast({
          variant: "default",
          title: "Success!.",
          description: "Profile updated successfully!.",
        });
      } else {
        if (response.status === 400) {
          const errors = await response.json();

          for (const key in errors) {
            const errorMessage = (errors[key]._errors as string[]).join(",");
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
    <>
      <div className="flex items-center justify-between">
        <Heading title={"Add Staff"} description={"description"} />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="w-28 h-28 bg-accent rounded-full overflow-clip mb-3">
            {user?.image ? (
              <Image
                src={{
                  src: `/${user?.image}`,
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Staff name ...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isStaff"
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
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Staff address ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
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
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting}
            className="ml-auto "
            type="submit"
          >
            {"Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default StaffForm;
