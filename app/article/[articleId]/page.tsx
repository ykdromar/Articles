import { axiosInstance } from "@/app/configs/axiosConfig";
import React from "react";
import Markdown from "react-markdown";
const Article = async ({ params }: { params: { articleId: string } }) => {
  let { articleId } = params;
  let body = await getArticle(articleId);
  return (
    <article className=" mx-6 w-8/12">
      <h1 className="text-2xl font-extrabold ">{body.title}</h1>
      <h2 className="text-m font-semibold mt-1">{body.subtitle}</h2>
      <Markdown className="mt-3">{body.body}</Markdown>
    </article>
  );
};

const getArticle = async (articleId: string) => {
  try {
    let res = await axiosInstance.get(`/article/${articleId}`);
    let body = res.data.body;
    return body;
  } catch (e) {
    return null;
  }
};

export default Article;
