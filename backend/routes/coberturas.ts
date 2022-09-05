import { Router } from "express";
import { getCobertura } from "../controllers/coberturas";

const router = Router();

router.get("/:codigoCobertura", getCobertura);

export default router;