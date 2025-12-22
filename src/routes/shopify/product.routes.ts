import { Router } from "express";
import productController from "./../../controllers/shopify/product.controller";

const router = Router();

router.get("/sd", productController.smartDukaanProducts);
router.get("/find", productController.findByTitle);
router.get("/sync", productController.syncAllProducts);

export default router;
