import { Router } from "express";
import { deleteTipoVehiculo, getTipoVehiculo, postTipoVehiculo, putTipoVehiculo } from "../controllers/tiposVehiculos";

const router = Router();

router.get("/:marca/:modelo/:version/:anio", getTipoVehiculo);
router.post("/", postTipoVehiculo);
router.put("/:marca/:modelo/:version/:anio", putTipoVehiculo);
router.delete("/:marca/:modelo/:version/:anio", deleteTipoVehiculo);

export default router;