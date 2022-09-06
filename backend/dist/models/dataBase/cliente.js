"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    fechaNacimiento: { type: Date, required: true, enum: ["Casado", "Soltero"] },
    estadoCivil: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true },
}, { collection: "cliente" });
exports.Cliente = (0, mongoose_1.model)('Cliente', clienteSchema);
//# sourceMappingURL=cliente.js.map