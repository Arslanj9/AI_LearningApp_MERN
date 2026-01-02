import React, { useEffect, useState } from "react";
import axios from "axios";

const EditRoadmap = () => {
  const [sections, setSections] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/roadmaps")
      .then((res) => setSections(res.data.roadmap))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (id, field, value) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec._id === id ? { ...sec, [field]: value } : sec
      )
    );
  };

  const handleItemChange = (sectionId, index, value) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec._id === sectionId
          ? {
              ...sec,
              items: sec.items.map((item, i) =>
                i === index ? value : item
              ),
            }
          : sec
      )
    );
  };

  const handleSave = async (section) => {
    try {
      setSavingId(section._id);

      await axios.patch(
        `http://localhost:5000/api/roadmaps/${section._id}`,
        {
          level: section.level,
          title: section.title,
          items: section.items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Roadmap updated successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to update roadmap ❌");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Edit Roadmap</h2>

      {sections.map((section) => (
        <div
          key={section._id}
          className="mb-6 p-4 border rounded-xl bg-white shadow-sm"
        >
          {/* Level */}
          <input
            type="number"
            value={section.level}
            onChange={(e) =>
              handleChange(section._id, "level", Number(e.target.value))
            }
            className="w-full mb-2 p-2 border rounded-md"
          />

          {/* Title */}
          <input
            type="text"
            value={section.title}
            onChange={(e) =>
              handleChange(section._id, "title", e.target.value)
            }
            className="w-full mb-3 p-2 border rounded-md font-semibold"
          />

          {/* Items */}
          {section.items.map((item, i) => (
            <input
              key={i}
              type="text"
              value={item}
              onChange={(e) =>
                handleItemChange(section._id, i, e.target.value)
              }
              className="w-full mb-2 p-2 border rounded-md"
            />
          ))}

          {/* Save */}
          <button
            onClick={() => handleSave(section)}
            disabled={savingId === section._id}
            className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {savingId === section._id ? "Saving..." : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditRoadmap;
