import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Python from "./pages/Python";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Chatbot from './components/chatBot';
import ChatWidget from './components/ChatWidget';


// Domains
import Domains from "./pages/Domains";
import AI from "./pages/domains/AI";
import ML from "./pages/domains/ML";
import DL from "./pages/domains/DL";
import CV from "./pages/domains/CV";
import NLP from "./pages/domains/NLP";
import RL from "./pages/domains/RL";  
import MLOps from "./pages/domains/MLOps";

// Admin Dashboard
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/Home";
import EditContent from "./pages/Dashboard/EditContent";
import UserManagement from "./pages/Dashboard/UserManagement";

function App() {
  return (
    <div>
      <Navbar />
      <ChatWidget />
      <div className="mt-16 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/python" element={<Python />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Domain Pages */}
          <Route path="/domains/:domain" element={<Domains />} />

          {/* <Route path="/domains/ai" element={<AI />} />
          <Route path="/domains/ml" element={<ML />} />
          <Route path="/domains/dl" element={<DL />} />
          <Route path="/domains/cv" element={<CV />} />
          <Route path="/domains/nlp" element={<NLP />} />
          <Route path="/domains/rl" element={<RL />} />
          <Route path="/domains/mlops" element={<MLOps />} /> */}

          {/* 🔐 ADMIN ONLY */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="edit" element={<EditContent />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
