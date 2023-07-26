import mongoose from "mongoose";

const { Schema } = mongoose;

const JwtSchema = Schema(
  {
    token: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RefreshToken", JwtSchema, "tokens");
