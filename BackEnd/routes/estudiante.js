// Importaciones
import { Router } from "express";
import { register, getAll } from "../controllers/estudiante.js";
const router = Router();

//Rutas
router.post('/register', register);
router.get('', getAll);

// Exportar el Router
export default router;