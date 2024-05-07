import React from "react";
import Image from "next/image";
import aboutRound from "@/public/about-circle.png";
import HeroSection from "@/components/hero-seaction";
import service from "@/public/service.png";
import { services } from "@/constants/data";
import prisma from "@/prisma/client";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";

type Props = {};

const AboutPage = async (props: Props) => {
  const agents = await prisma.team.findMany({ include: { user: true } });

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
          <section className="mx-auto px-6 md:max-w-screen-xl" id="ourservices">
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
                  className="rounded-md p-8 shadow shadow-slate-300 dark:shadow-slate-700"
                  key={index}
                >
                  <div className="my-4 flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                      {/* et:beaker */}
                      <Image alt="" src={service} />
                    </div>
                    <h3 className="text-2xl font-bold md:text-xl">{title}</h3>
                  </div>
                  <p className="text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          {/* Agents */}
          <div className="flex justify-center " id="agents">
            <h2 className="mx-auto text-4xl font-bold md:text-5xl">
              Meet Our Agents
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {agents.map(
              (
                { id, image, user: { name, email, phoneNumber }, position },
                index,
              ) => (
                <div key={index} className="text-center group mb-[30px]" >
                  <div className="relative rounded-[6px_6px_0px_0px]">
                    <a href="agent-details.html">
                      <img
                        src={`/${image}`}
                        className="w-auto h-auto block mx-auto"
                        loading="lazy"
                        width={215}
                        height={310}
                        alt="Albert S. Smith"
                      />
                    </a>
                    <ul className="flex flex-col absolute w-full top-[30px] left-0 overflow-hidden">
                      <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-300 mb-[15px]">
                        <a
                          href={`mailto:${email}`}
                          aria-label="svg"
                          className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#3B5998]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="translate-x-[0px] group-hover:translate-x-[30px] opacity-0 group-hover:opacity-100 transition-all duration-500 mb-[15px]">
                        <a
                          href={`tel:${phoneNumber}`}
                          aria-label="svg"
                          className="w-[26px] h-[26px] transition-all rounded-full bg-[#FFF6F0] flex items-center justify-center hover:drop-shadow-[0px_4px_10px_rgba(0,0,0,0.25)] text-[#494949] hover:text-[#3B5998]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#FFFDFC] z-[1] drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] rounded-[0px_0px_6px_6px] px-3 md:px-[15px] py-[20px] border-b-[6px] border-primary transition-all duration-500 before:transition-all before:duration-300 group-hover:border-secondary relative">
                    <h3>
                      <Link
                        href={"#"}
                        className="font-lora font-normal text-base text-primary group-hover:text-green-700"
                      >
                        {name}
                      </Link>
                    </h3>
                    <p className="font-normal text-[14px] leading-none capitalize mt-[5px] group-hover:text-body">
                      {position}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
          {/* Agents */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

const shapes = [
  <svg
    className="absolute text-white dark:text-neutral-700 left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
  <svg
    className="absolute text-white dark:text-neutral-700  left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
  <svg
    className="absolute text-white dark:text-neutral-700 left-0 bottom-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="currentColor"
      d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>,
];
