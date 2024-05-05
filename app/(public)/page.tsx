import PropertyTypesSlider from "@/components/property-types-slider";
import React from "react";
import Image from "next/image";
import bg from "@/public/r-architecture-2gDwlIim3Uw-unsplash.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import img from "@/public/building.png";
import HomeFilterForm from "@/components/forms/properties/home-filter-form";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="overflow-y-auto">
      <PropertyTypesSlider />
      <div className="flex flex-col lg:flex-row lg:space-x-4 max-lg:space-y-2 justify-center">
        <div className="bg-black h-9/12 w-6/12 rounded-md relative overflow-clip">
          <Image
            src={bg}
            alt="bg"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute bg-black opacity-50 w-full h-full" />
          <div className="absolute w-full h-full flex flex-col p-10 text-white font-bold space-y-2">
            <p>This Week Only for World Premier</p>
            <p className="text-4xl">
              New Top Product
              <br />
              High Quality
            </p>
            <Button className="flex items-center w-fit space-x-2 bg-green-700">
              Shope now <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="bg-accent dark:bg-gray-900 rounded-md p-2 flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Image src={img} alt="building" className="w-16 h-16" />
            <div className="flex flex-col justify-center space-y-2">
              <p>Over 1000 properties</p>
              <p className="font-bold text-lg">Find property</p>
            </div>
          </div>
          <HomeFilterForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
