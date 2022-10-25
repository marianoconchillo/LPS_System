import { Router } from "express";
import { deleteProductor, getProductor, postProductor, putProductor } from "../controllers/productores";

const router = Router();

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

router.route("/").post(postProductor);

router.route("/:numeroProductor")
    .get(getProductor)
    .put(putProductor)
    .delete(deleteProductor);

export default router;