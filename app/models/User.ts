import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide the email"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "reader",
      required: [true, "Please provide the role"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
