import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { hash, compare } from "bcryptjs";

// todo: Add token to model...

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `${value} already exists`
      }
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
