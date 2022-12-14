import { connect } from "mongoose";
require("../models/dataBase/productor");
require("../models/dataBase/sucursal");
require("../models/dataBase/poliza");
require("../models/dataBase/cliente");
require("../models/dataBase/cobertura");
require("../models/dataBase/vehiculoAsegurado");
require("../models/dataBase/tipoVehiculo");
require("../models/dataBase/daño");

const connectDB = async () => {
    try {
        const db = await connect(process.env.MONGO_URI || "");
        console.log(`MongoDB Connected: ${db.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;