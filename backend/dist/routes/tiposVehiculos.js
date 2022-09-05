"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposVehiculos_1 = require("../controllers/tiposVehiculos");
const router = (0, express_1.Router)();
router.get("/:marca/:modelo/:version/:anio", tiposVehiculos_1.getTipoVehiculo);
exports.default = router;
//# sourceMappingURL=tiposVehiculos.js.map