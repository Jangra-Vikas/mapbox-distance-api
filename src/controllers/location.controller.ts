import { Request, Response } from "express";
import travelService from "../services/travelDistance.service";

export const calculateAllDistances = async (req: Request, res: Response) => {
    const selectedDate = req.query.date as string || new Date().toISOString().slice(0, 10);
  try {
    const result = await travelService.calculateSequentialDistances(selectedDate);
    res.json({
      updated_rows: result.length,
      details: result,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
