"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposVehiculos_1 = require("../controllers/tiposVehiculos");
const router = (0, express_1.Router)();
router.route("/").post(tiposVehiculos_1.postTipoVehiculo);
router.route("/:marca/:modelo/:version/:anio")
    .get(tiposVehiculos_1.getTipoVehiculo)
    .put(tiposVehiculos_1.putTipoVehiculo)
    .delete(tiposVehiculos_1.deleteTipoVehiculo);
exports.default = router;
//# sourceMappingURL=tiposVehiculos.js.map