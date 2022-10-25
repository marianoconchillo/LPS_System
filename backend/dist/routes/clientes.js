"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/clientes/{dni}:
 *  get:
 *      tags: [Cliente]
 *      summary: Retorna un cliente.
 *      parameters:
 *      -   in: path
 *          name: dni
 *          required: true
 *      responses:
 *          200:
 *              description: Un cliente.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: ObjectID del cliente.
 *                              fechaNacimiento:
 *                                  type: string
 *                                  description: fecha de nacimiento del cliente.
 *                              estadoCivil:
 *                                  type: string
 *                                  description: estado civil del cliente.
 *                              nombre:
 *                                  type: string
 *                                  description: nombre del cliente.
 *                              apellido:
 *                                  type: string
 *                                  description: apellido del cliente.
 *                              dni:
 *                                  type: string
 *                                  description: dni del cliente.
 *                              email:
 *                                  type: string
 *                                  description: email del cliente.
 *          400:
 *              description: No existe cliente con ese dni
 */
router.route("/").post(clientes_1.postCliente);
router.route("/:dni")
    .get(clientes_1.getCliente)
    .put(clientes_1.putCliente)
    .delete(clientes_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=clientes.js.map