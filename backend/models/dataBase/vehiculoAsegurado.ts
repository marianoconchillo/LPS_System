import { Schema, model } from 'mongoose';

export interface IVehiculoAsegurado {
    patente: string;
    color: string;
    fotos: string[];
    tipoVehiculo: Schema.Types.ObjectId;
}

const vehiculoAseguradoSchema = new Schema<IVehiculoAsegurado>({
    patente: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    fotos: { type: [String], required: true },
    tipoVehiculo: { type: Schema.Types.ObjectId, required: true, ref: "TipoVehiculo" },
});

const VehiculoAsegurado = model<IVehiculoAsegurado>('VehiculoAsegurado', vehiculoAseguradoSchema);

export default VehiculoAsegurado;