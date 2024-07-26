// Importaciones
import { Router } from "express";
const router = Router();
import { login, register, updateUser, listUsers } from "../controllers/user.js";
import { ensureAuth } from "../middleware/auth.js";


//Rutas
router.post('/register', ensureAuth, register);
router.post('/login', login);
router.get('/list/:page', ensureAuth, listUsers);
router.put('/update/:id', ensureAuth, updateUser);


// Exportar el Router
export default router;

