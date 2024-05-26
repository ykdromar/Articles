import Link from "next/link";
import React from "react";
import { ArticleActions } from "./ArticleActions";
const ArticleCard = (props: any) => {
  let article = props.article;
  return (
    <div className="flex mb-10">
      {/* <figure>
        <img
          className="w-min h-min"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxxiiyvmAZJovRUKSzYkhXcZ-A6mxsDj3XkfHPWuasg&s"
        />
      </figure> */}
      <main className="ml-5 flex flex-col justify-between">
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
