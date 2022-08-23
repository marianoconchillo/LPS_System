"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Daño = void 0;
const mongoose_1 = require("mongoose");
const dañoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true, unique: true },
    porcentaje: { type: String, required: true },
    descripcion: { type: String, required: true },
}, {
    collection: "daño"
});
exports.Daño = (0, mongoose_1.model)('Daño', dañoSchema);
//# sourceMappingURL=da%C3%B1o.js.map