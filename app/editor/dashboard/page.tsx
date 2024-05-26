"use client";
import EditorAPI from "@/app/core/api/editorAPI";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState<any>([]);
  const { allArticles, publishAnArticle } = EditorAPI();

  useEffect(() => {
    getAllArticle();
  }, []);

  const getAllArticle = async () => {
    try {
      let data = await allArticles();
      if (data.success) {
        setArticles(data.body);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const publishArticle = async (newStatus: Boolean, _id: any) => {
    try {
      let data = await publishAnArticle(_id, newStatus);
      if (data.success) {
        let updatedArticle = data.body;
        let index = articles.findIndex((e: any) => e._id == updatedArticle._id);
        if (index != -1) {
          let newArticles = [
            ...articles.slice(0, index),
            updatedArticle,
            ...articles.slice(index + 1),
          ];
          setArticles(newArticles);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" flex justify-evenly relative">
      <main className="overflow-x-auto w-full ">
        <table className="table text-center">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Date Published</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any, i: any) => (
              <tr className="hover" key={i}>
                <th>{i + 1}</th>
                <td>{article._id}</td>
                <td>{article.title}</td>
                <td>{article.likes.length}</td>
                <td>
                  {new Date(article.publishDate).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <Link
                    href={`/editor/article/${article.articleId}`}
                    className={`btn btn-neutral`}
                  >
                    Edit Article
                  </Link>
                </td>
                <td>
                  <button
                    className={`btn btn-neutral`}
                    onClick={() => {
                      publishArticle(!article.isPublished, article._id);
                    }}
                  >
                    {article.isPublished
                      ? "Unpublish Article"
                      : "Publish Article"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Link className="btn fixed right-10 bottom-5 z-20" href="/editor/article">
        New Article
      </Link>
    </div>
  );
};

export default Dashboard;
