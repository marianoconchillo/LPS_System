"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polizas_1 = require("../controllers/polizas");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/polizas/vehiculoAsegurado/{patenteNueva}:
 *  get:
 *      tags: [Póliza]
 *      summary: Retorna información de patente asociada a póliza.
 *      parameters:
 *      -   in: path
 *          name: patenteNueva
 *          required: true
 *      responses:
 *          200:
 *              description: Mensaje sin pólizas asociadas.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Vehículo {patente} sin pólizas asociadas.
 *                                  example: Vehículo LLD399 sin pólizas asociadas
 */
/**
 * @swagger
 * /api/polizas/vehiculoAsegurado/{patente}:
 *  get:
 *      tags: [Póliza]
 *      summary: Retorna información de patente asociada a póliza.
 *      parameters:
 *      -   in: path
 *          name: patente
 *          required: true
 *      responses:
 *          200:
 *              description: Mensaje de póliza vigente asociada.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Ya existe póliza vigente para ese vehículo.
 */
/**
 * @swagger
 * /api/polizas/cuotas-vencidas/{dniAsegurado}:
 *  get:
 *      tags: [Póliza]
 *      summary: Retorna información sobre el estado de cuotas del cliente.
 *      parameters:
 *      -   in: path
 *          name: dniAsegurado
 *          required: true
 *      responses:
 *          200:
 *              description: Mensaje de cuotas vencidas.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: El cliente {dniAsegurado} posee cuotas vencidas.
 *                                  example: El cliente {dniAsegurado} posee cuotas vencidas.
 *                              cuotasVencidas:
 *                                  type: array
 *                                  description: Arreglo con información de cuotas vencidas.
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          numero:
 *                                              type: integer
 *                                              description: número de cuota
 *                                              example: 1
 *                                          fecha:
 *                                              type: string
 *                                              description: fecha de vencimiento de cuota
 *                                              example: 2022-09-23T00:00:00.000Z
 *                                          importe:
 *                                              type: string
 *                                              description: importe de cuota
 *                                              example: 2500
 *                                          estado:
 *                                              type: string
 *                                              description: estado de cuota
 *                                              example: Vencida
 *                                          _id:
 *                                              type: string
 *                                              description: ObjectID que identifica a la cuota
 *                                              example: 6349c99968e3e0e1dc084bec
 */
/**
 * @swagger
 * /api/polizas/cuotas-vencidas/{dni}:
 *  get:
 *      tags: [Póliza]
 *      summary: Retorna información sobre el estado de cuotas del cliente.
 *      parameters:
 *      -   in: path
 *          name: dni
 *          required: true
 *      responses:
 *          200:
 *              description: Mensaje de que el asegurado no tiene cuotas vencidas.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Asegurado {dni} no tiene cuotas vencidas.
 *                                  example: Asegurado 41608803 no tiene cuotas vencidas.
 */
router.route("/")
    .post(polizas_1.postPoliza);
router.route("/:numeroPoliza")
    .get(polizas_1.getPoliza)
    .delete(polizas_1.deletePoliza);
router.route("/cuotas-vencidas/:dni")
    .get(polizas_1.verificarCuotasVencidas);
router.route("/cliente/:id")
    .get(polizas_1.getPolizasByIdCliente);
router.route("/vehiculoAsegurado/:patente")
    .get(polizas_1.verificarPolizasVigentesByPatente);
exports.default = router;
//# sourceMappingURL=polizas.js.map