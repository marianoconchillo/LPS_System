import { Router } from "express";
import { deleteVehiculoAsegurado, getVehiculoAsegurado, postVehiculoAsegurado, putVehiculoAsegurado } from "../controllers/vehiculosAsegurados";

const router = Router();

router.get("/:patente", getVehiculoAsegurado);
router.post("/", postVehiculoAsegurado);
router.put("/:patente", putVehiculoAsegurado);
router.delete("/:patente", deleteVehiculoAsegurado);

export default router;