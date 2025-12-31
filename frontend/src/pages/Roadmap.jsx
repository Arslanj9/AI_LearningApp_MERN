import React from "react";
import { roadmapData } from "../data/roadmapData";

const Roadmap = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">AI/ML Roadmap</h1>

      <div className="space-y-8">
        {roadmapData.map((section) => (
          <div key={section.level}>
            <h2 className="text-xl font-semibold mb-2">
              {section.level}. {section.title}
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              {section.items.map((item, i) => (
                <li key={i} className="text-gray-700 hover:text-indigo-600 transition">
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
