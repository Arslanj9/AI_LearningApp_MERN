import { useEffect, useState } from "react";
import axios from "axios";

const EditDomain = ({ domain }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const token = localStorage.getItem("token");

  // 1️⃣ Fetch domain content
  useEffect(() => {
    if (!domain) return;

    const fetchDomain = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/domains/${domain}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTopics(res.data.topics);
      } catch (error) {
        console.error("Failed to fetch domain", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [domain, token]);

  // 2️⃣ Handle input change
  const handleChange = (id, field, value) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic._id === id ? { ...topic, [field]: value } : topic
      )
    );
  };

  // 3️⃣ Save updated topic
  const handleSave = async (topicId, title, content) => {
    try {

      setSavingId(topicId);

      // console.log("Saving topicId is: ", setSavingId(topicId))

      await axios.patch(
        `http://localhost:5000/api/domains/${domain}/topic/${topicId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Topic updated successfully ✅");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update topic ❌");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p>Loading domain content...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Edit {domain} Domain
      </h2>

      {topics.map((topic) => (
        <div
          key={topic._id}
          className="mb-6 p-4 border rounded-xl bg-white shadow-sm"
        >
          {/* Title */}
          <input
            type="text"
            value={topic.title}
            onChange={(e) =>
              handleChange(topic._id, "title", e.target.value)
            }
            className="w-full mb-3 p-2 border rounded-md font-semibold"
          />

          {/* Content */}
          <textarea
            value={topic.content || ""}
            onChange={(e) =>
              handleChange(topic._id, "content", e.target.value)
            }
            className="w-full h-32 p-3 border rounded-md"
          />

          {/* Save */}
          <button
            onClick={() =>
              handleSave(topic._id, topic.title, topic.content)
            }
            disabled={savingId === topic._id}
            className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {savingId === topic._id ? "Saving..." : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditDomain;
