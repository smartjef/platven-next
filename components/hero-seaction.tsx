import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import hero from "@/public/r-architecture-2gDwlIim3Uw-unsplash.jpg";

interface Props {
  bgImage?: StaticImageData;
  title: string;
  subTitle: string;
  description?: string;
}

const HeroSection: FC<Props> = ({ bgImage, title, subTitle, description }) => {
  return (
    <div className="w-full h-[50vh] relative">
      <Image
        alt=""
        src={bgImage ?? hero}
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute w-full h-full opacity-50 bg-black" />
      <div className="absolute w-full h-full flex flex-col justify-center  items-center text-white space-y-8 p-10">
        <p>{subTitle}</p>
        <h1 className="font-bold text-4xl">{title}</h1>
        {description && <p className="text-center text-xl">{description}</p>}
      </div>
    </div>
  );
};

export default HeroSection;
