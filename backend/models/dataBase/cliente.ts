import { Schema, model } from 'mongoose';
import Persona from './persona';

export interface ICliente extends Persona {
    fechaNacimiento: Date;
    estadoCivil: string;
}

const clienteSchema = new Schema<ICliente>({
    fechaNacimiento: { type: Date, required: true },
    estadoCivil: { type: String, required: true,  enum: ["Casado", "Soltero"] },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true },
},
    { collection: "cliente" }
);

export const Cliente = model<ICliente>('Cliente', clienteSchema);