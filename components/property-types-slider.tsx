import prisma from "@/prisma/client";
import Image from "next/image";

const PropertyTypesSlider = async () => {
  const propertyTypes = await prisma.propertyType.findMany({
    include: { properties: { select: { title: true } } },
  });
  return (
    <div className="flex justify-center  w-full ">
      <div className="flex overflow-hidden group w-full">
        <div className="flex space-x-4 lg:space-x-16 animate-loop-scroll group-hover:paused w-full">
          {[...propertyTypes, ...propertyTypes].map(
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
        </div>
        {/* <div
          className="flex space-x-4 lg:space-x-16 animate-loop-scroll group-hover:paused"
          aria-hidden="true"
        >
          {[...propertyTypes, ...propertyTypes].map(
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
        </div> */}
      </div>
    </div>
  );
};

export default PropertyTypesSlider;
