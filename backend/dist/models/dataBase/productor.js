"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productor = void 0;
const mongoose_1 = require("mongoose");
const productorSchema = new mongoose_1.Schema({
    numeroProductor: { type: Number, required: true, unique: true },
    sucursal: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Sucursal" },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true }
}, {
    collection: "productor"
});
exports.Productor = (0, mongoose_1.model)('Productor', productorSchema);
//# sourceMappingURL=productor.js.map