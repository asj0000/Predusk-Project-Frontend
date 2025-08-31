import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User"
import './App.css';
import EditSkill from "./components/EditSkill";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user' element={<User/>} />
        <Route path='/edit-skill/:id' element={<EditSkill/>} />
      </Routes>
    </Router>
  );
}

export default App;
