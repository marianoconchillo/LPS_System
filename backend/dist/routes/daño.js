"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const da_o_1 = require("../controllers/da\u00F1o");
const router = (0, express_1.Router)();
router.route("/").post(da_o_1.postDaño);
router.route("/:nombre")
    .get(da_o_1.getDaño)
    .put(da_o_1.putDaño)
    .delete(da_o_1.deleteDaño);
exports.default = router;
//# sourceMappingURL=da%C3%B1o.js.map