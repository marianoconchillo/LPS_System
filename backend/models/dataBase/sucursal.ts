import { Schema, model } from 'mongoose';

export interface ISucursal {
    numero: number;
    direccion: string;
    localidad: ILocalidad;
}

interface ILocalidad {
    nombre: string;
    provincia: string;
    CP: string;
}

const localidad = new Schema<ILocalidad>;

const sucursalSchema = new Schema<ISucursal>({
    numero: { type: Number, required: true, unique: true },
    direccion: { type: String, required: true },
    localidad: { type: localidad, required: true }
},
    {
        collection: "sucursal"
    }
);

export const Sucursal = model<ISucursal>('Sucursal', sucursalSchema);