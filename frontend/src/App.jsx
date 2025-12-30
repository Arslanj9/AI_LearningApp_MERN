import { Routes, Route } from "react-router-dom";
import Register from './pages/Register'
import Login from "./pages/Login";
import Python from "./pages/Python";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-16 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/roadmap/python" element={<Python />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
