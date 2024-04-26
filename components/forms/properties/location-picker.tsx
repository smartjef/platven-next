import React, { FC, useEffect, useState } from "react";
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
import { County, SubCounty } from "@prisma/client";
const Select = dynamic(() => import("react-select"), {
  ssr: false, // Prevent SSR
});

type Props = {};

const formSchema = propertyFormSchema;
type UserFormValue = z.infer<typeof formSchema>;

type CountyDetail = County & {
  _count: { subscounties: number };
  subscounties: SubCounty[];
};

const PropertyLocationPicker: FC<Props> = ({}) => {
  const form = useFormContext<UserFormValue>();
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [counties, setCounties] = useState<CountyDetail[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<CountyDetail>();
  const [selectedSubCounty, setSelectedSubCounty] = useState<SubCounty>();
  const handleSearch = useDebouncedCallback(async (value) => {
    const queryParams = new URLSearchParams({ q: value });
    setLoading(true);
    const response = await fetch(`/api/location?${queryParams.toString()}`, {
      method: "GET",
    });
    setLoading(false);
    if (response.ok) {
      const data: CountyDetail[] = await response.json();
      setCounties(data);
    }
  }, 300);

  useEffect(() => {
    if (search) handleSearch(search);
  }, [search]);

  useEffect(() => {
    form.setValue("county", selectedCounty?.name ?? "");
    form.setValue("subCounty", selectedSubCounty?.name ?? "");
  }, [selectedCounty, selectedSubCounty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
      <FormField
        control={form.control}
        name="county"
        render={({ field }) => (
          <FormItem>
            <FormLabel>County</FormLabel>
            <FormControl>
              <Select
                // isClearable
                placeholder="Search county ..."
                className="dark:text-primary-foreground"
                onInputChange={setSearch}
                isLoading={loading}
                value={{
                  label: selectedCounty?.name,
                  value: selectedCounty?.name,
                }}
                options={counties.map((county) => ({
                  label: county.name,
                  value: county.name,
                }))}
                onChange={(newValue: any, action) => {
                  setSelectedCounty(
                    counties.find((c) => c.name === newValue?.value),
                  );
                  setSelectedSubCounty(undefined);
                }}
              />
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
              <Select
                isClearable
                isLoading={loading}
                placeholder="Select sub county ..."
                className="dark:text-primary-foreground"
                isSearchable
                value={{
                  label: selectedSubCounty?.name,
                  value: selectedSubCounty?.name,
                }}
                options={(selectedCounty?.subscounties ?? []).map(
                  (subcounty) => ({
                    label: subcounty.name,
                    value: subcounty.name,
                  }),
                )}
                onChange={(newValue: any, action) => {
                  setSelectedSubCounty(
                    selectedCounty?.subscounties.find(
                      (sub) => sub.name === newValue?.value,
                    ),
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyLocationPicker;
