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
exports.getCuotas = void 0;
const cuota_1 = require("../models/dataBase/cuota");
// @desc    Get Cuotas
// @route   GET /api/cuotas/:id
// @access  Private
const getCuotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cuotas = yield cuota_1.Cuota.find().populate({
        path: "poliza",
        match: { numeroPoliza: id },
    });
    console.log(cuotas);
    if (cuotas.length > 0) {
        res.json(cuotas);
    }
    else {
        res.status(404).json({
            msg: `No existen cuotas para póliza número ${id}`
        });
    }
});
exports.getCuotas = getCuotas;
//# sourceMappingURL=cuota.js.map