import { Schema, model } from 'mongoose';

interface IPoliza {
    numeroPoliza: number;
    fechaInicio: Date;
    fechaFin: Date;
    productor: Schema.Types.ObjectId;
    cliente: Schema.Types.ObjectId;
    cobertura: Schema.Types.ObjectId;
}

const polizaSchema = new Schema<IPoliza>({
    numeroPoliza: { type: Number, required: true, unique: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    productor: { type: Schema.Types.ObjectId, required: true, ref: "Productor" },
    cliente: { type: Schema.Types.ObjectId, required: true, ref: "Cliente" },
    cobertura: { type: Schema.Types.ObjectId, required: true, ref: "Cobertura" }
});

const Poliza = model<IPoliza>('Poliza', polizaSchema);

export default Poliza;