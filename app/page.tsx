import { Navbar, ArticleCard } from "./components";
const App = () => {
  return (
    <div>
      <Navbar />
      <main className="flex">
        <main className="px-6 mt-8 flex-1">
          <ArticleCard />
        </main>
        <aside className="flex-auto"></aside>
      </main>
    </div>
  );
};

export default App;
