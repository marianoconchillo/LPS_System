import { Router } from "express";
import { deletePoliza, getCuotasVencidas, getPoliza, getPolizaByDniPatente, getPolizasByIdCliente, postPoliza, putPoliza } from "../controllers/polizas";

const router = Router();

router.route("/")
    .post(postPoliza);


router.route("/:numeroPoliza")
    .get(getPoliza)
    .put(putPoliza)
    .delete(deletePoliza);

router.route("/cuotas-vencidas/:dni")
    .get(getCuotasVencidas);

router.route("/cliente/:id")
    .get(getPolizasByIdCliente);

router.route("/:dni/:patente")
    .get(getPolizaByDniPatente);

export default router;