"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe("Registrar Póliza - Camino Común", () => {
    // ##############
    // ## CAMINO 1 ##
    // ##############
    it("Debería fallar al obtener productor", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/99a").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
});
//# sourceMappingURL=registrarPoliza.test.js.map