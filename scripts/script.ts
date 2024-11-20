import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatePropertyViews() {
  try {
    const properties = await prisma.property.findMany();

    for (const property of properties) {
      const randomViews = Math.floor(Math.random() * 101); 
      await prisma.property.update({
        where: { id: property.id },
        data: { views: randomViews },
      });
      console.log(`Updated property ${property.id} with ${randomViews} views.`);
    }

    console.log("All properties updated successfully!");
  } catch (error) {
    console.error("Error updating property views:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePropertyViews();
