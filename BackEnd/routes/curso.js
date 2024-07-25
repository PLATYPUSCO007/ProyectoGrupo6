// Importaciones
import { Router } from "express";
const router = Router();
import { addUserToCurso, saveCurso, updateCurso } from "../controllers/curso.js";
import { ensureAuth } from "../middleware/auth.js";


//Rutas
router.post('/register',ensureAuth, saveCurso);
router.post('/addcurso/:id',ensureAuth, addUserToCurso);
router.post('/updatecurso/:id',ensureAuth, updateCurso);

// Exportar el Router
export default router;
