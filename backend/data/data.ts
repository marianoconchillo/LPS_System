import { Types } from "mongoose";

import { ICliente } from "../models/dataBase/cliente";
import { ICobertura } from "../models/dataBase/cobertura";
import { ICuota } from "../models/dataBase/cuota";
import { IDaño } from "../models/dataBase/daño";
import { IPoliza } from "../models/dataBase/poliza";
import { IProductor } from "../models/dataBase/productor";
import { ISucursal } from "../models/dataBase/sucursal";
import { ITipoVehiculo } from "../models/dataBase/tipoVehiculo";
import { IVehiculoAsegurado } from "../models/dataBase/vehiculoAsegurado";


export const sucursal: ISucursal = {
    numero: 1,
    direccion: "Antártida Argentina y Chile",
    localidad: {
        nombre: "Centenario",
        provincia: "Neuquén",
        CP: "8309"
    },
}

export const daño: IDaño = {
    nombre: "A-001",
    descripcion: "Responsabilidad Civil hacia Terceros",
    porcentaje: "100"
}

export const tipoVehiculo: ITipoVehiculo = {
    marca: "Toyota",
    modelo: "Hilux",
    version: "SRV",
    año: "2007"
}

export const cliente: ICliente = {
    nombre: "Juan",
    apellido: "Perez",
    dni: "21518853",
    email: "juanperez@hotmail.com",
    estadoCivil: "Soltero",
    fechaNacimiento: new Date("1986-06-21"),
}

export const productor: IProductor = {
    nombre: "Mariano",
    apellido: "Conchillo",
    dni: "41608803",
    email: "marianoconchillo@hotmail.com",
    numeroProductor: 1,
    sucursal: new Types.ObjectId(),
}

export const vehiculoAsegurado: IVehiculoAsegurado = {
    color: "Azul",
    fotos: [""],
    patente: "GAQ-600",
    tipoVehiculo: new Types.ObjectId()
}

export const cobertura: ICobertura = {
    codigoCobertura: "1",
    precio: "2500",
    daños: [new Types.ObjectId()],
    vehiculos: [new Types.ObjectId()]
}

export const poliza: IPoliza = {
    numeroPoliza: 1,
    fechaInicio: new Date("2022-08-23"),
    fechaFin: new Date("2022-12-23"),
    cliente: new Types.ObjectId(),
    productor: new Types.ObjectId(),
    cobertura: new Types.ObjectId(),
    vehiculoAsegurado: new Types.ObjectId(),
}

export const cuota: ICuota = {
    numero: 1,
    estado: "A pagar",
    fecha: new Date("2022-09-23"),
    importe: "2500",
    poliza: new Types.ObjectId(),
}