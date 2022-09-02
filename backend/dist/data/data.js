"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poliza = exports.cobertura = exports.vehiculoAsegurado = exports.productor = exports.cliente = exports.tipoVehiculo = exports.daño = exports.sucursal = void 0;
const mongoose_1 = require("mongoose");
const poliza_1 = require("../models/dataBase/poliza");
exports.sucursal = {
    numero: 1,
    direccion: "Antártida Argentina y Chile",
    localidad: {
        nombre: "Centenario",
        provincia: "Neuquén",
        CP: "8309"
    },
};
exports.daño = {
    nombre: "A-001",
    descripcion: "Responsabilidad Civil hacia Terceros",
    porcentaje: "100"
};
exports.tipoVehiculo = {
    marca: "Toyota",
    modelo: "Hilux",
    version: "SRV",
    año: "2007"
};
exports.cliente = {
    nombre: "Juan",
    apellido: "Perez",
    dni: "21518853",
    email: "juanperez@hotmail.com",
    estadoCivil: "Soltero",
    fechaNacimiento: new Date("1986-06-21"),
};
exports.productor = {
    nombre: "Mariano",
    apellido: "Conchillo",
    dni: "41608803",
    email: "marianoconchillo@hotmail.com",
    numeroProductor: 1,
    sucursal: new mongoose_1.Types.ObjectId(),
};
exports.vehiculoAsegurado = {
    color: "Azul",
    fotos: [""],
    patente: "GAQ-600",
    tipoVehiculo: new mongoose_1.Types.ObjectId()
};
exports.cobertura = {
    codigoCobertura: "1",
    precio: "2500",
    daños: [new mongoose_1.Types.ObjectId()],
    vehiculos: [new mongoose_1.Types.ObjectId()]
};
exports.poliza = {
    numeroPoliza: 1,
    fechaInicio: new Date("2022-08-23"),
    fechaFin: new Date("2022-12-23"),
    cliente: new mongoose_1.Types.ObjectId(),
    productor: new mongoose_1.Types.ObjectId(),
    cobertura: new mongoose_1.Types.ObjectId(),
    vehiculoAsegurado: new mongoose_1.Types.ObjectId(),
    cuotas: [
        {
            numero: 1,
            estado: poliza_1.EstadoCuota.pagada,
            fecha: new Date("2022-09-23"),
            importe: "2500"
        },
        {
            numero: 2,
            estado: poliza_1.EstadoCuota.pagar,
            fecha: new Date("2022-09-23"),
            importe: "2500"
        },
        {
            numero: 3,
            estado: poliza_1.EstadoCuota.pagar,
            fecha: new Date("2022-09-23"),
            importe: "2500"
        },
    ]
};
//# sourceMappingURL=data.js.map