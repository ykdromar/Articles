import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      unique: true,
      required: [true, "Please provide the article id"],
    },
    headerImg: {
      type: Map,
      of: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide the title of the article"],
    },
    subtitle: {
      type: String,
      required: [true, "Please provide the subtitle of the article"],
    },
    body: {
      type: String,
      required: [true, "Please provide body of the article"],
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "Like" }],
    images: [{ type: Map, of: String }],
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
