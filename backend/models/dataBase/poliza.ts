import { Schema, model, Types } from 'mongoose';

export interface IPoliza {
    numeroPoliza: number;
    fechaInicio: Date;
    fechaFin: Date;
    productor: Types.ObjectId;
    cliente: Types.ObjectId;
    cobertura: Types.ObjectId;
    vehiculoAsegurado: Types.ObjectId;
}

const polizaSchema = new Schema<IPoliza>({
    numeroPoliza: { type: Number, required: true, unique: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    productor: { type: Schema.Types.ObjectId, required: true, ref: "Productor" },
    cliente: { type: Schema.Types.ObjectId, required: true, ref: "Cliente" },
    cobertura: { type: Schema.Types.ObjectId, required: true, ref: "Cobertura" },
    vehiculoAsegurado: { type: Schema.Types.ObjectId, required: true, ref: "VehiculoAsegurado" },
},
    {
        collection: "poliza"
    }
);

export const Poliza = model<IPoliza>('Poliza', polizaSchema);