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
    const { body } = req;
    try {
        const sucursal = new sucursal_1.Sucursal(body);
        yield sucursal.save();
        res.json(sucursal);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Sucursal`
        });
    }
});
exports.postSucursal = postSucursal;
// @desc    Put Sucursal
// @route   PUT /api/sucursales/:numero
// @access  Private
const putSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero } = req.params;
    const { body } = req;
    try {
        const sucursal = yield sucursal_1.Sucursal.findOne({ numero });
        if (!sucursal) {
            res.status(400).json({
                msg: `No existe Sucursal con número ${sucursal}`
            });
        }
        else {
            yield sucursal.updateOne(body);
            res.json({
                msg: `Sucursal actualizada correctamente`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando actualizar Sucursal`
        });
    }
});
exports.putSucursal = putSucursal;
// @desc    Delete Sucursal
// @route   DELETE /api/sucursales/:numero
// @access  Private
const deleteSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero } = req.params;
    try {
        const sucursal = yield sucursal_1.Sucursal.findOne({ numero });
        if (!sucursal) {
            res.status(400).json({
                msg: `No existe Sucursal con número ${sucursal}`
            });
        }
        else {
            yield sucursal.deleteOne({ numero });
            res.json({
                msg: `Sucursal eliminada correctamente`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando actualizar Sucursal`
        });
    }
});
exports.deleteSucursal = deleteSucursal;
//# sourceMappingURL=sucursales.js.map