import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/TitleNav"
import LoginSignup from "./Pages/LoginSignup";
import Arena from "./Pages/Arena";
import Profile from "./Pages/Profile";



function App() {
  return (
    <div className="App">
       <ResponsiveAppBar/>
     <Routes>
      <Route path ="/" element ={<Arena/>}/>
      <Route path ="/" element ={<LoginSignup/>}/>
      <Route path ="/" element ={<Profile/>}/>
     </Routes>
        
    </div>
  );
}

export default App;
