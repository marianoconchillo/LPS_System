import { Schema, model, Types } from 'mongoose';

export enum EstadoCuota {
    pagar = "A pagar",
    vencida = "Vencida",
    pagada = "Pagada",
}

interface ICuota {
    numero: number;
    fecha: Date;
    importe: string;
    estado: EstadoCuota;
}

export interface IPoliza {
    numeroPoliza: number;
    fechaInicio: Date;
    fechaFin: Date;
    productor: Types.ObjectId;
    cliente: Types.ObjectId;
    cobertura: Types.ObjectId;
    vehiculoAsegurado: Types.ObjectId;
    cuotas: ICuota[];
}

const polizaSchema = new Schema<IPoliza>({
    numeroPoliza: { type: Number, required: true, unique: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    productor: { type: Schema.Types.ObjectId, required: true, ref: "Productor" },
    cliente: { type: Schema.Types.ObjectId, required: true, ref: "Cliente" },
    cobertura: { type: Schema.Types.ObjectId, required: true, ref: "Cobertura" },
    vehiculoAsegurado: { type: Schema.Types.ObjectId, required: true, ref: "VehiculoAsegurado" },
    cuotas: [{ type: { numero: Number, fecha: Date, importe: String, estado: String }}]
},
    {
        collection: "poliza"
    }
);

export const Poliza = model<IPoliza>('Poliza', polizaSchema);