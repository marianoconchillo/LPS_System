import { Router } from "express";
import { verificarCuotasVencidas, getPoliza, verificarPolizasVigentesByPatente, getPolizasByIdCliente, postPoliza, deletePoliza } from "../controllers/polizas";

const router = Router();

router.route("/")
    .post(postPoliza);


router.route("/:numeroPoliza")
    .get(getPoliza)
    .delete(deletePoliza);

router.route("/cuotas-vencidas/:dni")
    .get(verificarCuotasVencidas);

router.route("/cliente/:id")
    .get(getPolizasByIdCliente);

router.route("/vehiculoAsegurado/:patente")
    .get(verificarPolizasVigentesByPatente);

export default router;