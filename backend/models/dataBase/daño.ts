import { Schema, model } from 'mongoose';

export interface IDaño {
    nombre: string;
    porcentaje: string;
    descripcion: string;
}

const dañoSchema = new Schema<IDaño>({
    nombre: { type: String, required: true, unique: true },
    porcentaje: { type: String, required: true },
    descripcion: { type: String, required: true },
});

const Daño = model<IDaño>('Daño', dañoSchema);

export default Daño;