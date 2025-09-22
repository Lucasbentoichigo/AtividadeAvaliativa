import express from "express";
import { getAllLivros, getLivrosById} from "./../controllers/livrosController.js";

const router = express.Router();

router.get("/", getAllLivros);
router.get("/:id", getLivrosById);

export default router;