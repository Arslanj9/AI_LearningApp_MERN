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
  if (!roadmap) return <p className="mt-24 text-center text-red-500">Roadmap not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">AI/ML Roadmap</h1>

      <div className="space-y-8">
        {roadmap.map((section) => (
          <div key={section.level}>
            <h2 className="text-xl font-semibold mb-2">
              {section.level}. {section.title}
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
