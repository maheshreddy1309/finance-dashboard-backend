import { Request, Response } from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getRecentActivity,
} from "../services/dashboardService";

export const getSummaryHandler = async (_req: Request, res: Response) => {
  try {
    const summary = await getSummary();
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryBreakdownHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await getCategoryBreakdown();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentActivityHandler = async (_req: Request, res: Response) => {
  try {
    const data = await getRecentActivity();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};