"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Swagger
const swagger_ui_express_1 = require("swagger-ui-express");
const options_1 = require("../docs/options");
const clientes_1 = __importDefault(require("../routes/clientes"));
const productores_1 = __importDefault(require("../routes/productores"));
const polizas_1 = __importDefault(require("../routes/polizas"));
const coberturas_1 = __importDefault(require("../routes/coberturas"));
const vehiculosAsegurados_1 = __importDefault(require("../routes/vehiculosAsegurados"));
const sucursales_1 = __importDefault(require("../routes/sucursales"));
const tiposVehiculos_1 = __importDefault(require("../routes/tiposVehiculos"));
const da_o_1 = __importDefault(require("../routes/da\u00F1o"));
class Server {
    constructor() {
        this.apiPaths = {
            clientes: "/api/clientes",
            productores: "/api/productores",
            polizas: "/api/polizas",
            coberturas: "/api/coberturas",
            vehiculosAsegurados: "/api/vehiculosAsegurados",
            sucursales: "/api/sucursales",
            tiposVehiculos: "/api/tiposVehiculos",
            daños: "/api/danios",
            docs: "/docs"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5000";
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.clientes, clientes_1.default);
        this.app.use(this.apiPaths.productores, productores_1.default);
        this.app.use(this.apiPaths.polizas, polizas_1.default);
        this.app.use(this.apiPaths.coberturas, coberturas_1.default);
        this.app.use(this.apiPaths.vehiculosAsegurados, vehiculosAsegurados_1.default);
        this.app.use(this.apiPaths.sucursales, sucursales_1.default);
        this.app.use(this.apiPaths.tiposVehiculos, tiposVehiculos_1.default);
        this.app.use(this.apiPaths.daños, da_o_1.default);
        // Swagger
        this.app.use(this.apiPaths.docs, swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(options_1.specsSwagger));
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
    getApp() {
        return this.app;
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map