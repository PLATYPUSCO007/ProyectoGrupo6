// Importaciones
import { Router } from "express";
const router = Router();
import { addUserToCurso, saveCurso, updateCurso } from "../controllers/curso.js";


//Rutas
router.post('/register', saveCurso);
router.post('/addcurso/:id', addUserToCurso);
router.post('/updatecurso/:id', updateCurso);

// Exportar el Router
export default router;
