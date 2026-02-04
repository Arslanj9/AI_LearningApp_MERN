import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const [showLearn, setShowLearn] = useState(false);
  const [showDomains, setShowDomains] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLearnMobile, setShowLearnMobile] = useState(false);
  const [showDomainsMobile, setShowDomainsMobile] = useState(false);

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

        {/* MOBILE TOGGLE BUTTON */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 ml-3 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

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

          {/* PORTFOLIO BUILDER */}
          <Link
            to="/portfolio-builder"
            className="relative hover:text-indigo-600 transition-colors"
          >
            Portfolio Builder
          </Link>
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/dashboard"
              className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600
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

      
      {/* MOBILE MENU (small screens) with smooth open/close animation */}
      <div className="md:hidden">
        <div
          className="bg-white border-t border-gray-100 shadow-md overflow-hidden transition-all duration-300 ease-out"
          aria-hidden={!mobileOpen}
        >
          <div
            className={`px-6 space-y-2 transition-all duration-500 ease-out ${mobileOpen ? 'py-4 opacity-100 translate-y-0' : 'py-0 opacity-0 -translate-y-2'}`}
            style={{ maxHeight: mobileOpen ? '900px' : '0px' }}
          >
            <Link to="/" onClick={() => setMobileOpen(false)} className="block text-gray-700 font-semibold">Home</Link>

            <div>
              <button
                onClick={() => setShowLearnMobile((v) => !v)}
                className="w-full flex items-center justify-between text-gray-700 py-2"
              >
                <span className="font-semibold">Learn</span>
                <span className="ml-2">{showLearnMobile ? '▾' : '▸'}</span>
              </button>

              <div className={`${showLearnMobile ? 'block' : 'hidden'} pl-3 mt-2 space-y-1`}>
                <button
                  onClick={() => setShowDomainsMobile((v) => !v)}
                  className="w-full flex items-center justify-between text-gray-600 py-2"
                >
                  <span>Domains</span>
                  <span>{showDomainsMobile ? '▾' : '▸'}</span>
                </button>

                <div className={`${showDomainsMobile ? 'block' : 'hidden'} pl-3 space-y-1`}>
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
                      onClick={() => { setMobileOpen(false); setShowLearnMobile(false); setShowDomainsMobile(false); }}
                      className="block text-gray-600 py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <Link to="/glossary" onClick={() => setMobileOpen(false)} className="block text-gray-600 py-1">Glossary</Link>
                <Link to="/resources" onClick={() => setMobileOpen(false)} className="block text-gray-600 py-1">Resources</Link>
              </div>
            </div>

            <Link to="/roadmap" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Roadmap</Link>
            <Link to="/portfolio-builder" onClick={() => setMobileOpen(false)} className="block text-gray-700 py-1">Portfolio Builder</Link>

            <div className="pt-2">
              {isAdmin && (
                <Link 
                  to="/dashboard" onClick={() => setMobileOpen(false)} 
                  className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                    Dashboard
                </Link>
              )}

              {!isLoggedIn ? (
                <div className="space-y-2 flex flex-col">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full text-center bg-indigo-600 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">Sign Up</Link>
                </div>
              ) : (
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full mt-2 bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 shadow-md transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
