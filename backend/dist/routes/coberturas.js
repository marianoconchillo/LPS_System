"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coberturas_1 = require("../controllers/coberturas");
const router = (0, express_1.Router)();
router.get("/:codigoCobertura", coberturas_1.getCobertura);
router.post("/", coberturas_1.postCobertura);
router.put("/:codigoCobertura", coberturas_1.putCobertura);
router.delete("/:codigoCobertura", coberturas_1.deleteCobertura);
exports.default = router;
//# sourceMappingURL=coberturas.js.map