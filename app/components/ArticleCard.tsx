import Link from "next/link";
import React from "react";
import { GoHeart, GoShareAndroid, GoBookmark, GoComment } from "react-icons/go";
function ArticleCard(props: any) {
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
        <div className="border-solid border-y-2 mt-3 p-1 flex">
          <div className="flex-auto flex">
            <GoHeart size={20} /> 200
          </div>
          <div className="flex-auto flex">
            <GoComment size={20} /> 20
          </div>
          <div className="flex-auto flex">
            <GoBookmark size={20} />
            20
          </div>

          <div className="flex-auto flex">
            <GoShareAndroid size={20} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ArticleCard;
