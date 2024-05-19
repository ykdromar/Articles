import { axiosInstance } from "@/app/configs/axiosConfig";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ArticleActions } from "@/app/components";
const Article = async ({ params }: { params: { articleId: string } }) => {
  let { articleId } = params;
  let body = await getArticle(articleId);
  return (
    <article className=" mx-6 max-w-screen-md">
      <h1 className="text-3xl font-extrabold my-3">{body.title}</h1>
      <img src={body.headerImg!.url} className="w-full rounded-2xl" />
      <h2 className="text-lg font font-semibold my-3 italic">
        {body.subtitle}
      </h2>
      <Markdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold my-3" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="custom-2xl font-bold my-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="custom-xl font-bold my-3" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="custom-lg font-bold my-3" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="custom-base font-bold my-3" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="custom-sm font-bold my-3" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          a: ({ node, ...props }) => <a className="custom-a" {...props} />,
          // Add more elements as needed
        }}
        className="mt-3"
      >
        {body.body}
      </Markdown>
      <ArticleActions
        _id={body._id}
        allLikes={body.likes}
        link={process.env.BASE_URL! + `/article/${articleId}`}
      />
    </article>
  );
};

const getArticle = async (articleId: string) => {
  try {
    let res = await axiosInstance.get(`/api/article/${articleId}`);
    let body = res.data.body;
    return body;
  } catch (e) {
    return null;
  }
};

export default Article;
