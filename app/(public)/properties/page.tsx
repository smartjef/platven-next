import FilterForm from "@/components/FilterForm";
import ListLayoutWithSideBar from "@/components/layout/ListLayoutWithSideBar";
import { PropsWithSearchParams } from "@/types";
import React, { FC } from "react";

const PropertiesPage: FC<PropsWithSearchParams> = ({ searchParams }) => {
  return (
    <div>
      <ListLayoutWithSideBar sideBar={<FilterForm />}></ListLayoutWithSideBar>
    </div>
  );
};

export default PropertiesPage;
