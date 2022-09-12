import { Router } from "express";
import { deleteCliente, getCliente, postCliente, putCliente } from "../controllers/clientes";

const router = Router();

router.route("/").post(postCliente);

router.route("/:dni")
    .get(getCliente)
    .put(putCliente)
    .delete(deleteCliente);

export default router;