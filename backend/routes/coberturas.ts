import { Router } from "express";
import { deleteCobertura, getCobertura, postCobertura, putCobertura } from "../controllers/coberturas";

const router = Router();

router.get("/:codigoCobertura", getCobertura);
router.post("/", postCobertura);
router.put("/:codigoCobertura", putCobertura);
router.delete("/:codigoCobertura", deleteCobertura);

export default router;