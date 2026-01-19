import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";

const Domains = () => {
  const { domain } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!domain) return;

    const fetchDomain = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/domains/${domain}`);
        setData(res.data);
        console.log("Hello: ", res.data)
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
  if (!data)
    return <p className="mt-24 text-center text-red-500">Domain not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Domain Title */}
        <h1
          className="text-4xl font-extrabold mb-10 tracking-tight text-center
          bg-gradient-to-r from-indigo-600 to-purple-600
          bg-clip-text text-transparent"
        >
          {data.domain}
        </h1>

        {/* PDF Download Button */}
        {data.pdf && (
          <div className="text-center mb-8">
            <a
              href={data.pdf}
              download
              className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Download PDF Guide
            </a>
          </div>
        )}

        {/* Topics */}
        <div className="space-y-8">
          {data.topics.map((topic, index) => (
            <div
              key={topic._id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                  {index + 1}
                </span>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {topic.title}
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed ml-12">
                {topic.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Domains;
