import React from "react";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-6">
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            Understand AI & Machine Learning
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">
            A beginner-friendly platform to understand Artificial Intelligence
            and Machine Learning without coding, math, or technical complexity.
          </p>
          {/* <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-100 transition">
            Start Learning
          </button> */}
          <Link
            to="/roadmap/python"
             className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-100 transition"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            What You’ll Get From This Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                AI Explained Simply
              </h3>
              <p className="text-gray-600">
                Learn what Artificial Intelligence really is using real-world
                examples and easy explanations.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Machine Learning Basics
              </h3>
              <p className="text-gray-600">
                Understand how machines learn from data and improve over time.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Clear Learning Roadmap
              </h3>
              <p className="text-gray-600">
                Follow a structured roadmap that shows exactly what to learn
                and in what order.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Real-World Use Cases
              </h3>
              <p className="text-gray-600">
                Discover how AI and ML are used in healthcare, finance,
                education, and daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Who Is This Platform For?
          </h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>🎓 Students curious about AI & ML</li>
            <li>💼 Non-technical professionals</li>
            <li>🚀 Beginners with zero background</li>
            <li>🧠 Anyone who wants clarity before going deeper</li>
          </ul>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Your Learning Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border rounded-xl p-6">
              <span className="text-indigo-600 font-bold text-xl">1</span>
              <p className="mt-2 text-gray-700">
                Understand AI & ML concepts
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <span className="text-indigo-600 font-bold text-xl">2</span>
              <p className="mt-2 text-gray-700">
                Learn types and applications
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <span className="text-indigo-600 font-bold text-xl">3</span>
              <p className="mt-2 text-gray-700">
                Explore real-world examples
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <span className="text-indigo-600 font-bold text-xl">4</span>
              <p className="mt-2 text-gray-700">
                Follow a guided learning roadmap
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-indigo-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your AI Journey Today
          </h2>
          <p className="text-indigo-100 mb-8">
            Get a clear understanding of Artificial Intelligence before
            diving into technical details.
          </p>
          <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-100 transition">
            Explore AI Overview
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
