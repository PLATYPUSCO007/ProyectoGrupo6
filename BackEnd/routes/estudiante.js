// Importaciones
import { Router } from "express";
import { register } from "../controllers/estudiante.js";
const router = Router();

//Rutas
router.post('/register', register);

// Exportar el Router
export default router;