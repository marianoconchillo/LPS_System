"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specsSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
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
};
exports.specsSwagger = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=options.js.map