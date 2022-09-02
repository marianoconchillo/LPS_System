import express, { Application } from "express";
import cors from "cors";
import clienteRoutes from "../routes/clientes";
import productorRoutes from "../routes/productores";
import polizaRoutes from "../routes/poliza";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        clientes: "/api/clientes",
        productores: "/api/productores",
        polizas: "/api/polizas",
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

}

export default Server;