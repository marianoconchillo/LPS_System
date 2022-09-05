import { Router } from "express";
import { getPoliza } from "../controllers/polizas";

const router = Router();

router.get("/:numeroPoliza", getPoliza);

export default router;