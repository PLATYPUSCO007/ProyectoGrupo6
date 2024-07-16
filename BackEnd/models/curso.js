// Añadir pluggin de paginación
/*CursoSchema.plugin(mongoosePaginate);*/
import { Schema, model} from "mongoose";

const CursoSchema = Schema({
  id_usuario: {
    type: [Schema.ObjectId],
    ref: "User",
    default: []
  },
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String
  },
  descripcion: {
    type: String,
    required: true
  },
  duracion: {
    type: String
  },
  imagen: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Curso", CursoSchema, "curso");

