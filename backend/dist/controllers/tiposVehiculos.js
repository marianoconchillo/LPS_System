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
exports.deleteTipoVehiculo = exports.putTipoVehiculo = exports.postTipoVehiculo = exports.getTipoVehiculo = void 0;
const tipoVehiculo_1 = require("../models/dataBase/tipoVehiculo");
// @desc    Get Tipo Vehiculo
// @route   GET /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
const getTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, version, anio } = req.params;
    const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año: anio });
    if (tipoVehiculo) {
        res.json(tipoVehiculo);
    }
    else {
        res.status(400).json({
            msg: `No existe vehículo ${marca}, ${modelo}, ${anio}, ${version}`
        });
    }
});
exports.getTipoVehiculo = getTipoVehiculo;
// @desc    POST Tipo Vehiculo
// @route   POST /api/tiposVehiculos
// @access  Private
const postTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const tipoVehiculo = new tipoVehiculo_1.TipoVehiculo(body);
        yield tipoVehiculo.save();
        res.json(tipoVehiculo);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear TipoVehículo`
        });
    }
});
exports.postTipoVehiculo = postTipoVehiculo;
// @desc    Put Tipo Vehiculo
// @route   PUT /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
const putTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, version, anio } = req.params;
    const { body } = req;
    try {
        const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año: anio });
        if (!tipoVehiculo) {
            res.status(400).json({
                msg: `No existe TipoVehículo con datos ${marca}, ${modelo}, ${version} y ${anio}`
            });
        }
        else {
            yield tipoVehiculo.updateOne(body);
            res.json({
                msg: `TipoVehículo actualizado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar TipoVehículo`
        });
    }
});
exports.putTipoVehiculo = putTipoVehiculo;
// @desc    Delete Tipo Vehiculo
// @route   DELETE /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
const deleteTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, version, anio } = req.params;
    try {
        const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año: anio });
        if (!tipoVehiculo) {
            res.status(400).json({
                msg: `No existe TipoVehículo con datos ${marca}, ${modelo}, ${version} y ${anio}`
            });
        }
        else {
            yield tipoVehiculo.deleteOne({ marca, modelo, version, año: anio });
            res.json({
                msg: `TipoVehiculo eliminado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar TipoVehiculo`
        });
    }
});
exports.deleteTipoVehiculo = deleteTipoVehiculo;
//# sourceMappingURL=tiposVehiculos.js.map