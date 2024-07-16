// Importaciones
import { Router } from "express";
const router = Router();
import { addUserToCurso, saveCurso } from "../controllers/curso.js";


//Rutas
router.post('/register', saveCurso);
router.post('/addcurso/:id', addUserToCurso);

// Exportar el Router
export default router;
