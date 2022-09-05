"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polizas_1 = require("../controllers/polizas");
const router = (0, express_1.Router)();
router.get("/:id", polizas_1.getPoliza);
exports.default = router;
//# sourceMappingURL=poliza.js.map