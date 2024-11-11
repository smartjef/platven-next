import prisma from "@/prisma/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await prisma.property.findMany({
    where: {
      listed: true,
    },
  });

  const propertyUrls = properties.map((property) => ({
    url: `https://platven.ke/properties/${property.id}`,
    lastModified: new Date(property.updatedAt),
  }));

  return [
    {
      url: "https://platven.ke/",
      lastModified: new Date(),
    },
    {
      url: "https://platven.ke/about",
      lastModified: new Date(),
    },
    {
      url: "https://platven.ke/contact",
      lastModified: new Date(),
    },
    ...propertyUrls,
  ];
}
