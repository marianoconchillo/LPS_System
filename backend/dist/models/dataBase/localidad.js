"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const localidadSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true, unique: true },
    provincia: { type: String, required: true },
    CP: { type: String, required: true, unique: true },
});
const Localidad = (0, mongoose_1.model)('Localidad', localidadSchema);
exports.default = Localidad;
//# sourceMappingURL=localidad.js.map