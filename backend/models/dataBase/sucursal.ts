import { Schema, model } from 'mongoose';

export interface ISucursal {
    numero: number;
    direccion: string;
    localidad: Schema.Types.ObjectId;
}

const sucursalSchema = new Schema<ISucursal>({
    numero: { type: Number, required: true, unique: true },
    direccion: { type: String, required: true },
    localidad: { type: Schema.Types.ObjectId, required: true, ref: "Localidad" }
});

const Sucursal = model<ISucursal>('Sucursal', sucursalSchema);

export default Sucursal;