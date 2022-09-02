import dotenv from "dotenv";
import connectDB from "./config/db";
import Server from "./models/server";
// import { importData } from "./config/seeder";

dotenv.config();

// Conectamos a la base de datos
connectDB();

// Llenamos la BD con los primeros datos
// importData();

// Creamos el servidor
const server = new Server();
server.listen();