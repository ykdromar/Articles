import axios from "axios";
import React from "react";
import Markdown from "react-markdown";
const Article = async ({ params }: { params: { articleId: string } }) => {
  let { articleId } = params;
  let res = await axios.get(`http://localhost:3000/api/article/${articleId}`);
  let body = res.data.body;
  return (
    <article className="m-6 w-8/12">
      <h1 className="text-2xl font-extrabold ">{body.title}</h1>
      <h2 className="text-m font-semibold mt-1">{body.subtitle}</h2>
      <Markdown className="mt-3">{body.body}</Markdown>
    </article>
  );
};

export default Article;
