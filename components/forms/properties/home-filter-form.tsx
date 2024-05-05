"use client";
import React from "react";
import { propertyFilterSchema } from "./schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TypeStatusInput from "./type-status";
import PropertyLocationPicker from "./location-picker";
import { ArrowRight } from "lucide-react";

const formSchema = propertyFilterSchema;
type UserFormValue = z.infer<typeof formSchema>;

const HomeFilterForm = () => {
  const { push } = useRouter();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      county: "",
      search: "",
      subCounty: "",
      status: "onRent",
      typeId: "",
    },
  });
  const onSubmit = async (data: UserFormValue) => {};
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <div className="flex flex-col py-2 space-y-2 ">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Search ...."
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
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Min price"
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
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Max price"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TypeStatusInput small />
            <PropertyLocationPicker small />
            <div className="row justify-start text-white">
              <Button
                disabled={form.formState.isSubmitting}
                className="ml-auto w-fit flex items-center space-x-2 bg-green-700"
                type="submit"
              >
                Find property
                <ArrowRight />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HomeFilterForm;
