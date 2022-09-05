import { Router } from "express";
import { getTipoVehiculo } from "../controllers/tiposVehiculos";

const router = Router();

router.get("/:marca/:modelo/:version/:anio", getTipoVehiculo);

export default router;