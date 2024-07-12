const mongoose = require("mongoose");

const PaqueteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripción: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
  },
  imagen: {
    type: String,
    required: true,
  },
  cursos: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Paquete", PaqueteSchema, "paquete");
