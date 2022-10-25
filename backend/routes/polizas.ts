import { Router } from "express";
import { verificarCuotasVencidas, getPoliza, verificarPolizasVigentesByPatente, getPolizasByIdCliente, postPoliza, deletePoliza } from "../controllers/polizas";

const router = Router();

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
    .post(postPoliza);


router.route("/:numeroPoliza")
    .get(getPoliza)
    .delete(deletePoliza);

router.route("/cuotas-vencidas/:dni")
    .get(verificarCuotasVencidas);

router.route("/cliente/:id")
    .get(getPolizasByIdCliente);

router.route("/vehiculoAsegurado/:patente")
    .get(verificarPolizasVigentesByPatente);

export default router;