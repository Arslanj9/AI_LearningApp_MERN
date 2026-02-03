import React from "react";

const Home = () => {
  return (
    <div className="p-8 mt-12 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-gray-700 text-lg">
          This is your dashboard home. You can manage content, users, and view key metrics here.
        </p>

        {/* Dashboard cards with single accent color */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border-l-4 border-yellow-500 text-gray-900 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">Users</h2>
            <p className="mt-2 text-gray-600">Manage all registered users</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-yellow-500 text-gray-900 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">Content</h2>
            <p className="mt-2 text-gray-600">Edit and update content</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-yellow-500 text-gray-900 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">Analytics</h2>
            <p className="mt-2 text-gray-600">View system statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
