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
exports.getCliente = void 0;
const cliente_1 = require("../models/dataBase/cliente");
// @desc    Get Cliente
// @route   GET /api/clientes/:dni
// @access  Private
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const cliente = yield cliente_1.Cliente.findOne({ dni });
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({
            msg: `No existe usuario con dni ${dni}`
        });
    }
});
exports.getCliente = getCliente;
//# sourceMappingURL=clientes.js.map