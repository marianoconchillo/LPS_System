"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const da_o_1 = require("../controllers/da\u00F1o");
const router = (0, express_1.Router)();
router.get("/:nombre", da_o_1.getDaño);
router.post("/", da_o_1.postDaño);
router.put("/:nombre", da_o_1.putDaño);
router.delete("/:nombre", da_o_1.deleteDaño);
exports.default = router;
//# sourceMappingURL=da%C3%B1o.js.map