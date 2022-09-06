"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polizas_1 = require("../controllers/polizas");
const router = (0, express_1.Router)();
router.get("/:numeroPoliza", polizas_1.getPoliza);
router.post("/", polizas_1.postPoliza);
router.put("/:numeroPoliza", polizas_1.putPoliza);
router.delete("/:numeroPoliza", polizas_1.deletePoliza);
exports.default = router;
//# sourceMappingURL=polizas.js.map