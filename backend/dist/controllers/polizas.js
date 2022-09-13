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
exports.deletePoliza = exports.putPoliza = exports.postPoliza = exports.getPolizasByIdCliente = exports.getCuotasVencidas = exports.getPolizaByDniPatente = exports.getPoliza = void 0;
const cliente_1 = require("../models/dataBase/cliente");
const cobertura_1 = require("../models/dataBase/cobertura");
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
// @desc    Get Póliza con DNI del Cliente y patente
// @route   GET /api/polizas/:dni/:patente
// @access  Private
const getPolizaByDniPatente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, patente } = req.params;
    const poliza = yield poliza_1.Poliza.findOne()
        .populate({
        path: "vehiculoAsegurado",
        match: { patente: { $eq: patente } }
    })
        .populate({
        path: "cliente",
        match: { dni: { $eq: dni } }
    });
    if (poliza && poliza.vehiculoAsegurado !== null && poliza.cliente !== null) {
        res.json(poliza);
    }
    else {
        res.json({});
    }
});
exports.getPolizaByDniPatente = getPolizaByDniPatente;
// @desc    Get Cuotas vencidas con DNI del Cliente
// @route   GET /api/polizas/cuotas-vencidas/:dni
// @access  Private
const getCuotasVencidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const cliente = yield cliente_1.Cliente.findOne({ dni });
    if (cliente) {
        const polizas = yield poliza_1.Poliza.find({ cliente: cliente._id });
        let cuotasVencidas = [];
        let i = 0;
        while (i < polizas.length) {
            const cuota1 = polizas[i].cuotas[i];
            const cuota2 = polizas[i].cuotas[i + 1];
            const cuota3 = polizas[i].cuotas[i + 2];
            if (cuota1 && cuota1.estado === poliza_1.EstadoCuota.vencida) {
                cuotasVencidas.push(cuota1);
            }
            if (cuota2 && cuota2.estado === poliza_1.EstadoCuota.vencida) {
                cuotasVencidas.push(cuota2);
            }
            if (cuota3 && cuota3.estado === poliza_1.EstadoCuota.vencida) {
                cuotasVencidas.push(cuota3);
            }
            i++;
        }
        res.json(cuotasVencidas);
    }
    else {
        res.status(400).json({
            msg: `No existe Cliente ${dni}`
        });
    }
});
exports.getCuotasVencidas = getCuotasVencidas;
// @desc    Get Pólizas con ID del Cliente
// @route   GET /api/polizas/cliente/:id
// @access  Private
const getPolizasByIdCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
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
        res.status(400).json({
            msg: `Cliente no encontrado o sin Pólizas`
        });
    }
});
exports.getPolizasByIdCliente = getPolizasByIdCliente;
// @desc    Post Póliza
// @route   POST /api/polizas
// @access  Private
const postPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productor, cliente, cobertura, vehiculoAsegurado } = req.body;
    const numeroPoliza = (yield poliza_1.Poliza.countDocuments()) + 1;
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
            res.json(poliza);
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