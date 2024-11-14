import CustomProperyRequestForm from "@/components/CustomProperyRequestForm";
import PropertyRequestForm from "@/components/forms/properties/property-request";
import ImageDisplay from "@/components/ImageDisplay";
import ListLayoutWithSideBar from "@/components/layout/ListLayoutWithSideBar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ShareProperty from "@/components/ShareProperty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth-utils";
import { formartCurrency, serializeMarkdown } from "@/lib/utils";
import prisma from "@/prisma/client";
import { PropsWithPathParams } from "@/types";
import { Bookmark, Calendar, Heart } from "lucide-react";
import moment from "moment/moment";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

const incrementPropertyView = async (id: string) => {
  return await prisma.property.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};

const getPropertyWithoutIncrement = async (id: string) => {
  return await prisma.property.findUnique({
    where: {
      id,
      listed: true,
      isActive: true,
      payment: { complete: true },
    },
    include: {
      type: true,
    },
  });
};
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> => {
  const property = await incrementPropertyView(params.id);
  if (!property) return;

  return {
    title: property.title,
    description: property.features,
    openGraph: {
      title: `${property.title} | Platven LTD - Real Estate Platform`,
      description: `${
        property.features ?? ""
      }. Visit https://platven.ke to browse the best property.`,
      url: `https://platven.ke/properties/${params.id}`,
      siteName: "Platven LTD",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: `https://platven.ke/${property.images[0]}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const PropertyDetailPage: FC<PropsWithPathParams> = async ({
  params: { id },
}) => {
  const property = await getPropertyWithoutIncrement(id);
  if (!property) return notFound();

  const relatedProperties = await prisma.property.findMany({
    include: { type: true },
    take: 8,
    orderBy: { updatedAt: "desc" },
  });
  const user = await getSessionUser();

  const propertyUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/properties/${property.id}`;
  const serializedContent = await serializeMarkdown(property.features ?? "");

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row gap-5 m-4">
          <div className="w-full lg:w-3/4">
            <ImageDisplay images={property.images} />
          </div>
          <div className="w-full hidden lg:block md:w-1/4 mt-5 md:mt-0">
            <CustomProperyRequestForm />
          </div>
        </div>

        <ListLayoutWithSideBar
          sideBar={
            <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-700 rounded-md space-y-4 hidden lg:block">
              <h1 className="font-bold text-xl">Request Property</h1>
              <PropertyRequestForm
                property={property as any}
                user={user as any}
              />
            </div>
          }
          reverse
        >
          <div className="flex flex-col space-y-2">
            <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-700 rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold text-xl">{property.title}</p>
                <div className="flex space-x-2 items-center">
                  <Button size={"icon"}>
                    <Bookmark />
                  </Button>
                  <Button size={"icon"}>
                    <Heart />
                  </Button>
                  <Button>
                    <ShareProperty
                      propertyUrl={propertyUrl}
                      title="View this property on platven.ke"
                    />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-4">
                <Badge className="bg-green-700">
                  {property.status === "onRent" ? "On rent" : "On sale"}
                </Badge>
                <Badge className="bg-green-700">{property.type.title}</Badge>
              </div>
              <div className="opacity-50 flex space-x-3 items-center text-lg">
                <Calendar />
                {moment(property.createdAt).fromNow()}
              </div>
              <p className="font-bold text-xl">
                {formartCurrency(Number(property.price))}
              </p>
            </div>
            <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-700 rounded-md space-y-4">
              <p className="font-bold text-xl">Property detail</p>
              <div className="space-y-3 ">
                <div className="grid grid-cols-2">
                  <span>County</span>
                  <span>{property.county}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Subcounty</span>
                  <span>{property.subCounty}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Landmark</span>
                  <span>{property.landMark}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Nature of road access</span>
                  <span>{property.roadAccessNature}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Size</span>
                  <span>{property.size}</span>
                </div>
              </div>
              <div className="bg-accent p-2">
                <MarkdownRenderer serializedContent={serializedContent} />
              </div>
            </div>
            <div className="p-4 shadow shadow-slate-300 dark:shadow-slate-700 rounded-md space-y-4 block lg:hidden">
              <h1 className="font-bold text-xl">Request Property</h1>
              <PropertyRequestForm
                property={property as any}
                user={user as any}
              />
            </div>
            <div className="w-full lg:hidden mt-5">
              <CustomProperyRequestForm />
            </div>
            <div className="p-4 space-y-4">
              <p className="font-bold text-xl">Related properties</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProperties.map(
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
                      className="flex flex-col h-full border rounded-lg shadow relative bg-white dark:bg-gray-800"
                    >
                      <Badge className="absolute top-2 left-2 z-10 bg-green-700">
                        {status === "onRent" ? "On rent" : "On sale"}
                      </Badge>

                      {/* Image container with fixed aspect ratio */}
                      <div className="aspect-[4/3] relative">
                        <Link href={`/properties/${id}`}>
                          <img
                            className="rounded-t-lg object-cover w-full h-full"
                            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${images[0]}`}
                            alt={title}
                          />
                        </Link>
                      </div>

                      {/* Content container */}
                      <div className="flex flex-col flex-grow p-5">
                        {/* Title */}
                        <Link href={`/properties/${id}`}>
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem]">
                            {title}
                          </h5>
                        </Link>

                        {/* Location */}
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {`${county} ${subCounty}`}
                        </div>

                        {/* Property type */}
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {type}
                        </div>

                        {/* Price and button - pushed to bottom */}
                        <div className="mt-auto pt-4 space-y-3">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {formartCurrency(Number(price))}
                          </div>

                          <Link
                            href={`/properties/${id}`}
                            className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-colors"
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
        </ListLayoutWithSideBar>
      </div>
    </>
  );
};

export default PropertyDetailPage;
