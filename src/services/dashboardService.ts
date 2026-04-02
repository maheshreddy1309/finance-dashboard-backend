import prisma from "../config/prisma";

export const getSummary = async () => {
  const income = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" },
  });

  const expense = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" },
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpenses = expense._sum.amount || 0;

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
  };
};

export const getCategoryBreakdown = async () => {
  const grouped = await prisma.financialRecord.groupBy({
    by: ["category", "type"],
    _sum: {
      amount: true,
    },
    orderBy: {
      category: "asc",
    },
  });

  return grouped.map((item) => ({
    category: item.category,
    type: item.type,
    total: item._sum.amount || 0,
  }));
};

export const getRecentActivity = async () => {
  return prisma.financialRecord.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
};