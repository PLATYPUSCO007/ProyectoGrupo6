// Importaciones
import { Router } from "express";
const router = Router();
import { addUserToCurso, saveCurso, updateCurso, getCursos, uploadFile, getFile } from "../controllers/curso.js";
import FileMiddleware from "../middleware/File.middleware.js";

//Rutas
router.post('/register', saveCurso);
router.post('/addcurso/:id', addUserToCurso);
router.put('/update/:id', updateCurso);
router.get('/list/:page', getCursos);
router.post('/file/:id', FileMiddleware, uploadFile);
router.get('/file/:nameFile', getFile);

// Exportar el Router
export default router;
