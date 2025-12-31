import React, { useEffect, useState } from "react";
import { api } from "../../api"; // import centralized axios instance

const AI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/api/domain/AI") 
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="mt-24 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600">{data.domain}</h1>
      <ul className="mt-4 space-y-4">
        {data.topics.map((topic, i) => (
          <li key={i}>
            <h2 className="text-lg font-semibold text-indigo-600">
              {topic.title}
            </h2>
            <p className="text-gray-700 mt-1">{topic.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AI;
