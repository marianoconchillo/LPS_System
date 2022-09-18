"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculosAsegurados_1 = require("../controllers/vehiculosAsegurados");
const router = (0, express_1.Router)();
router.route("/").post(vehiculosAsegurados_1.postVehiculoAsegurado);
router.route("/:patente")
    .get(vehiculosAsegurados_1.getVehiculoAsegurado)
    .put(vehiculosAsegurados_1.putVehiculoAsegurado)
    .delete(vehiculosAsegurados_1.deleteVehiculoAsegurado);
router.route("/tipoVehiculo/:id")
    .get(vehiculosAsegurados_1.getIDTipoVehiculoByID);
exports.default = router;
//# sourceMappingURL=vehiculosAsegurados.js.map