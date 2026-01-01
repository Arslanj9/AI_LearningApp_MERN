import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const [showLearn, setShowLearn] = useState(false);
  const [showDomains, setShowDomains] = useState(false);

  // Decode token to get user role
  let userRole = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      // If token is invalid, userRole remains null
      console.error("Error decoding token:", error);
    }
  }

  const isAdmin = userRole === "admin";


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          AI Learning Guide
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          {/* LEARN DROPDOWN */}
          <div
            className="relative p-1 cursor-pointer"
            onMouseEnter={() => setShowLearn(true)}
            onMouseLeave={() => setShowLearn(false)}
          >
            <button className="hover:text-indigo-600 p-1 transition flex cursor-pointer items-center gap-1">
              Learn
              <span className="text-sm">▾</span>
            </button>

            {/* Main Learn Dropdown */}
            <div
              className={`
      absolute top-7 left-0 w-56 bg-white border rounded-lg shadow-lg py-2
      transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${
        showLearn
          ? "opacity-100 translate-y-2 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-2 scale-95 pointer-events-none"
      }
    `}
            >
              {/* Domains with Submenu */}
              <div
                className="relative group"
                onMouseEnter={() => setShowDomains(true)}
                onMouseLeave={() => setShowDomains(false)}
              >
                <button className="w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 flex justify-between items-center">
                  Domains <span className="text-sm">▸</span>
                </button>

                {/* Submenu for Domains */}
                <div
                  className={`
          absolute top-[-10px] left-full w-56 bg-white border rounded-lg shadow-lg py-2
          transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            showDomains
              ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-x-2 scale-95 pointer-events-none"
          }
        `}
                >
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/ai"
                  >
                    Artificial Intelligence
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/ml"
                  >
                    Machine Learning
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/dl"
                  >
                    Deep Learning
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/cv"
                  >
                    Computer Vision
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/nlp"
                  >
                    NLP
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/rl"
                  >
                    Reinforcement Learning
                  </Link>
                  <Link
                    className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                    to="/domains/mlops"
                  >
                    MLOps
                  </Link>
                </div>
              </div>

              {/* Other main links */}
              <Link
                to="/glossary"
                className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Glossary
              </Link>
              <Link
                to="/resources"
                className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Resources
              </Link>
            </div>
          </div>
          {/* ROADMAP STAYS IN MAIN NAV */}
          <Link to="/roadmap" className="hover:text-indigo-600 transition">
            Roadmap
          </Link>
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/dashboard"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Dashboard
            </Link>
          )}
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
