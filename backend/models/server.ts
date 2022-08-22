import express, { Application } from "express";
import cors from "cors";

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.middlewares();
        this.port = process.env.PORT || "5000";
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