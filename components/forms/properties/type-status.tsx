import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyFormSchema } from "./schema";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { PropertyType } from "@prisma/client";

type Props = {};

const formSchema = propertyFormSchema;
type UserFormValue = z.infer<typeof formSchema>;

const TypeStatusInput = (props: Props) => {
  const form = useFormContext<UserFormValue>();
  const [types, setTypes] = useState<PropertyType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/property-types");
      if (response.ok) {
        const data: PropertyType[] = await response.json();
        setTypes(data);
      }
    })();
  }, []);

  return (
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
                {types.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.title}
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
  );
};

export default TypeStatusInput;
