import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    article: {
      type: mongoose.Schema.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default Like;
