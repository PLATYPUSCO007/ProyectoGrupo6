// Importaciones
import { Router } from "express";
const router = Router();
import { login, register, updateUser } from "../controllers/user.js";
import { ensureAuth } from "../middleware/auth.js";


//Rutas
router.post('/register', register);
router.post('/login', login);
router.put('/update', ensureAuth, updateUser);


// Exportar el Router
export default router;

