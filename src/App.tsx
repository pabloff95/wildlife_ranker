import AnimalSearch from "./components/AnimalSearch";

function App() {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col">
      <header>
        <h1 className="text-center">Wildlife Ranker</h1>
      </header>
      <main className="grow flex items-center justify-center">
        <AnimalSearch></AnimalSearch>
      </main>
    </div>
  );
}

export default App;
