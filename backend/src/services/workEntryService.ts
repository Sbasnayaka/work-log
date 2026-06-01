import { prisma } from '../db';

export const getAllEntries = async (from?: string, to?: string, sort: 'asc' | 'desc' = 'desc') => {
  const where: any = {};
  if (from || to) {
    where.date = {};
    if (from) where.date.gte = new Date(from);
    if (to) where.date.lte = new Date(to);
  }
  return prisma.workEntry.findMany({
    where,
    orderBy: { date: sort },
  });
};

export const createEntry = async (data: {
  date: Date;
  workType: string;
  volume: number;
  unit: string;
  performer: string;
}) => {
  return prisma.workEntry.create({ data });
};

export const deleteEntry = async (id: number) => {
  return prisma.workEntry.delete({ where: { id } });
};

export const updateEntry = async (
  id: number,
  data: Partial<{
    date: Date;
    workType: string;
    volume: number;
    unit: string;
    performer: string;
  }>
) => {
  return prisma.workEntry.update({ where: { id }, data });
};