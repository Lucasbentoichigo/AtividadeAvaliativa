import express from "express";
import { getAllLivros} from "./../controllers/livrosController.js";

const router = express.Router();

router.get("/", getAllLivros);


export default router;