import { useEffect, useState } from "react";
import { ArticleCard } from "./components";
import axios from "axios";
const App = async () => {
  let res = await axios.get("http://localhost:3000/api/article");
  if (res.data.success) {
    const articles = res.data.body;
    return (
      <div>
        <main className="flex flex-wrap">
          <main className="px-6 mt-8 w-8/12">
            {articles.map((article: any, i: any) => (
              <ArticleCard key={i} article={article} />
            ))}
          </main>
          <aside className="w-4/12"></aside>
        </main>
      </div>
    );
  } else {
    return <h1>Something went wrong!</h1>;
  }
};

export default App;
