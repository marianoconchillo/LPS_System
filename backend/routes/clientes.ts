import { Router } from "express";
import { deleteCliente, getCliente, postCliente, putCliente } from "../controllers/clientes";

const router = Router();

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

router.route("/").post(postCliente);

router.route("/:dni")
    .get(getCliente)
    .put(putCliente)
    .delete(deleteCliente);

export default router;