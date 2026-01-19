import React, { useEffect, useState } from "react";
import axios from "axios"; // or use your centralized api instance

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/roadmaps");
        setRoadmap(res.data.roadmap); // roadmap array inside DB document
      } catch (error) {
        console.error("Failed to fetch roadmap:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  if (loading) return <p className="mt-24 text-center">Loading roadmap...</p>;
  if (!roadmap)
    return <p className="mt-24 text-center text-red-500">Roadmap not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI / ML Roadmap
        </h1>

        {/* Roadmap Sections */}
        <div className="space-y-8">
          {roadmap.map((section) => (
            <div
              key={section.level}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                  {section.level}
                </span>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>

              {/* Section Items */}
              <ul className="space-y-2 ml-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-700 hover:text-indigo-600 transition"
                  >
                    <span className="mt-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
