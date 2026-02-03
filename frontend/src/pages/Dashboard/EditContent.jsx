import React, { useState } from "react";
import EditRoadmap from "./editors/EditRoadmap";
import EditGlossary from "./editors/EditGlossary";
import EditResources from "./editors/EditResources";
import EditDomain from "./editors/EditDomain";

const EditContent = () => {
  const [activeEditor, setActiveEditor] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);

  const renderEditor = () => {
    switch (activeEditor) {
      case "roadmap":
        return <EditRoadmap />;
      case "glossary":
        return <EditGlossary />;
      case "resources":
        return <EditResources />;
      case "domain":
        return <EditDomain domain={activeDomain} />;
      default:
        return (
          <p className="text-gray-600 mt-6">
            Select a section from the menu to start editing.
          </p>
        );
    }
  };

  return (
    <div>
      <h1 className="text-3xl mt-24 font-bold mb-6">Edit Content</h1>

      {/* Dropdown Menu */}
      <div className="relative inline-block group">
        <button className="px-6 py-2 z-0 bg-indigo-600 text-white rounded-lg">
          Choose Content
        </button>

        {/* Dropdown */}
        <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li
              onClick={() => setActiveEditor("roadmap")}
              className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              Roadmap
            </li>
            <li
              onClick={() => setActiveEditor("glossary")}
              className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              Glossary
            </li>
            <li
              onClick={() => setActiveEditor("resources")}
              className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              Resources
            </li>

            {/* Domains */}
            <li className="px-4 py-2 font-semibold text-gray-500">
              Domains
            </li>
            {["AI", "ML", "DL", "CV", "NLP", "RL", "MLOps"].map((domain) => (
              <li
                key={domain}
                onClick={() => {
                  setActiveEditor("domain");
                  setActiveDomain(domain);
                }}
                className="px-6 py-2 hover:bg-indigo-50 cursor-pointer"
              >
                {domain}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editor Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        {renderEditor()}
      </div>
    </div>
  );
};

export default EditContent;
