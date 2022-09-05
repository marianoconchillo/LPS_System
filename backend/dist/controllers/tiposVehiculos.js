"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTipoVehiculo = void 0;
const tipoVehiculo_1 = require("../models/dataBase/tipoVehiculo");
// @desc    Get Tipo Vehiculo
// @route   GET /api/tiposVehiculos/:marca/:modelo/:version/:anio
// @access  Private
const getTipoVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { marca, modelo, version, anio } = req.params;
    const tipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.findOne({ marca, modelo, version, año: anio });
    if (tipoVehiculo) {
        res.json(tipoVehiculo);
    }
    else {
        res.status(404).json({
            msg: `No existe vehículo ${marca}, ${modelo}, ${anio}, ${version}`
        });
    }
    console.log(marca, modelo, version, anio);
});
exports.getTipoVehiculo = getTipoVehiculo;
//# sourceMappingURL=tiposVehiculos.js.map