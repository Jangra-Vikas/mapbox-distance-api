import { Request, Response } from "express";
import mapboxService from "./../services/mapbox.service";
import { DistanceRequestBody } from "../types";

export const calculateDistance = async (req: Request<{}, {}, DistanceRequestBody>, res: Response) => {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res
        .status(400)
        .json({ error: "origin and destination are required" });
    }

    const distanceKm = await mapboxService.getDistance(origin, destination);

    return res.json({
      origin,
      destination,
      distanceKm,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};