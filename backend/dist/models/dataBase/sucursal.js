"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucursal = void 0;
const mongoose_1 = require("mongoose");
const sucursalSchema = new mongoose_1.Schema({
    numero: { type: Number, required: true, unique: true },
    direccion: { type: String, required: true },
    localidad: { type: { nombre: String, provincia: String, CP: String }, required: true }
}, {
    collection: "sucursal"
});
exports.Sucursal = (0, mongoose_1.model)("Sucursal", sucursalSchema);
//# sourceMappingURL=sucursal.js.map