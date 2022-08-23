"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVehiculo = void 0;
const mongoose_1 = require("mongoose");
const tipoVehiculoSchema = new mongoose_1.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    año: { type: String, required: true },
    version: { type: String, required: true },
}, {
    collection: "tipoVehiculo"
});
exports.TipoVehiculo = (0, mongoose_1.model)('TipoVehiculo', tipoVehiculoSchema);
//# sourceMappingURL=tipoVehiculo.js.map