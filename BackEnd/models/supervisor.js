import { Schema, model } from "mongoose";

const SupervisorSchema = Schema ({
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  create_at: {
    type: Date,
    ref: "Created_at",
  }
});

export default model("Supervisor", SupervisorSchema, "supervisores");