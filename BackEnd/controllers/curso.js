import Curso from "../models/curso.js"


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
    const existingCurso = await Curso.findOne({
      $or: [
        { titulo: newCurso.titulo.toLowerCase() }
      ],
    });

    // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
    if (existingCurso) {
      return res.status(409).json({
        status: "error",
        message: "!El curso ya existe!",
      });
    }

    // Guardar el curso en la base de datos
    await newCurso.save();
    
    // Verificar si se guardó correctamente en la BD
    if(!newCurso) {
      return res.status(500).send({
        status: "error",
        message: "No se ha podido guardar el curso."
      });
    }

    // Devolver respuesta exitosa y el usuario registrado
    return res.status(201).json({
      status: "created",
      message: "Curso agregado con éxito",
      user: {
        id: newCurso.id,
        titulo: newCurso.titulo,
        categoria: newCurso.categoria,
        descripcion: newCurso.descripcion,
        duracion: newCurso.duracion,
        imagen: newCurso.imagen
      },
    });

  } catch (error) {
    console.log("Error al crear la publicación:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al crear el curso" 
    });
  }
}

export const updateCurso = async (req, res) => {
  try {
    // Recoger información del curso a actualizar
    let cursoId = req.params.id;
    let cursoToUpdate = req.body;

    // Validar que los campos necesarios estén presentes
    if (!cursoToUpdate.titulo) {
      return res.status(400).send({
        status: "error",
        message: "¡El campo título son requeridos!",
      });
    }

    // Eliminar campos sobrantes
    delete cursoToUpdate.iat;
    delete cursoToUpdate.exp;

    // Comprobar si el curso ya existe con el mismo título
    const cursos = await Curso.find({
      $or: [
        { titulo: cursoToUpdate.titulo.toLowerCase() }
      ],
    }).exec();

    // Buscar y Actualizar el curso a modificar en la BD
    let cursoUpdated = await Curso.findByIdAndUpdate(
      cursoId,
      cursoToUpdate,
      { new: true },
    );

    if (!cursoUpdated) {
      return res.status(400).send({
        status: "error",
        message: "Error al actualizar el curso",
      });
    }

    // Devolver respuesta exitosa con el curso actualizado
    return res.status(200).json({
      status: "success",
      message: "¡Curso actualizado correctamente!",
      curso: cursoUpdated,
    });
  } catch (error) {
    console.log("Error al actualizar los datos del curso", error);
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar los datos del curso",
    });
  }
};

export const addUserToCurso = async (req, res) => {
  try {
    // Obtener el ID del curso desde los parámetros de la URL
    let cursoId = req.params.id;
    
    // Obtener el ID del usuario desde el cuerpo de la solicitud
    let { id_usuario } = req.body;

    // Validar que el ID del usuario esté presente
    if (!id_usuario) {
      return res.status(400).send({
        status: "error",
        message: "Falta el ID del usuario a añadir",
      });
    }

    // Buscar el curso por ID
    let curso = await Curso.findById(cursoId);

    // Verificar si el curso existe
    if (!curso) {
      return res.status(404).send({
        status: "error",
        message: "Curso no encontrado",
      });
    }

    // Verificar si el usuario ya está en el curso
    if (curso.id_usuario.includes(id_usuario)) {
      return res.status(400).send({
        status: "error",
        message: "El usuario ya está en el curso",
      });
    }

    // Agregar el usuario al array de usuarios del curso
    curso.id_usuario.push(id_usuario);

    // Guardar el curso actualizado
    let cursoUpdated = await curso.save();

    // Devolver respuesta exitosa con el curso actualizado
    return res.status(200).json({
      status: "success",
      message: "¡Usuario agregado correctamente al curso!",
      curso: cursoUpdated,
    });
  } catch (error) {
    console.log("Error al agregar usuario al curso", error);
    return res.status(500).send({
      status: "error",
      message: "Error al agregar usuario al curso",
    });
  }
};