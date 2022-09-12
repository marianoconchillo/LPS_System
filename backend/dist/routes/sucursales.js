"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucursales_1 = require("../controllers/sucursales");
const router = (0, express_1.Router)();
router.route("/").post(sucursales_1.postSucursal);
router.route("/:numero")
    .get(sucursales_1.getSucursal)
    .put(sucursales_1.putSucursal)
    .delete(sucursales_1.deleteSucursal);
exports.default = router;
//# sourceMappingURL=sucursales.js.map