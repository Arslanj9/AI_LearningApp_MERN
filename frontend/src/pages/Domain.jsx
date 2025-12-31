import { useState } from "react";
import { roadmap } from "../data/roadmapData";
import { useNavigate } from "react-router-dom";

function Roadmap() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            AI / ML Learning Roadmap
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Click on a topic to expand and explore what’s inside
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {roadmap.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.topic}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.definition}</p>
                  </div>

                  <span
                    className={`text-2xl font-bold transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Expandable Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 flex flex-col gap-4">
                    {/* Details */}
                    <p className="text-gray-700">{item.details}</p>

                    {/* Techniques */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Key Topics & Techniques
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {item.techniques.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Spacer pushes button to bottom */}
                    <div className="flex-grow" />

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => navigate(item.path)}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition inline-flex items-center gap-2"
                      >
                        {item.actionLabel}
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
