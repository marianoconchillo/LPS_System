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
exports.deletePoliza = exports.putPoliza = exports.postPoliza = exports.getPoliza = void 0;
const poliza_1 = require("../models/dataBase/poliza");
// @desc    Get Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
const getPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroPoliza } = req.params;
    const poliza = yield poliza_1.Poliza.findOne({ numeroPoliza })
        .populate("productor")
        .populate("cliente")
        .populate("cobertura")
        .populate("vehiculoAsegurado");
    if (poliza) {
        res.json(poliza);
    }
    else {
        res.status(400).json({
            msg: `No existe póliza número ${numeroPoliza}`
        });
    }
});
exports.getPoliza = getPoliza;
// @desc    Post Póliza
// @route   POST /api/polizas
// @access  Private
const postPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.postPoliza = postPoliza;
// @desc    Put Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
const putPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.putPoliza = putPoliza;
// @desc    Delete Póliza
// @route   GET /api/polizas/:numeroPoliza
// @access  Private
const deletePoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deletePoliza = deletePoliza;
//# sourceMappingURL=polizas.js.map