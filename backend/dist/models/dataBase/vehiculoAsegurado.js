"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculoAsegurado = void 0;
const mongoose_1 = require("mongoose");
const vehiculoAseguradoSchema = new mongoose_1.Schema({
    patente: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    fotos: { type: [String], required: true },
    tipoVehiculo: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "TipoVehiculo" },
}, {
    collection: "vehiculoAsegurado"
});
exports.VehiculoAsegurado = (0, mongoose_1.model)('VehiculoAsegurado', vehiculoAseguradoSchema);
//# sourceMappingURL=vehiculoAsegurado.js.map