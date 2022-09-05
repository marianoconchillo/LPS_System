"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coberturas_1 = require("../controllers/coberturas");
const router = (0, express_1.Router)();
router.get("/:id", coberturas_1.getCobertura);
exports.default = router;
//# sourceMappingURL=cobertura.js.map