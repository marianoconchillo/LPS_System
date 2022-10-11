const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const server = "http://localhost:8000";

describe("Consultar las pólizas de un Cliente", () => {
  // ##############
  // ## CAMINO 1 ##
  // ##############
  it("Debería fallar al obtener cliente", (done) => {
    // Busco cliente
    chai
      .request(server)
      .get("/api/clientes/416088034")
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(400);
      });
    done();
  });

  // ##############
  // ## CAMINO 2 ##
  // ##############
  it("Debería fallar al obtener pólizas con el ID del Cliente", (done) => {
    // Busco cliente
    chai
      .request(server)
      .get("/api/clientes/17950810")
      .end((err, res) => {
        const cliente = res.body._id;
        // Busco Póliza con ID del Cliente
        chai
          .request(server)
          .get(`/api/polizas/cliente/${cliente}`)
          .end((err, res) => {
            expect(res.body).to.be.a("object");
            expect(res.body)
              .to.have.property("msg")
              .equal("Cliente sin Pólizas");
            expect(res).to.have.status(200);
          });
      });
    done();
  });

  // ##############
  // ## CAMINO 3 ##
  // ##############
  it("Debería obtener las Pólizas con el ID del Cliente correctamente", (done) => {
    // Busco cliente
    chai
      .request(server)
      .get("/api/clientes/21518853")
      .end((err, res) => {
        const cliente = res.body._id;
        // Busco Póliza con ID del Cliente
        chai
          .request(server)
          .get(`/api/polizas/cliente/${cliente}`)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res).to.have.status(200);
          });
      });
    done();
  });
});
