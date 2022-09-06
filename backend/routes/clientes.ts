import { Router } from "express";
import { deleteCliente, getCliente, postCliente, putCliente } from "../controllers/clientes";

const router = Router();

router.get("/:dni", getCliente);
router.post("/", postCliente);
router.put("/:dni", putCliente);
router.delete("/:dni", deleteCliente);

export default router;