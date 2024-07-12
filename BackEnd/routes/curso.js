// Importaciones
import { Router } from "express";
const router = Router();
import { saveCurso } from "../controllers/curso.js";


//Rutas
router.post('/register', saveCurso);

// Exportar el Router
export default router;
