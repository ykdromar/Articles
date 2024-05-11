import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
      unique: true,
      required: [true, "Please provide the article id"],
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
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
