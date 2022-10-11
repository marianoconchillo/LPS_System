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
exports.deletePoliza = exports.postPoliza = exports.getPolizasByIdCliente = exports.verificarCuotasVencidas = exports.verificarPolizasVigentesByPatente = exports.getPoliza = void 0;
const cliente_1 = require("../models/dataBase/cliente");
const cobertura_1 = require("../models/dataBase/cobertura");
const poliza_1 = require("../models/dataBase/poliza");
const vehiculoAsegurado_1 = require("../models/dataBase/vehiculoAsegurado");
const verifications_1 = require("../utils/verifications");
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
// @desc    Get Póliza con patente
// @route   GET /api/polizas/vehiculoAsegurado/:patente
// @access  Private
const verificarPolizasVigentesByPatente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patente } = req.params;
    if ((0, verifications_1.patenteValida)(patente)) {
        const vehiculoAsegurado = yield vehiculoAsegurado_1.VehiculoAsegurado.findOne({ patente });
        if (vehiculoAsegurado) {
            const polizas = yield poliza_1.Poliza.find({ vehiculoAsegurado: vehiculoAsegurado._id });
            if (polizas.length > 0) {
                const today = new Date();
                let i = 0;
                let vigente = false;
                while (i < polizas.length && !vigente) {
                    if (polizas[i].fechaFin >= today) {
                        vigente = true;
                    }
                    i++;
                }
                if (vigente) {
                    res.status(200).json({
                        msg: "Ya existe póliza vigente para ese vehículo",
                        polizaVigente: polizas[i]
                    });
                }
                else {
                    res.json({ msg: `Vehículo ${patente} sin pólizas vigentes`, polizaAntigua: polizas[0] });
                }
            }
            else {
                res.json({ msg: `Vehículo ${patente} sin pólizas asociadas` });
            }
        }
        else {
            res.json({ msg: `Vehículo ${patente} sin pólizas asociadas` });
        }
    }
    else {
        res.status(400).json({
            msg: `Patente inválida`
        });
    }
});
exports.verificarPolizasVigentesByPatente = verificarPolizasVigentesByPatente;
// @desc    Get Cuotas vencidas con DNI del Cliente
// @route   GET /api/polizas/cuotas-vencidas/:dni
// @access  Private
const verificarCuotasVencidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    if ((0, verifications_1.dniValido)(dni)) {
        const cliente = yield cliente_1.Cliente.findOne({ dni });
        if (cliente) {
            const polizas = yield poliza_1.Poliza.find({ cliente: cliente._id });
            let cuotasVencidas = [];
            let i = 0;
            let j = 0;
            while (i < polizas.length) {
                const { cuotas } = polizas[i];
                while (j < cuotas.length) {
                    const cuota = cuotas[i];
                    if (cuota.estado === poliza_1.EstadoCuota.vencida) {
                        cuotasVencidas.push(cuota);
                    }
                    j++;
                }
                i++;
            }
            if (cuotasVencidas.length > 0) {
                res.status(200).json({
                    msg: `El cliente ${dni} posee cuotas vencidas`,
                    cuotasVencidas
                });
            }
            else {
                res.json({ msg: `Asegurado ${dni} no tiene cuotas vencidas` });
            }
        }
        else {
            res.status(400).json({
                msg: `No existe Cliente ${dni}`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `Número de DNI inválido`
        });
    }
});
exports.verificarCuotasVencidas = verificarCuotasVencidas;
// @desc    Get Pólizas con ID del Cliente
// @route   GET /api/polizas/cliente/:id
// @access  Private
const getPolizasByIdCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if ((0, verifications_1.verificarObjectId)(id)) {
        const polizas = yield poliza_1.Poliza.find({ cliente: id })
            .populate({
            path: "productor",
            populate: { path: "sucursal" }
        })
            .populate({
            path: "cobertura",
            populate: { path: "daños" }
        })
            .populate({
            path: "vehiculoAsegurado",
            populate: { path: "tipoVehiculo" }
        });
        if (polizas.length > 0) {
            res.json(polizas);
        }
        else {
            res.status(200).json({
                msg: `Cliente sin Pólizas`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `ObjectID Inválido`
        });
    }
});
exports.getPolizasByIdCliente = getPolizasByIdCliente;
// @desc    Post Póliza
// @route   POST /api/polizas
// @access  Private
const postPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productor, cliente, cobertura, vehiculoAsegurado } = req.body;
    if ((0, verifications_1.verificarObjectId)(productor) && (0, verifications_1.verificarObjectId)(cliente) && (0, verifications_1.verificarObjectId)(cobertura) && (0, verifications_1.verificarObjectId)(vehiculoAsegurado)) {
        const numeroPoliza = (yield poliza_1.Poliza.countDocuments()) + 2;
        const fechaInicio = new Date();
        const fechaFin = new Date(new Date().setMonth(fechaInicio.getMonth() + 3));
        const precioCobertura = yield cobertura_1.Cobertura.findById(cobertura);
        try {
            if (precioCobertura) {
                const cuotas = [];
                for (let i = 0; i < 3; i++) {
                    const cuota = {
                        numero: i + 1,
                        estado: poliza_1.EstadoCuota.pagar,
                        importe: precioCobertura.precio,
                        fecha: new Date(new Date().setMonth(fechaInicio.getMonth() + i))
                    };
                    cuotas.push(cuota);
                }
                const poliza = new poliza_1.Poliza({
                    numeroPoliza,
                    fechaInicio,
                    fechaFin,
                    productor,
                    cliente,
                    cobertura,
                    vehiculoAsegurado,
                    cuotas
                });
                yield poliza.save();
                res.json({
                    msg: "Póliza registrada correctamente",
                    poliza
                });
            }
            else {
                res.status(400).json({
                    msg: `Error al buscar Cobertura`
                });
            }
        }
        catch (error) {
            res.status(500).json({
                msg: `Error intentando crear Póliza`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `ObjectID Inválido`
        });
    }
});
exports.postPoliza = postPoliza;
// @desc    Delete Cobertura
// @route   DELETE /api/polizas/:numeroPoliza
// @access  Private
const deletePoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroPoliza } = req.params;
    try {
        const poliza = yield poliza_1.Poliza.findOne({ numeroPoliza });
        if (!poliza) {
            res.status(400).json({
                msg: `No existe Póliza con número ${numeroPoliza}`
            });
        }
        else {
            yield poliza.deleteOne({ numeroPoliza });
            res.json({
                msg: `Póliza eliminada con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Póliza`
        });
    }
});
exports.deletePoliza = deletePoliza;
//# sourceMappingURL=polizas.js.map