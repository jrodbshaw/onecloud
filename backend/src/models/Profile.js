import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    dob: {
      type: Date
    },
    location: {
      type: String
    },
    status: {
      type: String
    },
    licence: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
