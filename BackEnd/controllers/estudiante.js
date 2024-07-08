import estudiante from "../models/estudiante.js";
import Estudiante from "../models/estudiante.js"
import User from "../models/user.js"



// Método para Registrar estudiante
export const register = async (req, res) => {
  try {
    // Recoger datos de la petición
    let params = req.body;

    // Obtener dato del body
    const { id_user } = req.user;

     // Verificar si el usuario a estudiante existe
    const idUser = await User.findById(id_user).select('id');

    if (!idUser) {
      return res.status(404).send({
        status: "error",
        message: "El usuario que intentas convertir a estudiante no existe"
      });
    }

    // Validaciones: verificamos que los datos obligatorios estén presentes
    if (!params.matricula || !params.codigo_actv || !params.estado || !params.supervisor ){
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    // Verificar si ya existe un estudiante con los mismos datos
    const existingEstudiante = await estudiante.findOne({
        id_user: params.userId.toLowerCase() 
    });

    if(existingEstudiante) {
      return res.status(400).send({
        status: "error",
        message: "Ya estás siguiendo a este usuario."
      });
    }

    // Crear una instancia del modelo User con los datos validados
    let estudiante_to_save = new Estudiante(params);

    // Agregar la información del usuario autenticado al objeto de la nueva publicación
    estudiante_to_save.id_user = req.user.idUser;

    // Guardar el usuario en la base de datos
    await estudiante_to_save.save();

    // Devolver respuesta exitosa y el usuario registrado
    return res.status(201).json({
      status: "created",
      message: "Estudiante registrado con éxito",
      user: {
        id: estudiante_to_save.user_id,
        estado: estudiante_to_save.estado
      }
    });

  } catch (error) {
    console.log("Error en registro de usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error en registro de usuarios"
    });
  }
}