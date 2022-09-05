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
exports.getVehiculoAsegurado = void 0;
const vehiculoAsegurado_1 = require("../models/dataBase/vehiculoAsegurado");
// @desc    Get Vehículo Asegurado
// @route   GET /api/vehiculosAsegurados/:patente
// @access  Private
const getVehiculoAsegurado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente } = req.params;
    const vehiculoAsegurado = yield vehiculoAsegurado_1.VehiculoAsegurado.findOne({ patente })
        .populate("tipoVehiculo");
    if (vehiculoAsegurado) {
        res.json(vehiculoAsegurado);
    }
    else {
        res.status(404).json({
            msg: `No existe vehículo asegurado con patente ${patente}`
        });
    }
});
exports.getVehiculoAsegurado = getVehiculoAsegurado;
//# sourceMappingURL=vehiculosAsegurados.js.map