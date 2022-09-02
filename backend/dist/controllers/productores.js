"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductor = void 0;
const productor_1 = require("../models/dataBase/productor");
// @desc    Get Productor
// @route   GET /api/productores/:id
// @access  Private
const getProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productor = yield productor_1.Productor.findOne({ numeroProductor: id }).populate("sucursal");
    if (productor) {
        res.json(productor);
    }
    else {
        res.status(404).json({
            msg: `No existe productor con número de productor ${id}`
        });
    }
});
exports.getProductor = getProductor;
//# sourceMappingURL=productores.js.map