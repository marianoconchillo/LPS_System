import { Router } from "express";
import { getCliente } from "../controllers/clientes";

const router = Router();

router.get("/:dni", getCliente);

export default router;