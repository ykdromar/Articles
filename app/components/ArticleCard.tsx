/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { ArticleActions } from "./ArticleActions";
const ArticleCard = (props: any) => {
  let article = props.article;
  return (
    <div className=" w-full flex mt-5 mb-5 flex-wrap justify-center">
      <img
        className="flex-none w-full h-full max-w-60 max-h-40  object-cover rounded-md mx-1 my-1"
        src={article.headerImg.url}
      />
      <main className="flex-1 flex flex-col justify-between my-1 mx-1">
        <div>
          <Link
            href={`/article/${article.articleId}`}
            className="text-2xl font-bold hover:underline"
          >
            {article.title}
          </Link>
          <h2 className="text-medium font-semibold">{article.subtitle}</h2>
        </div>
        <ArticleActions
          _id={article._id}
          allLikes={article.likes}
          link={process.env.BASE_URL! + `/article/${article.articleId}`}
        />
      </main>
    </div>
  );
};

export default ArticleCard;
