import { Router } from "express";
import { deleteDaño, getDaño, postDaño, putDaño } from "../controllers/daño";

const router = Router();

router.get("/:nombre", getDaño);
router.post("/", postDaño);
router.put("/:nombre", putDaño);
router.delete("/:nombre", deleteDaño);

export default router;