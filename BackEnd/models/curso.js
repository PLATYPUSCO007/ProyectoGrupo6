// Añadir pluggin de paginación
CursoSchema.plugin(mongoosePaginate);

const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
  },
  descripcion: {
    type: String,
    required: true,
  },
  duracion: {
    type: Number,
  },
  imagen: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Curso", CursoSchema, "curso");

