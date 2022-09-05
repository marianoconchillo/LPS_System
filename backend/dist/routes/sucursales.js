"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucursales_1 = require("../controllers/sucursales");
const router = (0, express_1.Router)();
router.get("/:numero", sucursales_1.getSucursal);
exports.default = router;
//# sourceMappingURL=sucursales.js.map