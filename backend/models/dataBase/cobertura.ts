import { Schema, model, Types } from 'mongoose';

export interface ICobertura {
    codigoCobertura: string;
    precio: string;
    vehiculos: Types.ObjectId[];
    daños: Types.ObjectId[];
}

const coberturaSchema = new Schema<ICobertura>({
    codigoCobertura: { type: String, required: true, unique: true },
    precio: { type: String, required: true },
    vehiculos: { type: [Schema.Types.ObjectId], required: true, ref: "TipoVehiculo" },
    daños: { type: [Schema.Types.ObjectId], required: true, ref: "Daño" }
},
    {
        collection: "cobertura"
    }
);

export const Cobertura = model<ICobertura>('Cobertura', coberturaSchema);