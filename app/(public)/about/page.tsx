import React from "react";
import Image from "next/image";
import aboutRound from "@/public/about-circle.png";
import HeroSection from "@/components/hero-seaction";
import service from "@/public/service.png";
import { services } from "@/constants/data";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <div className="flex flex-col  space-y-10">
      {/* hero */}
      <HeroSection
        title="About Platven"
        subTitle="About us"
        description="Huge number of propreties availabe here for buy and sell,
also you can find here co-living property"
      />
      {/* hero */}
      {/* Main Body */}
      <div className="flex justify-center ">
        <div className="flex flex-col space-y-10 lg:max-w-[80%]">
          {/* Brief */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Image alt="" src={aboutRound} />
            <div className="flex flex-col justify-center space-y-10">
              <p className="text-4xl">
                We Provide Right Choice Of <br />
                Properties That You Need And Have <br />
                Great Opportunity To Choose From <br />
                Thousands Of Collection .
              </p>
              <div className="grid grid-cols-3 gap-4 ">
                <div>
                  <p className="text-green-700 text-4xl">20K+</p>
                  <p>Properties</p>
                </div>
                <div>
                  <p className="text-green-700 text-4xl">12 k+</p>
                  <p>Customers</p>
                </div>
                <div>
                  <p className="text-green-700 text-4xl">60+</p>
                  <p>Awards</p>
                </div>
              </div>
            </div>
          </div>
          {/* Brief */}
          {/* Steps */}
          <section className="mx-auto px-6 md:max-w-screen-xl">
            <div className="mx-auto mt-20 mb-16 block px-6 text-center">
              <h2 className="mx-auto text-4xl font-bold md:text-5xl">
                Services That We Provide.
              </h2>
              <div className="mx-auto mt-6 mb-auto block w-full text-xl font-normal leading-9 md:w-3/4 xl:w-3/4">
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem provident repellat cupiditate blanditiis! Sit
                  temporibus doloremque molestias, aut necessitatibus quisquam
                  non deleniti debitis aperiam ullam! Repudiandae, debitis iure
                  libero reiciendis ducimus temporibus!
                </p>
              </div>
            </div>
            <div className="grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ description, id, title }, index) => (
                <div
                  className="rounded-md p-8 shadow shadow-slate-300 dark:shadow-slate-800"
                  key={index}
                >
                  <div className="my-4 flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                      {/* et:beaker */}
                      <Image alt="" src={service} />
                    </div>
                    <h3 className="text-2xl font-bold md:text-xl">{title}</h3>
                  </div>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
