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
exports.deleteProductor = exports.putProductor = exports.postProductor = exports.getProductor = void 0;
const productor_1 = require("../models/dataBase/productor");
// @desc    Get Productor
// @route   GET /api/productores/:numeroProductor
// @access  Private
const getProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroProductor } = req.params;
    const productor = yield productor_1.Productor.findOne({ numeroProductor }).populate("sucursal");
    if (productor) {
        res.json(productor);
    }
    else {
        res.status(400).json({
            msg: `No existe productor con número de productor ${numeroProductor}`
        });
    }
});
exports.getProductor = getProductor;
// @desc    Post Productor
// @route   GET /api/productores
// @access  Private
const postProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.postProductor = postProductor;
// @desc    Put Productor
// @route   PUT /api/productores/:numeroProductor
// @access  Private
const putProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.putProductor = putProductor;
// @desc    Delete Productor
// @route   DELETE /api/productores/:numeroProductor
// @access  Private
const deleteProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteProductor = deleteProductor;
//# sourceMappingURL=productores.js.map