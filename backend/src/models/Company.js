import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid Email Address"]
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

companySchema.pre("save", passwordHook);

export default mongoose.model("Company", companySchema);
