"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controller/cliente");
const router = (0, express_1.Router)();
router.get("/:id", cliente_1.getCliente);
exports.default = router;
//# sourceMappingURL=cliente.js.map