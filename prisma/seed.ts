import { prisma } from "../src/server/db";

async function main() {
  await prisma.measureField.createMany({
    data: [
      {
        name: "calf",
        displayName: "Łydka",
      },
      {
        name: "thigh",
        displayName: "Udo",
      },
      {
        name: "neck",
        displayName: "Kark",
      },
      {
        name: "chest",
        displayName: "Klatka piersiowa",
      },
      {
        name: "waist",
        displayName: "Pas",
      },
      {
        name: "biceps",
        displayName: "Biceps",
      },
      {
        name: "forearm",
        displayName: "Przedramię",
      },
      {
        name: "hips",
        displayName: "Biodra",
      },
      {
        name: "wrist",
        displayName: "Nadgarstek",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
