import { Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = Schema ({
  cedula: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Añadir pluggin de paginación
UserSchema.plugin(mongoosePaginate);


export default model("User", UserSchema, "users");
