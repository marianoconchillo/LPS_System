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
jest.setTimeout(15000);
describe("Consultar las pólizas de un Cliente", () => {
    // ##############
    // ## CAMINO 1 ##
    // ##############
    it("Debería fallar al obtener cliente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco cliente
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/416088034").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 2 ##
    // ##############
    it("Debería fallar al obtener pólizas con el ID del Cliente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco cliente
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/17950810").send();
        const cliente = res.body._id;
        // Busco Póliza con ID del Cliente
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cliente/${cliente}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Cliente sin Pólizas");
    }));
    // ##############
    // ## CAMINO 3 ##
    // ##############
    it("Debería obtener las Pólizas con el ID del Cliente correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco cliente
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;
        // Busco Póliza con ID del Cliente
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cliente/${cliente}`).send();
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toStrictEqual(true);
    }));
});
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
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
    // ##############
    // ## CAMINO 2 ##
    // ##############
    it("Debería fallar al obtener cliente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/416088034").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 3 - Error Patente ##
    // ##############
    it("Debería fallar al verificar póliza vigente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/000ZZZ").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 3 - Existe póliza vigente ##
    // ##############
    it("Debería fallar al verificar póliza vigente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/GAQ600").send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Ya existe póliza vigente para ese vehículo");
    }));
});
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
describe("Registrar Póliza - NO EXISTE NINGUNA PÓLIZA ASOCIADA A LA PATENTE", () => {
    // ##############
    // ## CAMINO 4 ##
    // ##############
    it("Debería fallar al verificar póliza vigente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/ABC123").send();
        // Verifico cuotas vencidas de cliente con su dni
        const dni = "21518853";
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/${dni}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", `El cliente ${dni} posee cuotas vencidas`);
    }));
    // ##############
    // ## CAMINO 5 ##
    // ##############
    it("Debería fallar al buscar coberturas por TipoVehículo", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/ABC123").send();
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco coberturas por TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get("/api/coberturas/Toyota/Corolla/Highline/2022").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 6 ##
    // ##############
    it("Debería fallar al registrar VehículoAsegurado", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/ABC123").send();
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco coberturas por TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();
        // Registro VehículoAsegurado
        const vehiculoAsegurado = {
            patente: "ABC123",
            color: "Negro",
            fotos: [],
            vehiculo: {
                marca: "Toyota",
                modelo: "Hilux",
                version: "SRV",
                año: "2025",
            },
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 7 ##
    // ##############
    it("Debería fallar al registrar Póliza", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        const productor = res.body._id;
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/41608803").send();
        const cliente = res.body._id;
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/ABC123").send();
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco coberturas por TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();
        const cobertura = res.body[0]._id;
        // Registro VehículoAsegurado
        let vehiculoAsegurado = {
            patente: "ABC123",
            color: "Negro",
            fotos: [],
            vehiculo: {
                marca: "Toyota",
                modelo: "Hilux",
                version: "SRV",
                año: "2007",
            },
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        vehiculoAsegurado = res.body;
        // Registro Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: "12345",
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
        // Elimino VehículoAsegurado
        yield (0, supertest_1.default)(app_1.app).delete(`/api/vehiculosAsegurados/${vehiculoAsegurado.patente}`);
    }));
    // ##############
    // ## CAMINO 8 ##
    // ##############
    it("Debería Registrar la Póliza correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        const productor = res.body._id;
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/41608803").send();
        const cliente = res.body._id;
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/ABC123").send();
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco coberturas por TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();
        const cobertura = res.body[0]._id;
        // Registro VehículoAsegurado
        let vehiculoAsegurado = {
            patente: "ABC123",
            color: "Negro",
            fotos: [],
            vehiculo: {
                marca: "Toyota",
                modelo: "Hilux",
                version: "SRV",
                año: "2007",
            },
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        const vehiculoAseguradoDB = res.body;
        // Registro Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: vehiculoAseguradoDB._id,
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/polizas").send(poliza);
        const polizaDB = res.body;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Póliza registrada correctamente");
        // Elimino VehículoAsegurado
        yield (0, supertest_1.default)(app_1.app).delete(`/api/vehiculosAsegurados/${vehiculoAsegurado.patente}`);
        // Elimino Póliza
        yield (0, supertest_1.default)(app_1.app).delete(`/api/polizas/${polizaDB.poliza.numeroPoliza}`);
    }));
});
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
describe("Registrar Póliza - HAY PÓLIZAS PERO NO ESTÁN VIGENTES", () => {
    // ##############
    // ## CAMINO 9 ##
    // ##############
    it("Debería fallar al verificar cuotas vencidas", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        // Verifico cuotas vencidas de cliente con su dni
        const dni = "21518853";
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/${dni}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", `El cliente ${dni} posee cuotas vencidas`);
    }));
    // ##############
    // ## CAMINO 10 ##
    // ##############
    it("Debería fallar al buscar el ID de TipoVehículo", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/vehiculosAsegurados/tipoVehiculo/asd`).send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 11 ##
    // ##############
    it("Debería fallar al buscar coberturas por ID de TipoVehículo", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();
        // Obtener coberturas por ID TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/coberturas/tipoVehiculo/asd`).send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 12 ##
    // ##############
    it("Debería fallar al registrar Póliza", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        const productor = res.body._id;
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();
        const tipoVehiculo = res.body.tipoVehiculo;
        // Obtener coberturas por ID TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`).send();
        const cobertura = res.body[0]._id;
        // Registrar Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: "12345",
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    }));
    // ##############
    // ## CAMINO 13 ##
    // ##############
    it("Debería registrar Póliza correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Busco productor
        let res = yield (0, supertest_1.default)(app_1.app).get("/api/productores/1").send();
        const productor = res.body._id;
        // Busco cliente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;
        // Verifico polizas del vehículo con su patente
        res = yield (0, supertest_1.default)(app_1.app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;
        // Verifico cuotas vencidas de cliente con su dni
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/polizas/cuotas-vencidas/41608803`).send();
        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();
        const tipoVehiculo = res.body.tipoVehiculo;
        // Obtener coberturas por ID TipoVehículo
        res = yield (0, supertest_1.default)(app_1.app).get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`).send();
        const cobertura = res.body[0]._id;
        // Registrar Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado,
        };
        res = yield (0, supertest_1.default)(app_1.app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Póliza registrada correctamente");
        // Elimino Póliza
        yield (0, supertest_1.default)(app_1.app).delete(`/api/polizas/${res.body.poliza.numeroPoliza}`);
    }));
});
//# sourceMappingURL=api.test.js.map