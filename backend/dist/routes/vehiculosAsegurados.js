"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculosAsegurados_1 = require("../controllers/vehiculosAsegurados");
const router = (0, express_1.Router)();
router.get("/:patente", vehiculosAsegurados_1.getVehiculoAsegurado);
exports.default = router;
//# sourceMappingURL=vehiculosAsegurados.js.map