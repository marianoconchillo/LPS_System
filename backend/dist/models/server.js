"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clientes_1 = __importDefault(require("../routes/clientes"));
const productores_1 = __importDefault(require("../routes/productores"));
const poliza_1 = __importDefault(require("../routes/poliza"));
class Server {
    constructor() {
        this.apiPaths = {
            clientes: "/api/clientes",
            productores: "/api/productores",
            polizas: "/api/polizas",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5000";
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.clientes, clientes_1.default);
        this.app.use(this.apiPaths.productores, productores_1.default);
        this.app.use(this.apiPaths.polizas, poliza_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map