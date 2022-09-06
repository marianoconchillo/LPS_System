import { Router } from "express";
import { deleteSucursal, getSucursal, postSucursal, putSucursal } from "../controllers/sucursales";

const router = Router();

router.get("/:numero", getSucursal);
router.post("/", postSucursal);
router.put("/:numero", putSucursal);
router.delete("/:numero", deleteSucursal);

export default router;