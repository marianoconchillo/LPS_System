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
const sucursal_1 = require("../models/dataBase/sucursal");
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
    const { numeroProductor, sucursal, nombre, apellido, email, dni } = req.body;
    try {
        const sucursal_productor = yield sucursal_1.Sucursal.findOne({ numero: sucursal });
        if (sucursal_productor) {
            const productor = new productor_1.Productor({
                numeroProductor,
                nombre,
                apellido,
                email,
                dni,
                sucursal: sucursal_productor._id
            });
            yield productor.save();
            res.json(productor);
        }
        else {
            res.status(400).json({
                msg: `Sucursal número ${sucursal} no encontrada`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Productor`
        });
    }
});
exports.postProductor = postProductor;
// @desc    Put Productor
// @route   PUT /api/productores/:numeroProductor
// @access  Private
const putProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroProductor } = req.params;
    const { body } = req;
    try {
        const productor = yield productor_1.Productor.findOne({ numeroProductor });
        if (!productor) {
            res.status(400).json({
                msg: `No existe Productor con número ${numeroProductor}`
            });
        }
        else {
            yield productor.updateOne(body);
            res.json({
                msg: `Productor actualizado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Productor`
        });
    }
});
exports.putProductor = putProductor;
// @desc    Delete Productor
// @route   DELETE /api/productores/:numeroProductor
// @access  Private
const deleteProductor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroProductor } = req.params;
    try {
        const productor = yield productor_1.Productor.findOne({ numeroProductor });
        if (!productor) {
            res.status(400).json({
                msg: `No existe Productor con número ${numeroProductor}`
            });
        }
        else {
            yield productor.deleteOne({ numeroProductor });
            res.json({
                msg: `Productor eliminado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Productor intentando eliminar Cliente`
        });
    }
});
exports.deleteProductor = deleteProductor;
//# sourceMappingURL=productores.js.map