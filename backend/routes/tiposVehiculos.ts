import { Router } from "express";
import { deleteTipoVehiculo, getTipoVehiculo, postTipoVehiculo, putTipoVehiculo } from "../controllers/tiposVehiculos";

const router = Router();

router.route("/").post(postTipoVehiculo);

router.route("/:marca/:modelo/:version/:anio")
    .get(getTipoVehiculo)
    .put(putTipoVehiculo)
    .delete(deleteTipoVehiculo);

export default router;