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
exports.deleteDaño = exports.putDaño = exports.postDaño = exports.getDaño = void 0;
const da_o_1 = require("../models/dataBase/da\u00F1o");
// @desc    Get Daño
// @route   GET /api/danios/:nombre
// @access  Private
const getDaño = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const daño = yield da_o_1.Daño.findOne({ nombre });
    if (daño) {
        res.json(daño);
    }
    else {
        res.status(400).json({
            msg: `No existe daño con nombre ${nombre}`
        });
    }
});
exports.getDaño = getDaño;
// @desc    Post Daño
// @route   POST /api/danios
// @access  Private
const postDaño = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const daño = new da_o_1.Daño(body);
        yield daño.save();
        res.json(daño);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Daño`
        });
    }
});
exports.postDaño = postDaño;
// @desc    Put Daño
// @route   PUT /api/danios/:nombre
// @access  Private
const putDaño = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const { body } = req;
    try {
        const daño = yield da_o_1.Daño.findOne({ nombre });
        if (!daño) {
            res.status(400).json({
                msg: `No existe Daño con nombre ${nombre}`
            });
        }
        else {
            yield daño.updateOne(body);
            res.json({
                msg: `Daño actualizado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Daño`
        });
    }
});
exports.putDaño = putDaño;
// @desc    Delete Daño
// @route   DELETE /api/danios/:nombre
// @access  Private
const deleteDaño = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const daño = yield da_o_1.Daño.findOne({ nombre });
        if (!daño) {
            res.status(400).json({
                msg: `No existe Daño con nombre ${nombre}`
            });
        }
        else {
            yield daño.deleteOne({ nombre });
            res.json({
                msg: `Daño eliminado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Daño`
        });
    }
});
exports.deleteDaño = deleteDaño;
//# sourceMappingURL=da%C3%B1o.js.map