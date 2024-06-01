import { ArticleCard } from "./components";
import ArticleAPI from "./core/api/articleAPI";

const Home = async () => {
  const { getAllArticles } = ArticleAPI();
  let data = await getAllArticles();
  if (data.success) {
    const articles = data.body;
    return (
      <div className="">
        <main className="flex flex-wrap w-full">
          <main className="px-6 w-full max-w-screen-md">
            {articles.map((article: any, i: any) => (
              <ArticleCard key={i} article={article} />
            ))}
          </main>
        </main>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Something went wrong !
      </div>
    );
  }
};

export default Home;
