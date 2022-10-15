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
exports.importData = void 0;
const data_1 = require("../data/data");
const sucursal_1 = require("../models/dataBase/sucursal");
const da_o_1 = require("../models/dataBase/da\u00F1o");
const tipoVehiculo_1 = require("../models/dataBase/tipoVehiculo");
const cliente_1 = require("../models/dataBase/cliente");
const productor_1 = require("../models/dataBase/productor");
const vehiculoAsegurado_1 = require("../models/dataBase/vehiculoAsegurado");
const cobertura_1 = require("../models/dataBase/cobertura");
const poliza_1 = require("../models/dataBase/poliza");
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Elimino todo
        // await deleteMany();
        // Inserto Sucursal
        const createdSucursal = yield sucursal_1.Sucursal.insertMany(data_1.sucursal);
        // Inserto Daño
        const createdDaño = yield da_o_1.Daño.insertMany(data_1.daño);
        // Inserto TipoVehiculo
        const createdTipoVehiculo = yield tipoVehiculo_1.TipoVehiculo.insertMany(data_1.tipoVehiculo);
        // Inserto Cliente
        const createdCliente = yield cliente_1.Cliente.insertMany(data_1.cliente);
        // Inserto Productor
        data_1.productor.sucursal = createdSucursal[0]._id;
        const createdProductor = yield productor_1.Productor.insertMany(data_1.productor);
        // Inserto VehiculoAsegurado
        data_1.vehiculoAsegurado.tipoVehiculo = createdTipoVehiculo[0]._id;
        const createdVehiculoAsegurado = yield vehiculoAsegurado_1.VehiculoAsegurado.insertMany(data_1.vehiculoAsegurado);
        // Inserto Cobertura
        data_1.cobertura.daños[0] = createdDaño[0]._id;
        data_1.cobertura.vehiculos[0] = createdTipoVehiculo[0]._id;
        const createdCobertura = yield cobertura_1.Cobertura.insertMany(data_1.cobertura);
        // Inserto Poliza
        data_1.poliza.cliente = createdCliente[0]._id;
        data_1.poliza.cobertura = createdCobertura[0]._id;
        data_1.poliza.productor = createdProductor[0]._id;
        data_1.poliza.vehiculoAsegurado = createdVehiculoAsegurado[0]._id;
        yield poliza_1.Poliza.insertMany(data_1.poliza);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
exports.importData = importData;
const deleteMany = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sucursal_1.Sucursal.deleteMany();
    yield da_o_1.Daño.deleteMany();
    yield tipoVehiculo_1.TipoVehiculo.deleteMany();
    yield cliente_1.Cliente.deleteMany();
    yield productor_1.Productor.deleteMany();
    yield vehiculoAsegurado_1.VehiculoAsegurado.deleteMany();
    yield cobertura_1.Cobertura.deleteMany();
    yield poliza_1.Poliza.deleteMany();
});
//# sourceMappingURL=seeder.js.map