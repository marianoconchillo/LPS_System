import { Schema, model } from 'mongoose';

export interface ISucursal {
    numero: number;
    direccion: string;
    localidad: {
        nombre: string;
        provincia: string;
        CP: string;
    };
}

const sucursalSchema = new Schema<ISucursal>({
    numero: { type: Number, required: true, unique: true },
    direccion: { type: String, required: true },
    localidad: { type: Schema.Types.Mixed, required: true }
},
    {
        collection: "sucursal"
    }
);

export const Sucursal = model<ISucursal>("Sucursal", sucursalSchema);