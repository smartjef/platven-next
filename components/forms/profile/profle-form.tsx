"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import React, { FC, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userProfileSchema } from "./schema";
import useSessionContext from "@/hooks/useSessionContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/filedropzone";

type Props = {
  user?: User;
};

const formSchema = userProfileSchema;

type UserFormValue = z.infer<typeof formSchema>;

const ProfileForm: FC<Props> = ({ user }) => {
  const { setUser } = useSessionContext();
  const [image, setImage] = useState<File>();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email ?? "",
      address: user?.address ?? "",
      name: user?.name ?? "",
      phoneNumber: user?.phoneNumber ?? "",
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      });
      if (response.ok) {
        const user: User = await response.json();
        setUser(user);
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
        <div className="flex flex-col space-y-2 ">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 pt-8">
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Update Profile</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g John Doe"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="e.g abc@platven.co.ke"
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
                            placeholder="e.g 0793889658"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter you address ..."
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
            </div>
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile picture</CardTitle>
                </CardHeader>

                <CardContent>
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
            </div>
          </div>
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

export default ProfileForm;
