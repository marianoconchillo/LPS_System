"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productores_1 = require("../controllers/productores");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/productores/{numeroProductor}:
 *  get:
 *      tags: [Productor]
 *      summary: Retorna un productor.
 *      parameters:
 *      -   in: path
 *          name: numeroProductor
 *          required: true
 *      responses:
 *          200:
 *              description: Un productor.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: ObjectID del productor.
 *                              numeroProductor:
 *                                  type: integer
 *                                  description: número que identifica al productor.
 *                              sucursal:
 *                                  type: object
 *                                  description: datos de la sucursal donde trabaja.
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      numero:
 *                                          type: integer
 *                                      direccion:
 *                                          type: string
 *                                      localidad:
 *                                          type: object
 *                                          properties:
 *                                              nombre:
 *                                                  type: string
 *                                              provincia:
 *                                                  type: string
 *                                              CP:
 *                                                  type: string
 *                                              _id:
 *                                                  type: string
 *                              nombre:
 *                                  type: string
 *                                  description: nombre del productor.
 *                              apellido:
 *                                  type: string
 *                                  description: apellido del productor.
 *                              dni:
 *                                  type: string
 *                                  description: dni del productor.
 *                              email:
 *                                  type: string
 *                                  description: email del productor.
 *          400:
 *              description: No existe productor con ese número
 */
router.route("/").post(productores_1.postProductor);
router.route("/:numeroProductor")
    .get(productores_1.getProductor)
    .put(productores_1.putProductor)
    .delete(productores_1.deleteProductor);
exports.default = router;
//# sourceMappingURL=productores.js.map