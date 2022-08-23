"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuota = void 0;
const mongoose_1 = require("mongoose");
const cuotaSchema = new mongoose_1.Schema({
    numero: { type: Number, required: true },
    fecha: { type: Date, required: true },
    importe: { type: String, required: true },
    estado: { type: String, required: true },
    poliza: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Poliza" }
}, {
    collection: "cuota"
});
exports.Cuota = (0, mongoose_1.model)('Cuota', cuotaSchema);
//# sourceMappingURL=cuota.js.map