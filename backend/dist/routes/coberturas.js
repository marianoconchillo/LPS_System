"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coberturas_1 = require("../controllers/coberturas");
const router = (0, express_1.Router)();
router.route("/").post(coberturas_1.postCobertura);
router.route("/:codigoCobertura")
    .get(coberturas_1.getCobertura)
    .put(coberturas_1.putCobertura)
    .delete(coberturas_1.deleteCobertura);
router.route("/:marca/:modelo/:version/:anio")
    .get(coberturas_1.getCoberturaByTipoVehiculo);
exports.default = router;
//# sourceMappingURL=coberturas.js.map