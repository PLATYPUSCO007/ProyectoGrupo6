import { connect } from "mongoose";

/*const URL_LOCAL = 'mongodb://localhost:27017/bd_aprendizajeenlinea';
const URL_NUBE = 'mongodb+srv://Ricardo:PruebaMongo2024@cluster0.77fg4.azure.mongodb.net/bd_aprendizajeenlinea';*/
 
const connection = async() => {
    try{
        //await connect(URL_NUBE);
        await connect("mongodb://localhost:27017/bd_aprendizajeenlinea");
        console.log("Conectado correctamente ala BD");
    } catch (error) {
        console.error("Error al conectar a la base");
        throw new error("No se pudo conectar a la base de datos");
    }
}

export default connection;