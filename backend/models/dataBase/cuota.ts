import { Schema, model, Types } from 'mongoose';

export interface ICuota {
    numero: number;
    fecha: Date;
    importe: string;
    estado: "A pagar" | "Vencida" | "Pagada";
    poliza: Types.ObjectId;
}

const cuotaSchema = new Schema<ICuota>({
    numero: { type: Number, required: true },
    fecha: { type: Date, required: true },
    importe: { type: String, required: true },
    estado: { type: String, required: true },
    poliza: { type: Schema.Types.ObjectId, required: true, ref: "Poliza" }
},
    {
        collection: "cuota"
    }
);

export const Cuota = model<ICuota>('Cuota', cuotaSchema);