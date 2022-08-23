import { Schema, model } from 'mongoose';
import Persona from './persona';

export interface IProductor extends Persona {
    numeroProductor: number;
    sucursal: Schema.Types.ObjectId;
}

const productorSchema = new Schema<IProductor>({
    numeroProductor: { type: Number, required: true, unique: true },
    sucursal: { type: Schema.Types.ObjectId, required: true, ref: "Sucursal" },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true }
});

const Productor = model<IProductor>('Productor', productorSchema);

export default Productor;