import dotenv from "dotenv";
import connectDB from "./config/db";
import Server from "./models/server";

dotenv.config();

// Conectamos a la base de datos
connectDB();

// Creamos el servidor
const server = new Server();
server.listen();