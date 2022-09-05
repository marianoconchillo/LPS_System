import { Router } from "express";
import { getProductor } from "../controllers/productores";

const router = Router();

router.get("/:numeroProductor", getProductor);

export default router;