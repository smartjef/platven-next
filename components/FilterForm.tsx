"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false, // Prevent SSR
});
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false, // Prevent SSR
});

const FilterForm = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const handleSearch = useDebouncedCallback((key, value) => {
    const queryParams = new URLSearchParams(searchParams);
    if (value) {
      queryParams.set(key, value);
    } else {
      queryParams.delete(key);
    }
    replace(`${pathName}?${queryParams.toString()}`);
  }, 300);

  const amenitiesParams = searchParams.get("amenities")?.split(",") ?? [];

  return (
    <div className="w-full border rounded-lg shadow">
      {/* Header */}
      <div className="p-2 ">
        <div className="w-full flex justify-between items-center mb-2 ">
          <span className="font-bold">Filters</span>
          <Button variant={"link"} onClick={() => replace(pathName)}>
            Clear all
          </Button>
        </div>
        {/* seach */}
        <Input
          name="search"
          placeholder="Seach ..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={({ target: { value, name } }) => handleSearch(name, value)}
        />
        <div className="w-full my-4">
          <ReactSelect
            className="dark:text-primary-foreground"
            placeholder="Type tags..."
            defaultValue={(searchParams.get("tags")?.split(",") ?? []).map(
              (val) => ({
                label: val,
                value: val,
              }),
            )}
            options={[].map(({ id, label }) => ({
              label,
              value: id,
            }))}
            onChange={(newValues: any) =>
              handleSearch(
                "tags",
                newValues.map((val: any) => val.value).join(","),
              )
            }
            //   inputValue={search}
            //   onInputChange={(value) => setSearch(value)}
            //   value={{ label: selected?.display, value: selected?.display }}

            isMulti={true}
            //   isLoading={loading}
            //   options={places.map((place) => ({
            //     value: place.display,
            //     label: place.display,
            //   }))}
          />
        </div>
        <div className="w-full my-4">
          <Select
            name="status"
            defaultValue={searchParams.get("status") ?? ""}
            onValueChange={(value) => handleSearch("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Property status</SelectLabel>
                {[].map(({ id, label }, index) => (
                  <SelectItem key={index} value={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mt-4" />
      {/* price */}
      <div className="p-2">
        <span className="uppercase opacity-30">Price</span>
        <div className="w-full grid grid-cols-2 gap-2">
          <Input
            name="minPrice"
            type="number"
            defaultValue={searchParams.get("minPrice") ?? ""}
            onChange={({ target: { value, name } }) =>
              handleSearch(name, value)
            }
          />
          <Input
            type="number"
            name="maxPrice"
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onChange={({ target: { value, name } }) =>
              handleSearch(name, value)
            }
          />
        </div>
      </div>
      <Separator className="mt-4" />

      {/* Categories */}
      {/* <div className="p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline p-0 m-0">
              <span className="uppercase opacity-30">Type</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {propertyTypes.map(({ id, label }, index) => (
                  <li key={index} className="items-center space-x-2">
                    <Checkbox />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator className="" /> */}

      {/* Categories */}
      <div className="p-2 ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline p-0 m-0">
              <span className="uppercase opacity-30">Amenities</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {[].map(({ id, label }, index) => {
                  const checked = amenitiesParams?.includes(id);
                  return (
                    <li key={index} className="items-center space-x-2">
                      <Checkbox
                        checked={checked}
                        onClick={() => {
                          // If checked uncheck
                          if (checked)
                            handleSearch(
                              "amenities",
                              amenitiesParams
                                ?.filter((ame) => ame !== id)
                                .join(","),
                            );
                          else
                            handleSearch(
                              "amenities",
                              [...amenitiesParams, id].join(","),
                            );
                        }}
                      />
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterForm;
