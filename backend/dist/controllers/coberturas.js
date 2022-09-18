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
exports.deleteCobertura = exports.putCobertura = exports.postCobertura = exports.getCoberturaByIDTipoVehiculo = exports.getCoberturaByTipoVehiculo = exports.getCobertura = void 0;
const cobertura_1 = require("../models/dataBase/cobertura");
const da_o_1 = require("../models/dataBase/da\u00F1o");
const tipoVehiculo_1 = require("../models/dataBase/tipoVehiculo");
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
// @desc    Get Cobertura por TipoVehículo
// @route   GET /api/coberturas/:marca/:modelo/:version/:anio
// @access  Private
const getCoberturaByTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, version, anio } = req.params;
    const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año: anio });
    if (tipoVehiculo) {
        const coberturas = yield cobertura_1.Cobertura.find({ vehiculos: tipoVehiculo }).populate("daños");
        if (coberturas.length > 0) {
            res.json(coberturas);
        }
        else {
            res.status(400).json({
                msg: `No existen coberturas para vehículo ${marca} ${modelo} ${version} ${anio}`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `No existe cobertura para vehículo ${marca} ${modelo} ${version} ${anio}`
        });
    }
});
exports.getCoberturaByTipoVehiculo = getCoberturaByTipoVehiculo;
// @desc    Get Coberturas por ID TipoVehículo
// @route   GET /api/coberturas/tipoVehiculo/:id
// @access  Private
const getCoberturaByIDTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findById(id);
    if (tipoVehiculo) {
        const coberturas = yield cobertura_1.Cobertura.find({ vehiculos: tipoVehiculo });
        if (coberturas.length > 0) {
            res.json(coberturas);
        }
        else {
            res.status(400).json({
                msg: `No existen coberturas para ese vehículo`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `No existen coberturas para ese vehículo`
        });
    }
});
exports.getCoberturaByIDTipoVehiculo = getCoberturaByIDTipoVehiculo;
// @desc    Post Cobertura
// @route   POST /api/coberturas
// @access  Private
const postCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { vehiculos, daños } = body;
    try {
        if (vehiculos.length > 0 && daños.length > 0) {
            const ids_vehiculos = [];
            const ids_daños = [];
            for (let i = 0; i < vehiculos.length; i++) {
                let vehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne(vehiculos[i]);
                if (vehiculo) {
                    ids_vehiculos.push(vehiculo._id);
                }
                else {
                    res.status(500).json({
                        msg: `TipoVehiculo no encontrado`
                    });
                }
            }
            for (let i = 0; i < daños.length; i++) {
                let daño_encontrado = yield da_o_1.Daño.findOne(daños[i]);
                if (daño_encontrado) {
                    ids_daños.push(daño_encontrado._id);
                }
                else {
                    res.status(500).json({
                        msg: `Daño no encontrado`
                    });
                }
            }
            const cobertura = new cobertura_1.Cobertura({
                codigoCobertura: body.codigoCobertura,
                precio: body.precio,
                vehiculos: ids_vehiculos,
                daños: ids_daños
            });
            yield cobertura.save();
            res.json(cobertura);
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Cobertura`
        });
    }
});
exports.postCobertura = postCobertura;
// @desc    Put Cobertura
// @route   PUT /api/coberturas/:codigoCobertura
// @access  Private
const putCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigoCobertura } = req.params;
    const { body } = req;
    try {
        const cobertura = yield cobertura_1.Cobertura.findOne({ codigoCobertura });
        if (!cobertura) {
            res.status(400).json({
                msg: `No existe Cobertura con código ${codigoCobertura}`
            });
        }
        else {
            yield cobertura.updateOne(body);
            res.json({
                msg: `Cobertura actualizada con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Cobertura`
        });
    }
});
exports.putCobertura = putCobertura;
// @desc    Delete Cobertura
// @route   DELETE /api/coberturas/:codigoCobertura
// @access  Private
const deleteCobertura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigoCobertura } = req.params;
    try {
        const cobertura = yield cobertura_1.Cobertura.findOne({ codigoCobertura });
        if (!cobertura) {
            res.status(400).json({
                msg: `No existe Cobertura con código ${codigoCobertura}`
            });
        }
        else {
            yield cobertura.deleteOne({ codigoCobertura });
            res.json({
                msg: `Cobertura eliminada con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Cobertura`
        });
    }
});
exports.deleteCobertura = deleteCobertura;
//# sourceMappingURL=coberturas.js.map