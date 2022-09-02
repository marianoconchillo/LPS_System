import { Router } from "express";
import { getPoliza } from "../controllers/poliza";

const router = Router();

router.get("/:id", getPoliza);

export default router;