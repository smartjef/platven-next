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
import { z } from "zod";
import { propertyFormSchema } from "./schema";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "use-debounce";
const Select = dynamic(() => import("react-select"), {
  ssr: false, // Prevent SSR
});

type Props = {};

const formSchema = propertyFormSchema;
type UserFormValue = z.infer<typeof formSchema>;

const PropertyLocationPicker: FC<Props> = ({}) => {
  const form = useFormContext<UserFormValue>();
  const [counties, setCounties] = useState([]);
  const [subCounties, setSubCounties] = useState([]);
  const handleSearch = useDebouncedCallback(async (value) => {
    const response = await fetch("/api/location/countries");
  }, 300);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
      <FormField
        control={form.control}
        name="county"
        render={({ field }) => (
          <FormItem>
            <FormLabel>County</FormLabel>
            <FormControl>
              <Select placeholder="Search county ..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subCounty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub county</FormLabel>
            <FormControl>
              <Select placeholder="Search sub county ..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyLocationPicker;
