"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productores_1 = require("../controllers/productores");
const router = (0, express_1.Router)();
router.route("/").post(productores_1.postProductor);
router.route("/:numeroProductor")
    .get(productores_1.getProductor)
    .put(productores_1.putProductor)
    .delete(productores_1.deleteProductor);
exports.default = router;
//# sourceMappingURL=productores.js.map