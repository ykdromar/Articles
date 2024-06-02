/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { ArticleActions } from "./ArticleActions";
const ArticleCard = (props: any) => {
  let article = props.article;
  return (
    <div className=" w-full flex mt-5 mb-5 flex-col md:flex-row lg:flex-row flex-wrap justify-center border-b">
      <div className="h-full max-h-44 aspect-[3/2]">
        <img
          src={article.headerImg!.url}
          className=" w-full h-full  object-cover"
        />
      </div>
      <main className="flex-1 flex flex-col justify-between my-1 mx-1">
        <div>
          <Link
            href={`/article/${article.articleId}`}
            className="text-2xl font-bold hover:underline"
          >
            {article.title}
          </Link>
          <p className="line-clamp-2 text-medium font-semibold">
            {article.subtitle}
          </p>
        </div>
        <div className="flex p-1 mt-3 justify-between items-end flex-wrap border-t ">
          <div className=" flex flex-col items-start justify-end ">
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
              {new Date(article.publishDate).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <ArticleActions
            publishDate={article.publishDate}
            _id={article._id}
            allLikes={article.likes}
            link={process.env.BASE_URL! + `/article/${article.articleId}`}
          />
        </div>
      </main>
    </div>
  );
};

export default ArticleCard;
