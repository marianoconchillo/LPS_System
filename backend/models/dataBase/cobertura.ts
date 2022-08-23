import { Schema, model } from 'mongoose';

interface ICobertura {
    codigoCobertura: string;
    precio: string;
    vehiculos: Schema.Types.ObjectId[];
    daños: Schema.Types.ObjectId[];
}

const coberturaSchema = new Schema<ICobertura>({
    codigoCobertura: { type: String, required: true, unique: true },
    precio: { type: String, required: true },
    vehiculos: { type: [Schema.Types.ObjectId], required: true, ref: "TipoVehiculo" },
    daños: { type: [Schema.Types.ObjectId], required: true, ref: "Daño" }
});

const Cobertura = model<ICobertura>('Cobertura', coberturaSchema);

export default Cobertura;