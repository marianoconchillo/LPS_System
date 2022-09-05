import { Router } from "express";
import { getSucursal } from "../controllers/sucursales";

const router = Router();

router.get("/:numero", getSucursal);

export default router;