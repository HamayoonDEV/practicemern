import mongoose from "mongoose";

const { Schema } = mongoose;

const jwtTokenSchema = Schema(
  {
    token: { type: String, required: true },
    userId: { type: String, requird: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Refreshtoken", jwtTokenSchema, "token");
