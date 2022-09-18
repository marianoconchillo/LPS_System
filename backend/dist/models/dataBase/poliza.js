"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poliza = exports.EstadoCuota = void 0;
const mongoose_1 = require("mongoose");
var EstadoCuota;
(function (EstadoCuota) {
    EstadoCuota["pagar"] = "A pagar";
    EstadoCuota["vencida"] = "Vencida";
    EstadoCuota["pagada"] = "Pagada";
})(EstadoCuota = exports.EstadoCuota || (exports.EstadoCuota = {}));
const arrayLimit = (arrayCuotas) => {
    return arrayCuotas.length <= 12;
};
const polizaSchema = new mongoose_1.Schema({
    numeroPoliza: { type: Number, required: true, unique: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    productor: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Productor" },
    cliente: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Cliente" },
    cobertura: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Cobertura" },
    vehiculoAsegurado: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "VehiculoAsegurado" },
    cuotas: [{ type: { numero: Number, fecha: Date, importe: String, estado: String }, validate: [arrayLimit, "No exceder límite de 12 cuotas"] }]
}, {
    collection: "poliza"
});
exports.Poliza = (0, mongoose_1.model)('Poliza', polizaSchema);
//# sourceMappingURL=poliza.js.map