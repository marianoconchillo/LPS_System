import { Schema, model } from 'mongoose';

export interface ILocalidad {
    nombre: string;
    provincia: string;
    CP: string;
}

const localidadSchema = new Schema<ILocalidad>({
    nombre: { type: String, required: true, unique: true },
    provincia: { type: String, required: true },
    CP: { type: String, required: true, unique: true },
});

const Localidad = model<ILocalidad>('Localidad', localidadSchema);

export default Localidad;