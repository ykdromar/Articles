"use client";
import { axiosInstance } from "@/app/configs/axiosConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getAllArticle();
  }, []);

  const getAllArticle = async () => {
    try {
      let res = await axiosInstance.get(`/api/editor/dashboard`);
      let body = res.data;
      setArticles(body.body);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" flex justify-evenly">
      <main className="overflow-x-auto w-2/3 ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Title</th>
              <th>Date Published</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any, i: any) => (
              <tr
                className="hover"
                key={i}
                onClick={() => {
                  setSelected(article);
                }}
              >
                <th>{i + 1}</th>
                <td>{article._id}</td>
                <td>{article.title}</td>
                <td>
                  {new Date(article.publishDate).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <aside className="w-1/3 border-2 border-red-900 min-h-screen">
        <Link className="btn mr-2" href="/editor/create">
          New Article
        </Link>
      </aside>
    </div>
  );
};

export default Dashboard;
