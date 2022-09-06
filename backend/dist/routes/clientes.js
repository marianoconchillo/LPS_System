"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
router.get("/:dni", clientes_1.getCliente);
router.post("/", clientes_1.postCliente);
router.put("/:dni", clientes_1.putCliente);
router.delete("/:dni", clientes_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=clientes.js.map