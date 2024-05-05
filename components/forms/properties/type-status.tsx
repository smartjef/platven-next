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
import { useFormContext } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { PropertyType } from "@prisma/client";
import clsx from "clsx";

type Props = {
  small?: boolean;
};

type UserFormValue = {
  typeId: string;
  status: string;
};

const TypeStatusInput: FC<Props> = ({ small = false }) => {
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
    <div
      className={clsx({
        "grid grid-cols-1 lg:grid-cols-2 lg:gap-3": !small,
        "flex flex-col space-y-2": small,
      })}
    >
      <FormField
        control={form.control}
        name="typeId"
        render={({ field }) => (
          <FormItem>
            {!small && <FormLabel>Property Type</FormLabel>}
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
                    placeholder="Select type"
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
            {!small && <FormLabel>Property Status</FormLabel>}
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
                    placeholder="Select status"
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
