import { prisma } from '../db';

export const getAllWorkTypes = async () => {
  return prisma.workType.findMany();
};

export const seedWorkTypes = async () => {
  const defaults = ['Partition masonry', 'Formwork installation', 'Concrete pouring', 'Rebar tying', 'Plastering of walls'];
  for (const name of defaults) {
    await prisma.workType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
};