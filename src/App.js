import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User"
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user' element={<User/>} />
      </Routes>
    </Router>
  );
}

export default App;
