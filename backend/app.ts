import dotenv from "dotenv";
import connectDB from "./config/db";
import Server from "./models/server";
import { importData } from "./seeder";

dotenv.config();

// Conectamos a la base de datos
connectDB();

// importData();

// Creamos el servidor
const server = new Server();
server.listen();