import { Router } from "express";
import {
  getLivros,
  getLivroPorId,
  postLivro,
  putLivro,
  deleteLivro,
} from "../controllers/livrosController";

const router = Router();

router.get("/", getLivros);
router.get("/:id", getLivroPorId);
router.post("/", postLivro);
router.put("/:id", putLivro);
router.delete("/:id", deleteLivro);

export default router;
