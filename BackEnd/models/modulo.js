const mongoose = require("mongoose");

const ModuloSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  duracion: {
    type: Number,
  },
  material: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Modulo", ModuloSchema, "modulo");
