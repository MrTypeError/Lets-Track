import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["First name field is requird"] },
    lastName: { type: String, required: ["Last name field is requird"] },
    email: { type: String, required: ["E-mail is missing "] },
    passward: { type: String, required: ["Password is requird"] },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("User", userSchema);
