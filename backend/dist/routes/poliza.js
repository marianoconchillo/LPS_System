"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poliza_1 = require("../controllers/poliza");
const router = (0, express_1.Router)();
router.get("/:id", poliza_1.getPoliza);
exports.default = router;
//# sourceMappingURL=poliza.js.map