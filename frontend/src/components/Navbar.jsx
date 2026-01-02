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
    <nav
      className="w-full fixed top-0 left-0 z-50
      bg-white/80 backdrop-blur-md
      border-b border-gray-100
      shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight
          bg-gradient-to-r from-indigo-600 to-purple-600
          bg-clip-text text-transparent"
        >
          AI Learning Guide
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-[15px] text-gray-600 font-semibold">
          <Link
            to="/"
            className="relative hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>

          {/* LEARN DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShowLearn(true)}
            onMouseLeave={() => setShowLearn(false)}
          >
            <button className="flex items-center p-2 gap-1 hover:text-indigo-600 transition">
              Learn <span className="text-sm">▾</span>
            </button>

            {/* MAIN DROPDOWN */}
            <div
              className={`
                absolute top-7 left-0 w-60
                bg-white/95 backdrop-blur-lg
                border border-gray-100 rounded-xl
                shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                py-2
                transition-all duration-200 ease-out
                ${
                  showLearn
                    ? "opacity-100 translate-y-2 scale-100"
                    : "opacity-0 translate-y-0 scale-95 pointer-events-none"
                }
              `}
            >
              {/* DOMAINS */}
              <div
                className="relative"
                onMouseEnter={() => setShowDomains(true)}
                onMouseLeave={() => setShowDomains(false)}
              >
                <button
                  className="w-full px-5 py-2.5 flex justify-between items-center
                  text-sm font-medium text-gray-600
                  hover:bg-indigo-50 hover:text-indigo-600
                  rounded-lg transition"
                >
                  Domains <span className="text-sm">▸</span>
                </button>

                {/* DOMAINS SUBMENU */}
                <div
                  className={`
                    absolute top-[-8px] left-full w-60
                    bg-white/95 backdrop-blur-lg
                    border border-gray-100 rounded-xl
                    shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                    py-2
                    transition-all duration-200 ease-out
                    ${
                      showDomains
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-2 scale-95 pointer-events-none"
                    }
                  `}
                >
                  {[
                    { name: "Artificial Intelligence", path: "/domains/ai" },
                    { name: "Machine Learning", path: "/domains/ml" },
                    { name: "Deep Learning", path: "/domains/dl" },
                    { name: "Computer Vision", path: "/domains/cv" },
                    { name: "NLP", path: "/domains/nlp" },
                    { name: "Reinforcement Learning", path: "/domains/rl" },
                    { name: "MLOps", path: "/domains/mlops" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-5 py-2.5 text-sm font-medium
                      text-gray-600 hover:bg-indigo-50 hover:text-indigo-600
                      rounded-lg transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* OTHER LINKS */}
              <Link
                to="/glossary"
                className="block px-5 py-2.5 text-sm font-medium
                text-gray-600 hover:bg-indigo-50 hover:text-indigo-600
                rounded-lg transition"
              >
                Glossary
              </Link>
              <Link
                to="/resources"
                className="block px-5 py-2.5 text-sm font-medium
                text-gray-600 hover:bg-indigo-50 hover:text-indigo-600
                rounded-lg transition"
              >
                Resources
              </Link>
            </div>
          </div>

          {/* ROADMAP */}
          <Link
            to="/roadmap"
            className="relative hover:text-indigo-600 transition-colors"
          >
            Roadmap
          </Link>
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-600
              text-white px-6 py-2.5 rounded-full
              shadow-md hover:shadow-lg
              hover:from-indigo-700 hover:to-purple-700
              transition-all"
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full
                border border-gray-300 text-gray-700
                hover:border-indigo-600 hover:text-indigo-600
                transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white
                px-6 py-2.5 rounded-full
                shadow-md hover:bg-indigo-700 hover:shadow-lg
                transition-all"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white
              px-6 py-2.5 rounded-full
              hover:bg-red-600 shadow-md
              transition"
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
