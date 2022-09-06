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
exports.deleteSucursal = exports.putSucursal = exports.postSucursal = exports.getSucursal = void 0;
const sucursal_1 = require("../models/dataBase/sucursal");
// @desc    Get Sucursal
// @route   GET /api/sucursales/:numero
// @access  Private
const getSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero } = req.params;
    const sucursal = yield sucursal_1.Sucursal.findOne({ numero });
    if (sucursal) {
        res.json(sucursal);
    }
    else {
        res.status(400).json({
            msg: `No existe sucursal número ${numero}`
        });
    }
});
exports.getSucursal = getSucursal;
// @desc    Post Sucursal
// @route   POST /api/sucursales
// @access  Private
const postSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.postSucursal = postSucursal;
// @desc    Put Sucursal
// @route   PUT /api/sucursales/:numero
// @access  Private
const putSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.putSucursal = putSucursal;
// @desc    Delete Sucursal
// @route   DELETE /api/sucursales/:numero
// @access  Private
const deleteSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteSucursal = deleteSucursal;
//# sourceMappingURL=sucursales.js.map