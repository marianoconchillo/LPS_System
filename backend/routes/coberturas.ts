import { Router } from "express";
import { deleteCobertura, getCobertura, getCoberturaByTipoVehiculo, postCobertura, putCobertura } from "../controllers/coberturas";

const router = Router();

router.route("/").post(postCobertura);

router.route("/:codigoCobertura")
    .get(getCobertura)
    .put(putCobertura)
    .delete(deleteCobertura);

router.route("/:marca/:modelo/:version/:anio")
    .get(getCoberturaByTipoVehiculo);

export default router;