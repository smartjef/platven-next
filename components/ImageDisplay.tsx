"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: string[];
}

const ImageDisplay: React.FC<Props> = ({ images = [] }) => {
  const [currentImage, setCurrentIage] = useState<string>(images[0]);
  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Carousel */}
      {/* <Image
        src={{
          src: currentImage ? `/${currentImage}` : "/",
          width: 800,
          height: 500,
        }}
        alt={""}
        className="bg-indigo-800  object-cover h-[80%] w-full"
      /> */}
      <img
        src="/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg"
        // src={
        //   currentImage
        //     ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${currentImage}`
        //     : "/"
        // }
        alt={""}
        className="bg-gray-50 object-contain h-80 md:h-96 lg:h-[450px] w-full"
      />
      {/* Thumbnailes */}
      <div className="flex grow overflow-x-auto justify-center space-x-2 my-2">
        {images.length > 0 ? (
          images.map((image, index) => (
            // <Image
            //   key={index}
            //   src={{
            //     src: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${image}`,
            //     width: 800,
            //     height: 500,
            //   }}
            //   alt={""}
            //   className="bg-indigo-800 object-cover w-100 h-100 hover:opacity-50 hover:cursor-pointer"
            //   onClick={() => setCurrentIage(image)}
            // />
            <>
              <div className="overflow-hidden">
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${image}`}
                  alt={""}
                  className="bg-gray-50 object-fit w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40 hover:opacity-50 hover:cursor-pointer overflow-hidden"
                  onClick={() => setCurrentIage(image)}
                />
              </div>
            </>
          ))
        ) : (
          <img
            src={`https://via.placeholder.com/1200x400?text=Thumnail`}
            alt={""}
            className="bg-indigo-800 object-cover w-100 h-100 hover:opacity-50 hover:cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
