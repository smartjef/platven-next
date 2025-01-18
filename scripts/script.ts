import prisma from "@/prisma/client";

async function updatePropertyViews() {
  try {
    const properties = await prisma.property.findMany();

    for (const property of properties) {
      // Generate a random base value between 50 and 150
      const baseValue = Math.floor(Math.random() * 101) + 50; 

      // Add variability to the base value
      const randomVariation = Math.floor(Math.random() * 21) - 10; // Range: -10 to +10

      // Final random views value
      const randomViews = Math.max(0, baseValue + randomVariation); // Ensure non-negative views

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
