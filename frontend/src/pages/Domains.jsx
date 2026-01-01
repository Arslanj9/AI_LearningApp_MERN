import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { api } from "../../api"; // your centralized axios instance
import {api} from "../api.js";

const Domains = () => {
  const { domain } = useParams(); // get domain from URL (e.g., "AI", "ML")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!domain) return;

    const fetchDomain = async () => {
      try {
        setLoading(true);
        const res = await api.get(`http://localhost:5000/api/domains/${domain}`);

        console.log("Domain is: ", domain)
        setData(res.data);

      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [domain]);

  if (loading) return <p className="mt-24 text-center">Loading...</p>;
  if (!data) return <p className="mt-24 text-center text-red-500">Domain not found</p>;

  return (
    <div className="mt-24 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600">{data.domain}</h1>
      <ul className="mt-4 space-y-6">
        {data.topics.map((topic) => (
          <li key={topic._id}>
            <h2 className="text-xl font-semibold text-indigo-600">{topic.title}</h2>
            <p className="text-gray-700 mt-1">{topic.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Domains;
