const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const server = "http://localhost:8000";

describe("Registrar Póliza - Camino Común", () => {
  // ##############
  // ## CAMINO 1 ##
  // ##############
  it("Debería fallar al obtener productor", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/99a")
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(400);
      });
    done();
  });

  // ##############
  // ## CAMINO 2 ##
  // ##############
  it("Debería fallar al obtener cliente", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/416088034")
          .end((err, res) => {
            expect(res.body).to.be.a("object");
            expect(res).to.have.status(400);
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 3 - Error Patente ##
  // ##############
  it("Debería fallar al obtener póliza", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/000ZZZ")
              .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res).to.have.status(400);
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 3 - Existe póliza vigente ##
  // ##############
  it("Debería fallar al verificar póliza vigente", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ600")
              .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body)
                  .to.have.property("msg")
                  .equal("Ya existe póliza vigente para ese vehículo");
                expect(res).to.have.status(200);
              });
          });
      });
    done();
  });
});

// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //

describe("Registrar Póliza - NO EXISTE NINGUNA PÓLIZA ASOCIADA A LA PATENTE", () => {
  // ##############
  // ## CAMINO 4 ##
  // ##############
  it("Debería fallar al verificar cuotas vencidas", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/21518853")
                  .end((err, res) => {
                    const dni = "21518853";
                    expect(res.body).to.be.a("object");
                    expect(res.body)
                      .to.have.property("msg")
                      .equal(`El cliente ${dni} posee cuotas vencidas`);
                    expect(res).to.have.status(200);
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 5 ##
  // ##############
  it("Debería fallar al buscar coberturas por TipoVehículo", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // Verifico cuotas vencidas del cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco coberturas por TipoVehículo
                    chai
                      .request(server)
                      .get("/api/coberturas/Toyota/Corolla/Highline/2022")
                      .end((err, res) => {
                        expect(res.body).to.be.a("object");
                        expect(res).to.have.status(400);
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 6 ##
  // ##############
  it("Debería fallar al registrar VehículoAsegurado", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // Verifico cuotas vencidas con dni de cliente
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco coberturas por TipoVehículo
                    chai
                      .request(server)
                      .get("/api/coberturas/Toyota/Hilux/SRV/2007")
                      .end((err, res) => {
                        // Registro VehículoAsegurado
                        const vehiculoAsegurado = {
                          patente: "GAQ601",
                          color: "Negro",
                          fotos: [],
                          vehiculo: {
                            marca: "Toyota",
                            modelo: "Hilux",
                            version: "SRV",
                            año: "2025",
                          },
                        };
                        chai
                          .request(server)
                          .post("/api/vehiculosAsegurados")
                          .send(vehiculoAsegurado)
                          .end((err, res) => {
                            expect(res.body).to.be.a("object");
                            expect(res).to.have.status(400);
                          });
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 7 ##
  // ##############
  it("Debería fallar al registrar Póliza", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        const productor = res.body._id;
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/41608803")
          .end((err, res) => {
            const cliente = res.body._id;
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // Verifico cuotas vencidas con dni de cliente
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco coberturas por TipoVehículo
                    chai
                      .request(server)
                      .get("/api/coberturas/Toyota/Hilux/SRV/2007")
                      .end((err, res) => {
                        const cobertura = res.body[0]._id;
                        // Registro VehículoAsegurado
                        const vehiculoAsegurado = {
                          patente: "GAQ603",
                          color: "Negro",
                          fotos: [],
                          vehiculo: {
                            marca: "Toyota",
                            modelo: "Hilux",
                            version: "SRV",
                            año: "2007",
                          },
                        };
                        chai
                          .request(server)
                          .post("/api/vehiculosAsegurados")
                          .send(vehiculoAsegurado)
                          .end((err, res) => {
                            const vehiculoAsegurado = res.body._id;
                            // Registro Póliza
                            const poliza = {
                              productor,
                              cliente,
                              cobertura,
                              vehiculoAsegurado: "12345",
                            };
                            chai
                              .request(server)
                              .post("/api/polizas")
                              .send(poliza)
                              .end((err, res) => {
                                expect(res.body).to.be.a("object");
                                expect(res).to.have.status(400);
                              });
                          });
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 8 ##
  // ##############
  it("Debería Registrar la Póliza correctamente", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        const productor = res.body._id;
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/41608803")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            const cliente = res.body._id;
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // Verifico cuotas vencidas con dni de cliente
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco coberturas por TipoVehículo
                    chai
                      .request(server)
                      .get("/api/coberturas/Toyota/Hilux/SRV/2007")
                      .end((err, res) => {
                        const cobertura = res.body[0]._id;
                        // Registro VehículoAsegurado
                        const vehiculoAsegurado = {
                          patente: "GAQ601",
                          color: "Negro",
                          fotos: [],
                          vehiculo: {
                            marca: "Toyota",
                            modelo: "Hilux",
                            version: "SRV",
                            año: "2007",
                          },
                        };
                        chai
                          .request(server)
                          .post("/api/vehiculosAsegurados")
                          .send(vehiculoAsegurado)
                          .end((err, res) => {
                            const vehiculoAsegurado = res.body._id;
                            // Registro Póliza
                            const poliza = {
                              productor,
                              cliente,
                              cobertura,
                              vehiculoAsegurado,
                            };
                            chai
                              .request(server)
                              .post("/api/polizas")
                              .send(poliza)
                              .end((err, res) => {
                                expect(res.body)
                                  .to.have.property("msg")
                                  .equal(`Póliza registrada correctamente`);
                                expect(res.body).to.be.a("object");
                                expect(res).to.have.status(200);
                              });
                          });
                      });
                  });
              });
          });
      });
    done();
  });
});

// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------- //

describe.only("Registrar Póliza - HAY PÓLIZAS PERO NO ESTÁN VIGENTES", () => {
  // ##############
  // ## CAMINO 9 ##
  // ##############
  it("Debería fallar al verificar cuotas vencidas", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/LLD399")
              .end((err, res) => {
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/21518853")
                  .end((err, res) => {
                    const dni = "21518853";
                    expect(res.body).to.be.a("object");
                    expect(res.body)
                      .to.have.property("msg")
                      .equal(`El cliente ${dni} posee cuotas vencidas`);
                    expect(res).to.have.status(200);
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 10 ##
  // ##############
  it("Debería fallar al buscar el ID de TipoVehículo", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/LLD399")
              .end((err, res) => {
                const vehiculoAsegurado =
                  res.body.polizaAntigua.vehiculoAsegurado;
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco ID TipoVehículo con ID VehículoAsegurado
                    chai
                      .request(server)
                      .get("/api/vehiculosAsegurados/tipoVehiculo/asd")
                      .end((err, res) => {
                        expect(res.body).to.be.a("object");
                        expect(res).to.have.status(400);
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 11 ##
  // ##############
  it("Debería fallar al buscar coberturas por ID de TipoVehículo", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/LLD399")
              .end((err, res) => {
                const vehiculoAsegurado =
                  res.body.polizaAntigua.vehiculoAsegurado;
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco ID TipoVehículo con ID VehículoAsegurado
                    chai
                      .request(server)
                      .get(
                        `/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`
                      )
                      .end((err, res) => {
                        // Obtener coberturas por ID TipoVehículo
                        chai
                          .request(server)
                          .get("/api/coberturas/tipoVehiculo/asd")
                          .end((err, res) => {
                            expect(res.body).to.be.a("object");
                            expect(res).to.have.status(400);
                          });
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 12 ##
  // ##############
  it("Debería fallar al registrar Póliza", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        const productor = res.body._id;
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            const cliente = res.body._id;
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/LLD399")
              .end((err, res) => {
                const vehiculoAsegurado =
                  res.body.polizaAntigua.vehiculoAsegurado;
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco ID TipoVehículo con ID VehículoAsegurado
                    chai
                      .request(server)
                      .get(
                        `/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`
                      )
                      .end((err, res) => {
                        const tipoVehiculo = res.body.tipoVehiculo;
                        // Obtener coberturas por ID TipoVehículo
                        chai
                          .request(server)
                          .get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`)
                          .end((err, res) => {
                            const cobertura = res.body[0]._id;
                            // Registrar Póliza
                            const poliza = {
                              productor,
                              cliente,
                              cobertura,
                              vehiculoAsegurado: "12345",
                            };
                            chai
                              .request(server)
                              .post("/api/polizas")
                              .send(poliza)
                              .end((err, res) => {
                                expect(res.body).to.be.a("object");
                                expect(res).to.have.status(400);
                              });
                          });
                      });
                  });
              });
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 13 ##
  // ##############
  it("Debería registrar Póliza correctamente", (done) => {
    // Busco productor
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        const productor = res.body._id;
        // Busco cliente
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            const cliente = res.body._id;
            // Verifico polizas del vehículo con su patente
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/LLD399")
              .end((err, res) => {
                const vehiculoAsegurado =
                  res.body.polizaAntigua.vehiculoAsegurado;
                // Verifico cuotas vencidas de cliente con su dni
                chai
                  .request(server)
                  .get("/api/polizas/cuotas-vencidas/41608803")
                  .end((err, res) => {
                    // Busco ID TipoVehículo con ID VehículoAsegurado
                    chai
                      .request(server)
                      .get(
                        `/api/vehiculosAsegurados/tipoVehiculo/${vehiculoAsegurado}`
                      )
                      .end((err, res) => {
                        const tipoVehiculo = res.body.tipoVehiculo;
                        // Obtener coberturas por ID TipoVehículo
                        chai
                          .request(server)
                          .get(`/api/coberturas/tipoVehiculo/${tipoVehiculo}`)
                          .end((err, res) => {
                            const cobertura = res.body[0]._id;
                            // Registrar Póliza
                            const poliza = {
                              productor,
                              cliente,
                              cobertura,
                              vehiculoAsegurado,
                            };
                            chai
                              .request(server)
                              .post("/api/polizas")
                              .send(poliza)
                              .end((err, res) => {
                                expect(res.body)
                                  .to.have.property("msg")
                                  .equal(`Póliza registrada correctamente`);
                                expect(res.body).to.be.a("object");
                                expect(res).to.have.status(200);
                              });
                          });
                      });
                  });
              });
          });
      });
    done();
  });
});
