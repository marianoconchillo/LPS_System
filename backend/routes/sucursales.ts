import { Router } from "express";
import { deleteSucursal, getSucursal, postSucursal, putSucursal } from "../controllers/sucursales";

const router = Router();

router.route("/").post(postSucursal);

router.route("/:numero")
    .get(getSucursal)
    .put(putSucursal)
    .delete(deleteSucursal);

export default router;