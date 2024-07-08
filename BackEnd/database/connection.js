import { connect } from "mongoose";
 
const connection = async() => {
    try{
        await connect("mongodb://localhost:27017/bd_aprendizajeenlinea");
        console.log("Conectado correctamente ala BD");
    } catch (error) {
        console.error("Error al conectar a la base");
        throw new error("No se pudo conectar a la base de datos");
    }
}

export default connection;