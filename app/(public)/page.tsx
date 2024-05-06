import PropertyTypesSlider from "@/components/property-types-slider";
import React from "react";
import Image from "next/image";
import bg from "@/public/r-architecture-2gDwlIim3Uw-unsplash.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import img from "@/public/building.png";
import HomeFilterForm from "@/components/forms/properties/home-filter-form";
import prisma from "@/prisma/client";
import Link from "next/link";
import { formartCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {};

const HomePage = async (props: Props) => {
  const properties = await prisma.property.findMany({
    include: { type: true },
  });
  return (
    <div className="flex justify-center">
      <div className="p-3 flex flex-col space-y-10 items-center lg:max-w-[80%]">
        <PropertyTypesSlider />
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-4 bg-black rounded-md relative overflow-clip max-lg:h-96">
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

        <div className="my-10">
          <h1 className="font-bold text-3xl">Popular Properties</h1>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
          {[...properties, ...properties, ...properties].map(
            (
              {
                id,
                title,
                images,
                price,
                county,
                subCounty,
                type: { title: type },
                status,
              },
              index,
            ) => (
              <div
                key={index}
                className="w-full border  rounded-lg shadow relative"
              >
                <Badge className="absolute top-2 left-2 bg-green-700">
                  {status === "onRent" ? "On rent" : "On sales"}
                </Badge>
                <Link href={`/properties/${id}`}>
                  <Image
                    className="rounded-t-lg"
                    src={{ src: `/${images[0]}`, height: 500, width: 800 }}
                    alt="product image"
                  />
                </Link>
                <div className="px-5 pb-5">
                  <Link href={`/properties/${id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {`${title}`}
                    </h5>
                  </Link>
                  <div className="flex flex-col justify-center mt-2.5 mb-5">
                    {`${county} ${subCounty}`}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formartCurrency(Number(price))}
                    </span>
                    <Link
                      href={`/properties/${id}`}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
