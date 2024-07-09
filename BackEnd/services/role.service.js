import EstudianteModel from "../models/estudiante.js";
import SupervisorModel from "../models/supervisor.js";

export const RoleService = {
  createRole: async (role, data) => {
    let newRole = {};
    try {
      switch (role) {
        case "estudiante":
          if (
            !data.id_user ||
            !data.matricula ||
            !data.codigo_activacion ||
            !data.estado ||
            !data.supervisor
          )
            return newRole;

          newRole = new EstudianteModel(data);
          await newRole.save();
          break;
        case "supervisor":
          if (!data.id_user) return newRole;
          newRole = new SupervisorModel(data);
          await newRole.save();
          break;
        default:
          console.log("No existe el rol");
          break;
      }
      return newRole;
    } catch (e) {
      console.error(`Error al crear el rol: ${e}`);
      throw new Error('No se creo el rol');
    }
  },
  findRole: async (idUser)=>{
    let role = {};
    try{
      if(!idUser) return;
      role.isEstudiante = await EstudianteModel.findOne({id_user: idUser}).exec();
      role.isSupervisor = await SupervisorModel.findOne({id_user: idUser}).exec();
      return role;
    }catch(e){
      console.error(`Error al buscar el rol: ${e}`);
      throw new Error('No se encontro el rol');
    }
  }
};
