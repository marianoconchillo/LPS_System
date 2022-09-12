import { Router } from "express";
import { deleteDaño, getDaño, postDaño, putDaño } from "../controllers/daño";

const router = Router();

router.route("/").post(postDaño);

router.route("/:nombre")
    .get(getDaño)
    .put(putDaño)
    .delete(deleteDaño);

export default router;