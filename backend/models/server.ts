import express, { Application } from "express";
import cors from "cors";

import clienteRoutes from "../routes/clientes";
import productorRoutes from "../routes/productores";
import polizaRoutes from "../routes/polizas";
import coberturaRoutes from "../routes/coberturas";
import vehiculoAseguradoRoutes from "../routes/vehiculosAsegurados";
import sucursalRoutes from "../routes/sucursales";
import tipoVehiculoRoutes from "../routes/tiposVehiculos";
import dañoRoutes from "../routes/daño";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        clientes: "/api/clientes",
        productores: "/api/productores",
        polizas: "/api/polizas",
        coberturas: "/api/coberturas",
        vehiculosAsegurados: "/api/vehiculosAsegurados",
        sucursales: "/api/sucursales",
        tiposVehiculos: "/api/tiposVehiculos",
        daños: "/api/danios",
        docs: "/docs"
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "5000";
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.apiPaths.clientes, clienteRoutes);
        this.app.use(this.apiPaths.productores, productorRoutes);
        this.app.use(this.apiPaths.polizas, polizaRoutes);
        this.app.use(this.apiPaths.coberturas, coberturaRoutes);
        this.app.use(this.apiPaths.vehiculosAsegurados, vehiculoAseguradoRoutes);
        this.app.use(this.apiPaths.sucursales, sucursalRoutes);
        this.app.use(this.apiPaths.tiposVehiculos, tipoVehiculoRoutes);
        this.app.use(this.apiPaths.daños, dañoRoutes);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        });
    }

    getApp(): Application {
        return this.app;
    }

}

export default Server;