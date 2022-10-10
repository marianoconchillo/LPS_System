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
exports.deleteCliente = exports.putCliente = exports.postCliente = exports.getCliente = void 0;
const cliente_1 = require("../models/dataBase/cliente");
const verifications_1 = require("../utils/verifications");
// @desc    Get Cliente
// @route   GET /api/clientes/:dni
// @access  Private
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    if ((0, verifications_1.dniValido)(dni)) {
        const cliente = yield cliente_1.Cliente.findOne({ dni });
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(400).json({
                msg: `No existe Cliente con dni ${dni}`
            });
        }
    }
    else {
        res.status(400).json({
            msg: `Número de DNI inválido`
        });
    }
});
exports.getCliente = getCliente;
// @desc    Post Cliente
// @route   POST /api/clientes
// @access  Private
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const cliente = new cliente_1.Cliente(body);
        yield cliente.save();
        res.json(cliente);
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando crear Cliente`
        });
    }
});
exports.postCliente = postCliente;
// @desc    Put Cliente
// @route   PUT /api/clientes/:dni
// @access  Private
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const { body } = req;
    try {
        const cliente = yield cliente_1.Cliente.findOne({ dni });
        if (!cliente) {
            res.status(400).json({
                msg: `No existe Cliente con dni ${dni}`
            });
        }
        else {
            yield cliente.updateOne(body);
            res.json({
                msg: `Cliente actualizado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al actualizar Cliente`
        });
    }
});
exports.putCliente = putCliente;
// @desc    Delete Cliente
// @route   DELETE /api/clientes/:id
// @access  Private
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const cliente = yield cliente_1.Cliente.findOne({ dni });
        if (!cliente) {
            res.status(400).json({
                msg: `No existe Cliente con dni ${dni}`
            });
        }
        else {
            yield cliente.deleteOne({ dni });
            res.json({
                msg: `Cliente eliminado con éxtio`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error intentando eliminar Cliente`
        });
    }
});
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=clientes.js.map