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
    chai
      .request(server)
      .get("/api/productores/99a")
      .end((err, res) => {
        // console.log(res.body);
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(400);
      });
    done();
  });

  // ##############
  // ## CAMINO 2 ##
  // ##############
  it("Debería fallar al obtener cliente", (done) => {
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        chai
          .request(server)
          .get("/api/clientes/416088034")
          .end((err, res) => {
            // console.log(res.body);
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
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/000ZZZ")
              .end((err, res) => {
                // console.log(res.body);
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
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ600")
              .end((err, res) => {
                // console.log(res.body);
                expect(res.body).to.be.a("object");
                expect(res).to.have.status(400);
              });
          });
      });
    done();
  });
});

describe("Registrar Póliza - NO EXISTE NINGUNA PÓLIZA ASOCIADA A LA PATENTE", () => {
  // ##############
  // ## CAMINO 4 ##
  // ##############
  it("Debería fallar al verificar cuotas vencidas", (done) => {
    chai
      .request(server)
      .get("/api/productores/1")
      .end((err, res) => {
        chai
          .request(server)
          .get("/api/clientes/21518853")
          .end((err, res) => {
            chai
              .request(server)
              .get("/api/polizas/vehiculoAsegurado/GAQ601")
              .end((err, res) => {
                // *** COMPLETAR ***
              });
          });
      });
    done();
  });
});
