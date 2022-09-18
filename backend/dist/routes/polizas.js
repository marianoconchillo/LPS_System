"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polizas_1 = require("../controllers/polizas");
const router = (0, express_1.Router)();
router.route("/")
    .post(polizas_1.postPoliza);
router.route("/:numeroPoliza")
    .get(polizas_1.getPoliza);
router.route("/cuotas-vencidas/:dni")
    .get(polizas_1.getCuotasVencidas);
router.route("/cliente/:id")
    .get(polizas_1.getPolizasByIdCliente);
router.route("/vehiculoAsegurado/:patente")
    .get(polizas_1.getPolizasVigentesByPatente);
exports.default = router;
//# sourceMappingURL=polizas.js.map