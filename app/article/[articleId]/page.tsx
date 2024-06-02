/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ArticleActions } from "@/app/components";
import ArticleAPI from "@/app/core/api/articleAPI";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
export async function generateMetadata(
  { params }: { params: { articleId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const articleId = params.articleId;

  // fetch data
  const { getAnArticle } = ArticleAPI();
  let res = await getAnArticle(articleId);
  let data = res.body;
  let metadata = {
    title: data.title,
    description: data.subtitle,
    keywords: data.title + data.subtitle,
    openGraph: {
      title: data.title,
      description: data.subtitle,
      images: [data.headerImg!.url],
    },
    twitter: {
      title: data.title,
      description: data.subtitle,
      images: [data.headerImg!.url],
      card: data.subtitle,
    },
  };

  return metadata;
}

const Article = async ({ params }: { params: { articleId: string } }) => {
  let { articleId } = params;
  const { getAnArticle } = ArticleAPI();
  let data = await getAnArticle(articleId);
  if (data.success) {
    const body = data.body;
    return (
      <>
        <article className="px-6 max-w-screen-lg pb-5">
          <h1 className="text-3xl font-extrabold my-3">{body.title}</h1>
          <h2 className="text-lg font font-semibold my-3 italic">
            {body.subtitle}
          </h2>
          <div className="my-3 flex flex-col items-start justify-around border-y p-2">
            <span className=" italic text-xs">
              Written by{" "}
              <Link
                className="font-bold hover:underline"
                target="_blank"
                href="https://twitter.com/yk_dromar"
              >
                Yash Kumar Dromar
              </Link>
            </span>
            <span className="italic text-xs">
              Published:{" "}
              {new Date(body.publishDate).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="w-full lg:aspect-[5/2] md:aspect-[5/2] aspect-video">
            <img
              src={body.headerImg!.url}
              className=" w-full h-full rounded-md  object-cover"
            />
          </div>

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
          <hr />
          <ArticleActions
            publishDate={body.publishDate}
            _id={body._id}
            allLikes={body.likes}
            link={process.env.BASE_URL! + `/article/${articleId}`}
          />
        </article>
      </>
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
