import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CursoSchema = Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  duracion: {
    type: String,
    required: true
  },
  file: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});


// Añadir pluggin de paginación
CursoSchema.plugin(mongoosePaginate);

export default model("Curso", CursoSchema, "cursos");