// Importaciones
import { Router } from "express";
const router = Router();
import { addUserToCurso, saveCurso, updateCurso, getCursos } from "../controllers/curso.js";


//Rutas
router.post('/register', saveCurso);
router.post('/addcurso/:id', addUserToCurso);
router.put('/update/:id', updateCurso);
router.get('/list/:page', getCursos);

// Exportar el Router
export default router;
