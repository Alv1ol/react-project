import { Suspense } from "react";
import { AppStateProvider } from "./context/AppState";
import { SearchBar } from "./components/SeacrBar";
import { List } from "./components/List";

function App() {
  return (
    <AppStateProvider>
      <div className="App">
        <h1>Тестовые значения</h1>
        <SearchBar />
        <Suspense fallback={<div>Loading...</div>}>
          <List />
        </Suspense>
      </div>
    </AppStateProvider>
  );
}

export default App;
