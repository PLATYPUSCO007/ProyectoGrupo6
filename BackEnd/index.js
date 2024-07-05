//Importaciones
import connection from "./database/connection.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import UserRoutes from './routes/user.js'

//Conexion BD
connection();

// Crear servidor de Node
const app = express();
const puerto = 3900;

// Configurar cors: permite que las peticiones se hagan correctamente
app.use(cors());

// Conversión de datos (body a objetos JS)
app.use(json());
app.use(urlencoded({extended: true}));

//Rutas
app.use('/api/user', UserRoutes);
/*app.use('/api/curso', )*/

// Configurar el servidor para escuchar las peticiones HTTP
app.listen(puerto, () => {
  console.log("Servidor de NODE corriendo en el puerto", puerto)
});