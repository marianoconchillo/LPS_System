"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuota_1 = require("../controllers/cuota");
const router = (0, express_1.Router)();
router.get("/:id", cuota_1.getCuotas);
exports.default = router;
//# sourceMappingURL=cuotas.js.map