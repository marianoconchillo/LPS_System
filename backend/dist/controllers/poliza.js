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
exports.getPoliza = void 0;
const poliza_1 = require("../models/dataBase/poliza");
// @desc    Get Póliza
// @route   GET /api/poliza/:id
// @access  Private
const getPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const poliza = yield poliza_1.Poliza.findOne({ numeroPoliza: id })
        .populate("productor")
        .populate("cliente")
        .populate("vehiculoAsegurado");
    if (poliza) {
        res.json(poliza);
    }
    else {
        res.status(404).json({
            msg: `No existe póliza número ${id}`
        });
    }
});
exports.getPoliza = getPoliza;
//# sourceMappingURL=poliza.js.map