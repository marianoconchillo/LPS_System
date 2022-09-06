import { Router } from "express";
import { deletePoliza, getPoliza, postPoliza, putPoliza } from "../controllers/polizas";

const router = Router();

router.get("/:numeroPoliza", getPoliza);
router.post("/", postPoliza);
router.put("/:numeroPoliza", putPoliza);
router.delete("/:numeroPoliza", deletePoliza);

export default router;