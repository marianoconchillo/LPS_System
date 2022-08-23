import { Schema, model } from 'mongoose';

interface ICuota {
    numero: number;
    fecha: Date;
    importe: string;
    estado: string;
    poliza: Schema.Types.ObjectId;
}

const cuotaSchema = new Schema<ICuota>({
    numero: { type: Number, required: true },
    fecha: { type: Date, required: true },
    importe: { type: String, required: true },
    estado: { type: String, required: true },
    poliza: { type: Schema.Types.ObjectId, required: true, ref: "Poliza" }
});

const Cuota = model<ICuota>('Cuota', cuotaSchema);

export default Cuota;