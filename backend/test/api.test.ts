import request from "supertest";
import { app } from "../app";

jest.setTimeout(15000);

describe("Consultar las pólizas de un Cliente", () => {

    // ##############
    // ## CAMINO 1 ##
    // ##############
    it("Debería fallar al obtener cliente", async () => {
        // Busco cliente
        const res = await request(app).get("/api/clientes/416088034").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 2 ##
    // ##############
    it("Debería fallar al obtener pólizas con el ID del Cliente", async () => {
        // Busco cliente
        let res = await request(app).get("/api/clientes/17950810").send();
        const cliente = res.body._id;

        // Busco Póliza con ID del Cliente
        res = await request(app).get(`/api/polizas/cliente/${cliente}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Cliente sin Pólizas");
    });

    // ##############
    // ## CAMINO 3 ##
    // ##############
    it("Debería obtener las Pólizas con el ID del Cliente correctamente", async () => {
        // Busco cliente
        let res = await request(app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;

        // Busco Póliza con ID del Cliente
        res = await request(app).get(`/api/polizas/cliente/${cliente}`).send();
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toStrictEqual(true);
    });

});

// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //

describe("Registrar Póliza - Camino Común", () => {

    // ##############
    // ## CAMINO 1 ##
    // ##############
    it("Debería fallar al obtener productor", async () => {
        // Busco productor
        const res = await request(app).get("/api/productores/99a").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 2 ##
    // ##############
    it("Debería fallar al obtener cliente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/416088034").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 3 - Error Patente ##
    // ##############
    it("Debería fallar al verificar póliza vigente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/000ZZZ").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 3 - Existe póliza vigente ##
    // ##############
    it("Debería fallar al verificar póliza vigente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/GAQ600").send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Ya existe póliza vigente para ese vehículo");
    });
});

// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //

describe("Registrar Póliza - NO EXISTE NINGUNA PÓLIZA ASOCIADA A LA PATENTE", () => {
    // ##############
    // ## CAMINO 4 ##
    // ##############
    it("Debería fallar al verificar póliza vigente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/ABC123").send();

        // Verifico cuotas vencidas de cliente con su dni
        const dni = "21518853";
        res = await request(app).get(`/api/polizas/cuotas-vencidas/${dni}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", `El cliente ${dni} posee cuotas vencidas`);
    });

    // ##############
    // ## CAMINO 5 ##
    // ##############
    it("Debería fallar al buscar coberturas por TipoVehículo", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/ABC123").send();

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco coberturas por TipoVehículo
        res = await request(app).get("/api/coberturas/Toyota/Corolla/Highline/2022").send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 6 ##
    // ##############
    it("Debería fallar al registrar VehículoAsegurado", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/ABC123").send();

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco coberturas por TipoVehículo
        res = await request(app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();

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
        res = await request(app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 7 ##
    // ##############
    it("Debería fallar al registrar Póliza", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();
        const productor = res.body._id;

        // Busco cliente
        res = await request(app).get("/api/clientes/41608803").send();
        const cliente = res.body._id;

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/ABC123").send();

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco coberturas por TipoVehículo
        res = await request(app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();
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

        res = await request(app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        vehiculoAsegurado = res.body;

        // Registro Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: "12345",
        };

        res = await request(app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");

        // Elimino VehículoAsegurado
        await request(app).delete(`/api/vehiculosAsegurados/${vehiculoAsegurado.patente}`)

    });

    // ##############
    // ## CAMINO 8 ##
    // ##############
    it("Debería Registrar la Póliza correctamente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();
        const productor = res.body._id;

        // Busco cliente
        res = await request(app).get("/api/clientes/41608803").send();
        const cliente = res.body._id;

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/ABC123").send();

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco coberturas por TipoVehículo
        res = await request(app).get("/api/coberturas/Toyota/Hilux/SRV/2007").send();
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

        res = await request(app).post("/api/vehiculosAsegurados").send(vehiculoAsegurado);
        const vehiculoAseguradoDB = res.body;

        // Registro Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: vehiculoAseguradoDB._id,
        };

        res = await request(app).post("/api/polizas").send(poliza);
        const polizaDB = res.body;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Póliza registrada correctamente");

        // Elimino VehículoAsegurado
        await request(app).delete(`/api/vehiculosAsegurados/${vehiculoAsegurado.patente}`)

        // Elimino Póliza
        await request(app).delete(`/api/polizas/${polizaDB.poliza.numeroPoliza}`)

    });
});

// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
describe("Registrar Póliza - HAY PÓLIZAS PERO NO ESTÁN VIGENTES", () => {
    // ##############
    // ## CAMINO 9 ##
    // ##############
    it("Debería fallar al verificar cuotas vencidas", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/PGD000").send();

        // Verifico cuotas vencidas de cliente con su dni
        const dni = "21518853";
        res = await request(app).get(`/api/polizas/cuotas-vencidas/${dni}`).send();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", `El cliente ${dni} posee cuotas vencidas`);
    });

    // ##############
    // ## CAMINO 10 ##
    // ##############
    it("Debería fallar al buscar el ID de TipoVehículo", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/PGD000").send();

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = await request(app).get(`/api/vehiculosAsegurados/tipoVehiculo/asd`).send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 11 ##
    // ##############
    it("Debería fallar al buscar coberturas por ID de TipoVehículo", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = await request(app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();

        // Obtener coberturas por ID TipoVehículo
        res = await request(app).get(`/api/coberturas/tipoVehiculo/asd`).send();
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 12 ##
    // ##############
    it("Debería fallar al registrar Póliza", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();
        const productor = res.body._id;

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = await request(app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();
        const tipoVehiculo = res.body.tipoVehiculo;

        // Obtener coberturas por ID TipoVehículo
        res = await request(app).get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`).send();
        const cobertura = res.body[0]._id;

        // Registrar Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado: "12345",
        };

        res = await request(app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    // ##############
    // ## CAMINO 13 ##
    // ##############
    it("Debería registrar Póliza correctamente", async () => {
        // Busco productor
        let res = await request(app).get("/api/productores/1").send();
        const productor = res.body._id;

        // Busco cliente
        res = await request(app).get("/api/clientes/21518853").send();
        const cliente = res.body._id;

        // Verifico polizas del vehículo con su patente
        res = await request(app).get("/api/polizas/vehiculoAsegurado/PGD000").send();
        const vehiculoAsegurado = res.body.polizaAntigua.vehiculoAsegurado;

        // Verifico cuotas vencidas de cliente con su dni
        res = await request(app).get(`/api/polizas/cuotas-vencidas/41608803`).send();

        // Busco ID TipoVehículo con ID VehículoAsegurado
        res = await request(app).get(`/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`).send();
        const tipoVehiculo = res.body.tipoVehiculo;

        // Obtener coberturas por ID TipoVehículo
        res = await request(app).get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`).send();
        const cobertura = res.body[0]._id;

        // Registrar Póliza
        const poliza = {
            productor,
            cliente,
            cobertura,
            vehiculoAsegurado,
        };

        res = await request(app).post("/api/polizas").send(poliza);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("msg", "Póliza registrada correctamente");

        // Elimino Póliza
        await request(app).delete(`/api/polizas/${res.body.poliza.numeroPoliza}`)
    });

});