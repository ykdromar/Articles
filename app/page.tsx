import { ArticleCard } from "./components";
import { axiosInstance } from "./configs/axiosConfig";
const App = async () => {
  let data = await getAllArticle();
  if (data.success) {
    const articles = data.body;
    return (
      <div className="">
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

const getAllArticle = async () => {
  try {
    let res = await axiosInstance.get(`/article`);
    let body = res.data;
    return body;
  } catch (e) {
    return [];
  }
};

export default App;
