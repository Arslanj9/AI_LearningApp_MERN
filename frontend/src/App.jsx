import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Python from "./pages/Python";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";

// Domains
import AI from "./pages/domains/AI";
import ML from "./pages/domains/ML";
import DL from "./pages/domains/DL";
import CV from "./pages/domains/CV";
import NLP from "./pages/domains/NLP";
import RL from "./pages/domains/RL";
import MLOps from "./pages/domains/MLOps";

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
          <Route path="/roadmap/python" element={<Python />} />

          {/* Domain Pages */}
          <Route path="/domains/ai" element={<AI />} />
          <Route path="/domains/ml" element={<ML />} />
          <Route path="/domains/dl" element={<DL />} />
          <Route path="/domains/cv" element={<CV />} />
          <Route path="/domains/nlp" element={<NLP />} />
          <Route path="/domains/rl" element={<RL />} />
          <Route path="/domains/mlops" element={<MLOps />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
