import swaggerJsDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LPS API REST",
            version: "1.0.0",
            description: "REST API hecha con Express."
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: ["./routes/*.ts"]
}

export const specsSwagger = swaggerJsDoc(swaggerOptions);