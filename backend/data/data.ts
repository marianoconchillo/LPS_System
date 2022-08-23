import { Schema } from "mongoose";
import { ICliente } from "../models/dataBase/cliente";
import { IDaño } from "../models/dataBase/daño";
import { ILocalidad } from "../models/dataBase/localidad";
import { IProductor } from "../models/dataBase/productor";
import { ISucursal } from "../models/dataBase/sucursal";
import { ITipoVehiculo } from "../models/dataBase/tipoVehiculo";
import { IVehiculoAsegurado } from "../models/dataBase/vehiculoAsegurado";

export const Localidad: ILocalidad = {
    nombre: "Centenario",
    provincia: "Neuquén",
    CP: "8309"
}

export const sucursal: ISucursal = {
    numero: 1,
    direccion: "Antártida Argentina y Chile",
    localidad: new Schema.Types.ObjectId("1"),
}

export const productor: IProductor = {
    nombre: "Mariano",
    apellido: "Conchillo",
    dni: "41608803",
    email: "marianoconchillo@hotmail.com",
    numeroProductor: 1,
    sucursal: new Schema.Types.ObjectId("1"),
}

export const cliente: ICliente = {
    nombre: "Juan",
    apellido: "Perez",
    dni: "21518853",
    email: "juanperez@hotmail.com",
    estadoCivil: "Soltero",
    fechaNacimiento: new Date("1986-06-21"),
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

export const vehiculoAsegurado: IVehiculoAsegurado = {
    color: "Azul",
    fotos: [""],
    patente: "GAQ-600",
    tipoVehiculo: new Schema.Types.ObjectId("1")
}

