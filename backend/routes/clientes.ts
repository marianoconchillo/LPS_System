import { Router } from "express";
import { getCliente } from "../controllers/clientes";

const router = Router();

router.get("/:id", getCliente);

export default router;