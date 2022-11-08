import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/TitleNav"
import LoginSignup from "./Pages/LoginSignup";
import Arena from "./Pages/Arena";
import Profile from "./Pages/Profile";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <TitleNav position="absolute"></TitleNav> */}
        <Router>
          <TitleNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Arena" element={<Arena />} />
          </Routes>
          <Footer />
        </Router>
      </header>
    </div>
  );
}

export default App;
