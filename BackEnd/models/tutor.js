import { Schema, model } from "mongoose";

const TutorSchema = Schema ({
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  create_at: {
    type: Date,
    ref: "Created_at",
    required: true
  }
});

export default model("Tutor", TutorSchema, "tutores");