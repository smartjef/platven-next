import PropertyTypesSlider from "@/components/property-types-slider";
import React from "react";
import Image from "next/image";
import bg from "@/public/title-long.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import img from "@/public/building.png";
import HomeFilterForm from "@/components/forms/properties/home-filter-form";
import prisma from "@/prisma/client";
import Link from "next/link";
import { formartCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import aboutImage from "@/public/about.png";

import clsx from "clsx";
import Patners from "@/components/patners";
import { steps, whyUs } from "@/constants/data";
import { Icons } from "@/components/icons";

type Props = {};

const HomePage = async (props: Props) => {
  const properties = await prisma.property.findMany({
    include: { type: true },
  });
  return (
    <div className="flex justify-center">
      <div className="p-3 flex flex-col space-y-10 items-center lg:max-w-[80%]">
        <PropertyTypesSlider />
        {/* Banner */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-4 bg-black rounded-md relative overflow-clip max-lg:h-96">
            <Image
              src={bg}
              alt="bg"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute bg-black opacity-50 w-full h-full" />
            <div className="absolute w-full h-full flex flex-col p-10 text-white font-bold justify-center space-y-10">
              <p>This Week Only for World Premier</p>
              <p className="text-4xl">
                New Top Product
                <br />
                High Quality
              </p>
              <Button className=" w-fit space-x-2 bg-green-700">
                <Link
                  href={"/properties"}
                  className="flex items-center space-x-2"
                >
                  Find Now <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-accent dark:bg-gray-900 rounded-md p-2 flex flex-col space-y-2">
            <div className="flex space-x-2">
              <div className="flex flex-col justify-center space-y-2">
                <p>Over 1000 properties</p>
                <p className="font-bold text-lg">Find property</p>
              </div>
            </div>
            <HomeFilterForm />
          </div>
        </div>
        {/* Banner */}
        {/* How it works */}
        <div className="my-10">
          <h1 className="font-bold text-3xl">How it works</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center">
          {steps.map(({ description, title, icon }, index) => {
            const Icon = (Icons as any)[icon];
            return (
              <div
                className="flex flex-col space-y-6 items-center max-w-[320px]"
                key={index}
              >
                <div className="bg-green-700 w-28 h-28 rounded-full bg-opacity-10 text-green-700 flex flex-col justify-center items-center">
                  <Icon className="w-8 h-8" />
                </div>
                <h1 className="font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
              </div>
            );
          })}
        </div>
        {/* How it works */}
        {/* Why us */}
        <div>
          <h1 className="font-bold text-3xl">Why Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 py-10">
          <div className="flex flex-col justify-between">
            <p className={clsx("text-2xl")}>
              We Provide Latest Properties For Our Valuable Clients.
            </p>
            <Image src={aboutImage} alt="about" />
          </div>
          <div className="grid grid-cols-1 max-w-[400px]  gap-10">
            <p>
              At Platven, we prioritize offering properties that fit your budget
              while presenting excellent opportunities. It's our main
              responsibility to ensure that our clients receive the best value
              and discover properties that align with their goals.
            </p>
            {whyUs.map(({ title, icon, description }, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <Image src={icon} alt="search property" className="w-24 h-24" />
                <div className="flex flex-col space-y-2 justify-center">
                  <h1 className="text-xl font-bold">{title}</h1>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Why us */}
        {/* Popular Properties */}
        <div className="my-10">
          <h1 className="font-bold text-3xl">Popular Properties</h1>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
          {[...properties, ...properties, ...properties, ...properties]
            .map(
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
            )
            .slice(0, 12)}
        </div>
        {/* Popular properties */}
        {/* Call to action */}

        <section className="mx-auto py-16">
          <div className="mx-auto flex w-full flex-col items-center justify-center sm:max-w-screen-sm md:max-w-screen-md lg:flex-row">
            <div className="text-center">
              <h2 className="bg-clip-text text-3xl font-extrabold text-gray-700 sm:text-5xl">
                Get in touch
              </h2>
              <p className="bg-gradient-to-r from-green-500 to-slate-950 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
                {`Let's take your business to the moon`}
              </p>
              <Link
                href="/contact"
                className="shadow-green-600/30 mt-10 inline-flex h-12 items-center rounded-full bg-green-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-slate-600 hover:shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Call to action */}
        {/* <div className="w-[90vw]">
          <Patners />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
