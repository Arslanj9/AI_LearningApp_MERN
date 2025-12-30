import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  // Check if user is logged in by looking for token
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO / BRAND */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          AI Learning Guide
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/roadmap" className="hover:text-indigo-600 transition">Roadmap</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">

          {/* Conditional Sign Up / Logout button */}
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
