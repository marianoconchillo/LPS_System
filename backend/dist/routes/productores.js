"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productores_1 = require("../controllers/productores");
const router = (0, express_1.Router)();
router.get("/:id", productores_1.getProductor);
exports.default = router;
//# sourceMappingURL=productores.js.map