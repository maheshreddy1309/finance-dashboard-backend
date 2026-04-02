import prisma from "../config/prisma";

export const createRecord = async (data: {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  description?: string;
  createdBy: number;
}) => {
  if (!data.amount || data.amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date(data.date),
      description: data.description,
      createdBy: data.createdBy,
    },
  });
};

export const getRecords = async (filters?: {
  type?: "INCOME" | "EXPENSE";
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return prisma.financialRecord.findMany({
    where: {
      ...(filters?.type ? { type: filters.type } : {}),
      ...(filters?.category ? { category: filters.category } : {}),
      ...(filters?.startDate || filters?.endDate
        ? {
            date: {
              ...(filters.startDate ? { gte: new Date(filters.startDate) } : {}),
              ...(filters.endDate ? { lte: new Date(filters.endDate) } : {}),
            },
          }
        : {}),
    },
    orderBy: {
      date: "desc",
    },
  });
};