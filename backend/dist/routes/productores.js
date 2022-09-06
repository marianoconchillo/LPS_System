"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productores_1 = require("../controllers/productores");
const router = (0, express_1.Router)();
router.get("/:numeroProductor", productores_1.getProductor);
router.post("/", productores_1.postProductor);
router.put("/:numeroProductor", productores_1.putProductor);
router.delete("/:numeroProductor", productores_1.deleteProductor);
exports.default = router;
//# sourceMappingURL=productores.js.map