const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const server = "http://localhost:8000";

describe("Registrar Póliza", () => {
  // ##############
  // ## CAMINO 1 ##
  // ##############
  it("Debería fallar al obtener el productor", (done) => {
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
  it("Debería fallar al obtener el cliente", (done) => {
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
  // ## CAMINO 3 ##
  // ##############
  it("Debería fallar al obtener el cliente", (done) => {
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
                console.log(res.body);
                expect(res.body).to.be.a("object");
                expect(res).to.have.status(400);
              });
          });
      });
    done();
  });
});
