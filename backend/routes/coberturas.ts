import { Router } from "express";
import { deleteCobertura, getCobertura, getCoberturaByIDTipoVehiculo, getCoberturaByTipoVehiculo, postCobertura, putCobertura } from "../controllers/coberturas";

const router = Router();

router.route("/").post(postCobertura);

router.route("/:codigoCobertura")
    .get(getCobertura)
    .put(putCobertura)
    .delete(deleteCobertura);

router.route("/tipoVehiculo/:id")
    .get(getCoberturaByIDTipoVehiculo);

router.route("/:marca/:modelo/:version/:anio")
    .get(getCoberturaByTipoVehiculo);

export default router;