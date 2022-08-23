"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const server_1 = __importDefault(require("./models/server"));
dotenv_1.default.config();
// Conectamos a la base de datos
(0, db_1.default)();
// importData();
// Creamos el servidor
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map