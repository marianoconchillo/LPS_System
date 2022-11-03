"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
router.route("/").post(clientes_1.postCliente);
router.route("/:dni")
    .get(clientes_1.getCliente)
    .put(clientes_1.putCliente)
    .delete(clientes_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=clientes.js.map