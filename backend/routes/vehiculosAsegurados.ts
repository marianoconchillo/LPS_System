import { Router } from "express";
import { deleteVehiculoAsegurado, getIDTipoVehiculoByID, getVehiculoAsegurado, postVehiculoAsegurado, putVehiculoAsegurado } from "../controllers/vehiculosAsegurados";

const router = Router();

/**
 * @swagger
 * /api/vehiculosAsegurados/tipoVehiculo/{idVehiculoAsegurado}:
 *  get:
 *      tags: [Vehículo Asegurado]
 *      summary: Retorna el ID de un Tipo Vehículo.
 *      parameters:
 *      -   in: path
 *          name: idVehiculoAsegurado
 *          required: true
 *      responses:
 *          200:
 *              description: ID de un Tipo Vehículo.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: ObjectID de TipoVehiculo.
 *          400:
 *              description: No se pudo encontrar Vehículo Asegurado
 */

router.route("/").post(postVehiculoAsegurado)

router.route("/:patente")
    .get(getVehiculoAsegurado)
    .put(putVehiculoAsegurado)
    .delete(deleteVehiculoAsegurado);

router.route("/tipoVehiculo/:id")
    .get(getIDTipoVehiculoByID);

export default router;