import { Router } from "express";
import { getCuotasVencidas, getPoliza, getPolizasVigentesByPatente, getPolizasByIdCliente, postPoliza } from "../controllers/polizas";

const router = Router();

router.route("/")
    .post(postPoliza);


router.route("/:numeroPoliza")
    .get(getPoliza);

router.route("/cuotas-vencidas/:dni")
    .get(getCuotasVencidas);

router.route("/cliente/:id")
    .get(getPolizasByIdCliente);

router.route("/vehiculoAsegurado/:patente")
    .get(getPolizasVigentesByPatente);

export default router;