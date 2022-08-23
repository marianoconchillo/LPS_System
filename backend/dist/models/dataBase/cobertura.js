"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cobertura = void 0;
const mongoose_1 = require("mongoose");
const coberturaSchema = new mongoose_1.Schema({
    codigoCobertura: { type: String, required: true, unique: true },
    precio: { type: String, required: true },
    vehiculos: { type: [mongoose_1.Schema.Types.ObjectId], required: true, ref: "TipoVehiculo" },
    daños: { type: [mongoose_1.Schema.Types.ObjectId], required: true, ref: "Daño" }
}, {
    collection: "cobertura"
});
exports.Cobertura = (0, mongoose_1.model)('Cobertura', coberturaSchema);
//# sourceMappingURL=cobertura.js.map