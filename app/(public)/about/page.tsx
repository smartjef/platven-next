import React from "react";
import hero from "@/public/r-architecture-2gDwlIim3Uw-unsplash.jpg";
import Image from "next/image";
import aboutRound from "@/public/about-circle.png";
import HeroSection from "@/components/hero-seaction";

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
          <section className="mx-auto px-6 text-gray-800 md:max-w-screen-xl">
            <div className="mx-auto mt-20 mb-16 block px-6 text-center">
              <h2 className="mx-auto text-4xl font-bold md:text-5xl">
                The Future is Here.
              </h2>
              <div className="mx-auto mt-6 mb-auto block w-full text-xl font-normal leading-9 text-gray-700 md:w-3/4 xl:w-3/4">
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem provident repellat cupiditate blanditiis! Sit
                  temporibus doloremque molestias, aut necessitatibus quisquam
                  non deleniti debitis aperiam ullam! Repudiandae, debitis iure
                  libero reiciendis ducimus temporibus!
                </p>
              </div>
              <div className="mt-8 text-center">
                <a
                  className="mx-2 mb-2 inline-block rounded bg-blue-500 px-6 py-2 text-xl font-medium text-white shadow md:mx-4 md:mt-2 md:text-lg hover:scale-105 hover:shadow-md"
                  href="#"
                  target="_blank"
                >
                  Get Started
                </a>
                <a
                  className="mx-2 mb-2 inline-block rounded bg-gray-900 px-6 py-2 text-xl font-medium text-white shadow md:mx-4 md:mt-2 md:text-lg hover:scale-105 hover:shadow-md"
                  href="#"
                >
                  Book a Demo
                </a>
              </div>
            </div>
            <div className="grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Enhanced</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Performant</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Analytical</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Enhanced</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Performant</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
                <div className="my-4 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-blue-50 text-2xl text-blue-500">
                    {/* et:beaker */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.85em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 27 32"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 1a.5.5 0 0 0 0-1h-9a.5.5 0 0 0 0 1h9zM.99 27.635c-1.074 1.511-.954 2.498-.664 3.06C.633 31.29 1.433 32 3.5 32h20c2.067 0 2.867-.71 3.174-1.306c.29-.562.41-1.549-.648-3.034l-6.219-9.95l-.088-.124C19.272 16.948 17 13.022 17 9.75V2.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v7.25c0 3.491-2.465 7.957-2.493 8.005L.99 27.635zm24.796 2.6c-.251.487-1.084.765-2.286.765h-20c-1.202 0-2.035-.278-2.286-.765c-.229-.444-.02-1.162.62-2.066l4.999-8.948l.007.004c.91.525 1.851 1.068 3.719 1.068s2.81-.542 3.719-1.066c.833-.48 1.619-.934 3.22-.934c.607 0 1.133.075 1.617.21l6.08 9.712c.611.858.82 1.576.591 2.02zM10 9.75V3h6v6.75c0 2.84 1.516 6.042 2.404 7.602a7.862 7.862 0 0 0-.905-.059c-1.869 0-2.81.542-3.719 1.066c-.833.48-1.619.934-3.22.934c-1.601 0-2.387-.454-3.219-.934l-.019-.011l.046-.082C7.393 18.226 10 13.58 10 9.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold md:text-xl">Analytical</h3>
                </div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, repellendus.
                </p>
              </div>
            </div>
          </section>

          {/* Steps */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
