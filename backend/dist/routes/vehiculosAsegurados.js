"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculosAsegurados_1 = require("../controllers/vehiculosAsegurados");
const router = (0, express_1.Router)();
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
router.route("/").post(vehiculosAsegurados_1.postVehiculoAsegurado);
router.route("/:patente")
    .get(vehiculosAsegurados_1.getVehiculoAsegurado)
    .put(vehiculosAsegurados_1.putVehiculoAsegurado)
    .delete(vehiculosAsegurados_1.deleteVehiculoAsegurado);
router.route("/tipoVehiculo/:id")
    .get(vehiculosAsegurados_1.getIDTipoVehiculoByID);
exports.default = router;
//# sourceMappingURL=vehiculosAsegurados.js.map