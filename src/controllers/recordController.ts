import { Response } from "express";
import * as recordService from "../services/recordService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createRecordHandler = async (req: AuthRequest, res: Response) => {
  try {
    const record = await recordService.createRecord({
      ...req.body,
      createdBy: req.user!.id,
    });

    res.status(201).json(record);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getRecordsHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const records = await recordService.getRecords({
      type: type as "INCOME" | "EXPENSE" | undefined,
      category: category as string | undefined,
      startDate: startDate as string | undefined,
      endDate: endDate as string | undefined,
    });

    res.json(records);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};