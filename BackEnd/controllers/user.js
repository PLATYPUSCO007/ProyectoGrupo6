import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";
//import {RoleService} from "../services/role.service.js";

// Método para Registrar de usuarios
export const register = async (req, res) => {
  try {
    // Recoger datos de la petición
    let params = req.body;

    /*let { role } = req.params;
    console.log("ROLE ", role);*/

    // Validaciones: verificamos que los datos obligatorios estén presentes
    if (
      !params.cedula ||
      !params.name ||
      !params.last_name ||
      !params.telefono ||
      !params.email ||
      !params.rol ||
      !params.estado ||
      !params.password
    ) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Desestructurar datos de usuario
    const { cedula, name, last_name, telefono, email, rol, password, estado, id_curso } = params;
    
    const userData = {
      cedula: cedula,
      name: name,
      last_name: last_name,
      telefono: telefono,
      email: email,
      rol: rol,
      password: password,
      estado: estado,
      id_curso: id_curso
    };

    // Crear una instancia del modelo User con los datos validados
    let user_to_save = new User(userData);

    // Buscar si ya existe un usuario con el mismo email o nick
    const existingUser = await User.findOne({
      $or: [
        { email: user_to_save.email.toLowerCase() },
        { cedula: user_to_save.cedula.toLowerCase() },
      ],
    });

    // Si encuentra un usuario, devuelve un mensaje indicando que ya existe
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "!El usuario ya existe!",
      });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(user_to_save.password, salt);
    user_to_save.password = hasedPassword;

    // Guardar el usuario en la base de datos
    await user_to_save.save();

    // Devolver respuesta exitosa y el usuario registrado
    return res.status(201).json({
      status: "created",
      message: "Usuario registrado con éxito",
      user: {
        id: user_to_save.id,
        name: user_to_save.name,
        last_name: user_to_save.last_name,
        cedula: user_to_save.cedula,
        rol: user_to_save.rol
      },
    });
  } catch (error) {
    console.log("Error en registro de usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error en registro de usuarios",
    });
  }
};

// Método para autenticar usuarios
export const login = async (req, res) => {
  try {
    // Recoger los parámetros del body
    let params = req.body;

    // Validar si llegaron el email y password
    if (!params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Buscar en la BD si existe el email que nos envió el usuario
    const user = await User.findOne({ email: params.email.toLowerCase() });

    // Si no existe el user
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Comprobar si el password recibido es igual al que está almacenado en la BD
    const validPassword = await bcrypt.compare(params.password, user.password);

    // Si los passwords no coinciden
    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    //const role = await RoleService.findRole(user.id);

    // Generar token de autenticación
    const token = createToken(user);

    // Devolver Token generado y los datos del usuario
    return res.status(200).json({
      status: "success",
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        last_name: user.last_name,
        telefono: user.telefono,
        email: user.email,
        cedula: user.cedula,
        rol: user.rol,
        created_at: user.created_at,
        role: role.isEstudiante || role.isSupervisor,
      },
    });
  } catch (error) {
    console.log("Error en el login del usuario: ", error);
    return res.status(500).send({
      status: "error",
      message: "Error en el login del usuario",
    });
  }
};

// Método para mostrar el perfil del usuario
export const profile = async (req, res) => {
  try {
    // Obtener el ID del usuario desde los parámetros de la URL
    const userId = req.params.id;

    // Verificar si el ID recibido del usuario autenticado existe
    /*if (!req.user || !req.user.userId) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no autenticado",
      });
    }*/

    // Buscar al usuario en la BD, excluimos la contraseña, rol, versión.
    const userProfile = await User.findById(userId).select(
      "-password -rol -__v -email",
    );

    // Verificar si el usuario existe
    if (!userProfile) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Información de seguimiento - (req.user.userId = Id del usuario autenticado)
    const followInfo = await followThisUser(req.user.userId, userId);

    // Devolver la información del perfil del usuario
    return res.status(200).json({
      status: "success",
      user: userProfile,
      followInfo,
    });
  } catch (error) {
    console.log("Error al obtener el perfil del usuario:", error);
    return res.status(500).send({
      status: "error",
      message: "Error al obtener el perfil del usuario",
    });
  }
};

// Método para actualizar los datos del usuario
export const updateUser = async (req, res) => {
  try {
    // Recoger información del usuario a actualizar
    let userIdentity = req.user;
    let userToUpdate = req.body;

    // Validar que los campos necesarios estén presentes
    if (!userToUpdate.email || !userToUpdate.cedula) {
      return res.status(400).send({
        status: "error",
        message: "¡Los campos email y cedula son requeridos!",
      });
    }

    // Eliminar campos sobrantes
    delete userToUpdate.iat;
    delete userToUpdate.exp;

    // Comprobar si el usuario ya existe
    const users = await User.find({
      $or: [
        { email: userToUpdate.email.toLowerCase() },
        { cedula: userToUpdate.cedula.toLowerCase() },
      ],
    }).exec();

    // Verificar si el usuario está duplicado y evitar conflicto
    const isDuplicateUser = users.some((user) => {
      return user && user._id.toString() !== userIdentity.userId;
    });

    if (isDuplicateUser) {
      return res.status(400).send({
        status: "error",
        message: "Solo se puede modificar los datos del usuario logueado.",
      });
    }

    // Cifrar la contraseña si se proporciona
    if (userToUpdate.password) {
      try {
        let pwd = await bcrypt.hash(userToUpdate.password, 10);
        userToUpdate.password = pwd;
      } catch (hashError) {
        return res.status(500).send({
          status: "error",
          message: "Error al cifrar la contraseña",
        });
      }
    } else {
      delete userToUpdate.password;
    }

    // Buscar y Actualizar el usuario a modificar en la BD
    let userUpdated = await User.findByIdAndUpdate(
      userIdentity.userId,
      userToUpdate,
      { new: true },
    );

    if (!userUpdated) {
      return res.status(400).send({
        status: "error",
        message: "Error al actualizar el usuario",
      });
    }

    // Devolver respuesta exitosa con el usuario actualizado
    return res.status(200).json({
      status: "success",
      message: "¡Usuario actualizado correctamente!",
      user: userUpdated,
    });
  } catch (error) {
    console.log("Error al actualizar los datos del usuario", error);
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar los datos del usuario",
    });
  }
};

// Método guardar progreso del usuario
/*export const counters = async (req, res) => {
  try {
    // Obtener el id del usuarios autenticado desde el token
    let userId = req.user.userId;

    // En caso de llegar el id del usuario en los parametros (por la url) se toma como prioritario
    if (req.params.id){
      userId = req.params.id;
    }

     // Si no encuentra al usuario
     if (!user){
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    //contador actividades
  } catch {
    console.log("Error al actualizar los datos del usuario", error);
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar los datos del usuario"
    });
  }
}
*/
