import express from "express";
import { getAllLivros, getLivrosById, createLivros, deleteLivros, updateLivro} from "./../controllers/livrosController.js";

const router = express.Router();

router.get("/", getAllLivros);
router.get("/:id", getLivrosById);
router.post("/", createLivros );
router.delete("/:id", deleteLivros);
router.put("/:id", updateLivro);

export default router;