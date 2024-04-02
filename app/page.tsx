import { ArticleCard } from "./components";
function App() {
  return (
    <div>
      <main className="flex flex-wrap">
        <main className="px-6 mt-8 flex-1">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </main>
        <aside className="w-4/12"></aside>
      </main>
    </div>
  );
}

export default App;
