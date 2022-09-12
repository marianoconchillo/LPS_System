import { Router } from "express";
import { deleteVehiculoAsegurado, getVehiculoAsegurado, postVehiculoAsegurado, putVehiculoAsegurado } from "../controllers/vehiculosAsegurados";

const router = Router();

router.route("/").post(postVehiculoAsegurado)

router.route("/:patente")
    .get(getVehiculoAsegurado)
    .put(putVehiculoAsegurado)
    .delete(deleteVehiculoAsegurado);

export default router;