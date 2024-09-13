"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  images?: string[];
}

const ImageCarousel: React.FC<Props> = ({ images = [] }) => {
  // images = [
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  //   "/media/properties/patven-1720262650598-whatsapp-image-2024-02-08-at-17.26.43-(1)-(2).jpeg",
  // ];

  return (
    <Carousel className="relative w-full max-w-screen-xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="w-full">
              <CardContent className="p-0 rounded-lg overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${image}`}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[60vh] object-contain transition-transform duration-300 ease-in-out"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <span className="sr-only">Previous</span>
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </CarouselPrevious>
      <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
        <span className="sr-only">Next</span>
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </CarouselNext>
    </Carousel>
  );
};

export default ImageCarousel;
