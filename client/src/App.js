import TitleNav from "./components/TitleNav/TitleNav";
import MonsterCard from "./components/MonsterCard/MonsterCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleNav position="absolute"></TitleNav>
      </header>
      <>
        <MonsterCard></MonsterCard>
        <MonsterCard></MonsterCard>
      </>
    </div>
  );
}

export default App;
