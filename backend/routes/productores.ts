import { Router } from "express";
import { deleteProductor, getProductor, postProductor, putProductor } from "../controllers/productores";

const router = Router();

router.get("/:numeroProductor", getProductor);
router.post("/", postProductor);
router.put("/:numeroProductor", putProductor);
router.delete("/:numeroProductor", deleteProductor);

export default router;