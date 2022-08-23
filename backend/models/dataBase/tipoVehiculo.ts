import { Schema, model } from 'mongoose';

export interface ITipoVehiculo {
    marca: string;
    modelo: string;
    año: string;
    version: string;
}

const tipoVehiculoSchema = new Schema<ITipoVehiculo>({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    año: { type: String, required: true },
    version: { type: String, required: true },
},
    {
        collection: "tipoVehiculo"
    }
);

export const TipoVehiculo = model<ITipoVehiculo>('TipoVehiculo', tipoVehiculoSchema);