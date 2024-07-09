// Importaciones
import { Router } from "express";
import { register, getAll } from "../controllers/estudiante.js";
import { ensureAuth } from "../middleware/auth.js";
const router = Router();

//Rutas
router.post('/register', register);
router.get('', ensureAuth, getAll);

// Exportar el Router
export default router;