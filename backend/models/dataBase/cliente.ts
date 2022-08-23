import { Schema, model } from 'mongoose';
import Persona from './persona';

export interface ICliente extends Persona {
    fechaNacimiento: Date;
    estadoCivil: string;
}

const clienteSchema = new Schema<ICliente>({
    fechaNacimiento: { type: Date, required: true },
    estadoCivil: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true },
});

const Cliente = model<ICliente>('Cliente', clienteSchema);

export default Cliente;