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
exports.deleteCobertura = exports.putCobertura = exports.postCobertura = exports.getCobertura = void 0;
const cobertura_1 = require("../models/dataBase/cobertura");
// @desc    Get Cobertura
// @route   GET /api/coberturas/:codigoCobertura
// @access  Private
const getCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigoCobertura } = req.params;
    const cobertura = yield cobertura_1.Cobertura.findOne({ codigoCobertura })
        .populate("vehiculos")
        .populate("daños");
    if (cobertura) {
        res.json(cobertura);
    }
    else {
        res.status(400).json({
            msg: `No existe cobertura código ${codigoCobertura}`
        });
    }
});
exports.getCobertura = getCobertura;
// @desc    Post Cobertura
// @route   POST /api/coberturas
// @access  Private
const postCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.postCobertura = postCobertura;
// @desc    Put Cobertura
// @route   PUT /api/coberturas/:codigoCobertura
// @access  Private
const putCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.putCobertura = putCobertura;
// @desc    Delete Cobertura
// @route   DELETE /api/coberturas/:codigoCobertura
// @access  Private
const deleteCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteCobertura = deleteCobertura;
//# sourceMappingURL=coberturas.js.map