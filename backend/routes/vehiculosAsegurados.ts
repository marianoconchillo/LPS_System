import { Router } from "express";
import { getVehiculoAsegurado } from "../controllers/vehiculosAsegurados";

const router = Router();

router.get("/:patente", getVehiculoAsegurado);

export default router;