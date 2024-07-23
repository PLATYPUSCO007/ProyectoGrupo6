import curso from "../models/curso";

// array ids de cursos disponibles
export const addedCursoIds = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado
    const identityUserId = req.user.userId;

    // En caso de no llegar el userID
    if(!identityUserId) {
      return res.status(400).send({
        status: "error",
        message: "Usuario no recibido"
      });
    }

    // Obtener el array con la información de los usuarios que estoy siguiendo (el usuario autenticado está siguiendo)
    let ids_usuario = await Follow.find({ "id_usuario": identityUserId})
      .select({"id_usuario": 1, "_id": 0})
      .exec();
    
  } catch (error) {
    
  }
}
// datos de un curso para adquirir o ya tengo