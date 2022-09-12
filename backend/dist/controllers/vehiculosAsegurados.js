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
exports.deleteVehiculoAsegurado = exports.putVehiculoAsegurado = exports.postVehiculoAsegurado = exports.getVehiculoAsegurado = void 0;
const tipoVehiculo_1 = require("../models/dataBase/tipoVehiculo");
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
        res.status(400).json({
            msg: `No existe vehículo asegurado con patente ${patente}`
        });
    }
});
exports.getVehiculoAsegurado = getVehiculoAsegurado;
// @desc    Post Vehículo Asegurado
// @route   POST /api/vehiculosAsegurados
// @access  Private
const postVehiculoAsegurado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { patente, color, fotos, vehiculo } = body;
    const { marca, modelo, version, año } = vehiculo;
    try {
        const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año });
        if (tipoVehiculo) {
            const vehiculoAsegurado = new vehiculoAsegurado_1.VehiculoAsegurado({
                patente,
                color,
                fotos,
                tipoVehiculo: tipoVehiculo._id
            });
            yield vehiculoAsegurado.save();
            res.json(vehiculoAsegurado);
        }
        else {
            res.status(500).json({
                msg: `TipoVehiculo no encontrado`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear VehículoAsegurado`
        });
    }
});
exports.postVehiculoAsegurado = postVehiculoAsegurado;
// @desc    Put Vehículo Asegurado
// @route   PUT /api/vehiculosAsegurados/:patente
// @access  Private
const putVehiculoAsegurado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente } = req.params;
    const { body } = req;
    try {
        const vehiculoAsegurado = yield vehiculoAsegurado_1.VehiculoAsegurado.findOne({ patente });
        if (!vehiculoAsegurado) {
            res.status(400).json({
                msg: `No existe VehículoAsegurado con patente ${patente}`
            });
        }
        else {
            yield vehiculoAsegurado.updateOne(body);
            res.json({
                msg: `VehículoAsegurado actualizado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar VehículoAsegurado`
        });
    }
});
exports.putVehiculoAsegurado = putVehiculoAsegurado;
// @desc    Delete Vehículo Asegurado
// @route   DELETE /api/vehiculosAsegurados/:patente
// @access  Private
const deleteVehiculoAsegurado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente } = req.params;
    try {
        const vehiculoAsegurado = yield vehiculoAsegurado_1.VehiculoAsegurado.findOne({ patente });
        if (!vehiculoAsegurado) {
            res.status(400).json({
                msg: `No existe VehículoAsegurado con patente ${patente}`
            });
        }
        else {
            yield vehiculoAsegurado.deleteOne({ patente });
            res.json({
                msg: `VehículoAsegurado eliminado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al eliminar VehículoAsegurado`
        });
    }
});
exports.deleteVehiculoAsegurado = deleteVehiculoAsegurado;
//# sourceMappingURL=vehiculosAsegurados.js.map