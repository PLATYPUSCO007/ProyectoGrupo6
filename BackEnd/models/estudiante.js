import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const EstudianteSchema = Schema({
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  matricula: {
    type: String,
    default: " ",
    required: true
  },
  codigo_activacion: {
    type: String,
    default: " ",
    required: true
  },
  estado: {
    type: String,
    default: "registrado",
    required: true
  },
  supervisor: {
    type: Schema.ObjectId,
    ref: "Supervisor"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Añadir pluggin de paginación
EstudianteSchema.plugin(mongoosePaginate);

export default model("Estudiante", EstudianteSchema, "estudiantes");