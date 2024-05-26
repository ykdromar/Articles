import { ArticleCard } from ".";
import { axiosInstance } from "../core/api/axiosConfig";
const Home = async () => {
  let data = await getAllArticle();
  if (data.success) {
    const articles = data.body;
    return (
      <div className="">
        <main className="flex flex-wrap">
          <main className="px-6  max-w-screen-md">
            {articles.map((article: any, i: any) => (
              <ArticleCard key={i} article={article} />
            ))}
          </main>
        </main>
      </div>
    );
  } else {
    return <h1>Something went wrong!</h1>;
  }
};

const getAllArticle = async () => {
  try {
    let res = await axiosInstance.get(`/api/article`);
    let body = res.data;
    return body;
  } catch (e) {
    return [];
  }
};

export default Home;
