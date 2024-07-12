import curso from "../models/curso.js"
import fs from "fs";
import path from "path";


// Método para hacer una publicación
export const saveCurso = async (req, res) => {
  try {
    // Obtener datos del body
    const params = req.body;

   // Verificar que llegue desde el body el parámetro text con su información
      if (
        !params.titulo ||
        !params.descripcion 
          ) {
            return res.status(400).json({
              status: "error",
              message: "Faltan datos por crear el curso",
            });
          }

     // Desestructurar datos de usuario
     const { id_usuario, titulo, categoria, descripcion, duracion, imagen } = params;
      
     const cursoData = {
       id_usuario: id_usuario,
       titulo: titulo,
       categoria: categoria,
       descripcion: descripcion,
       duracion: duracion,
       imagen: imagen
     };

    // Crear objeto 
    let newCurso = new Curso(cursoData);

     // Buscar si ya existe un usuario con el mismo email o nick
     const existingCurso = await User.findOne({
      $or: [
        { titulo: newCurso.titulo.toLowerCase() }
      ],
    });

    // Si encuentra un curso, devuelve un mensaje indicando que ya existe
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "!El titulo del curso ya existe!",
      });
    }

    // Verificar si se guardó correctamente en la BD
    if(!newCurso) {
      return res.status(500).send({
        status: "error",
        message: "No se ha podido guardar el curso."
      });
    }

  } catch (error) {
    console.log("Error al crear la publicación:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al crear el curso"
    });
  }
}

