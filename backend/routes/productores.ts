import { Router } from "express";
import { getProductor } from "../controllers/productores";

const router = Router();

router.get("/:id", getProductor);

export default router;