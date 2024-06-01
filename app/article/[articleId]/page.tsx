/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArticleActions } from "@/app/components";
import ArticleAPI from "@/app/core/api/articleAPI";
const Article = async ({ params }: { params: { articleId: string } }) => {
  let { articleId } = params;
  const { getAnArticle } = ArticleAPI();
  let data = await getAnArticle(articleId);
  if (data.success) {
    const body = data.body;
    return (
      <article className=" mx-6 max-w-screen-md">
        <h1 className="text-3xl font-extrabold my-3">{body.title}</h1>
        <img
          src={body.headerImg!.url}
          className="w-full rounded-md h-80 object-cover"
        />
        <h2 className="text-lg font font-semibold my-3 italic">
          {body.subtitle}
        </h2>
        <Markdown
          components={{
            pre: ({ node, ...props }) => <pre className="my-3" {...props} />,
            img: ({ node, ...props }) => (
              <img className=" my-3 w-full rounded-md" {...props} />
            ),
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
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
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
  } else {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Something went wrong !
      </div>
    );
  }
};

export default Article;
