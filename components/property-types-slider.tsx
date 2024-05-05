import prisma from "@/prisma/client";
import Image from "next/image";
import React from "react";

const PropertyTypesSlider = async () => {
  const propertyTypes = await prisma.propertyType.findMany({
    include: { properties: { select: { title: true } } },
  });
  return (
    <div
      className={`grid grid-cols-${
        propertyTypes.length + 4
      } gap-2 `}
    >
      <div />
      <div />
      {propertyTypes.map(
        ({ createdAt, icon, id, title, properties }, index) => (
          <div key={index} className="flex space-x-2">
            <Image
              src={{ src: `/${icon}`, width: 100, height: 100 }}
              alt={title}
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-bold">{title}</h1>
              <p>{`${properties.length} properties`}</p>
            </div>
          </div>
        ),
      )}
      <div />
      <div />
    </div>
  );
};

export default PropertyTypesSlider;
