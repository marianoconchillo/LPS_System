import { Router } from "express";
import { deleteProductor, getProductor, postProductor, putProductor } from "../controllers/productores";

const router = Router();

router.route("/").post(postProductor);

router.route("/:numeroProductor")
    .get(getProductor)
    .put(putProductor)
    .delete(deleteProductor);

export default router;