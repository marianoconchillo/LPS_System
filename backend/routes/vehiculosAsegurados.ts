import { Router } from "express";
import { deleteVehiculoAsegurado, getIDTipoVehiculoByID, getVehiculoAsegurado, postVehiculoAsegurado, putVehiculoAsegurado } from "../controllers/vehiculosAsegurados";

const router = Router();

router.route("/").post(postVehiculoAsegurado)

router.route("/:patente")
    .get(getVehiculoAsegurado)
    .put(putVehiculoAsegurado)
    .delete(deleteVehiculoAsegurado);

router.route("/tipoVehiculo/:id")
    .get(getIDTipoVehiculoByID);

export default router;