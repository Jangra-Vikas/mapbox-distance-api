import { Router } from "express";
import { calculateAllDistances } from "../controllers/location.controller";

const router = Router();

router.get("/calculate-distances", calculateAllDistances);

export default router;
