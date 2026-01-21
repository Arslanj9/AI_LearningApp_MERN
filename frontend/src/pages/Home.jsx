import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
// React Icons library
import { AiOutlineRobot, AiOutlineLineChart } from "react-icons/ai";
import { MdOutlineTimeline } from "react-icons/md";
import { GiWorld } from "react-icons/gi";

const Home = () => {
  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden
  bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600
  text-white pt-32 pb-28 px-6"
      >
        {/* Soft Glow Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Understand{" "}
            <span className="bg-clip-text text-blue-300">AI & Machine</span>
            &nbsp; Learning
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-indigo-100/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            A beginner-friendly platform to learn Artificial Intelligence and
            Machine Learning — without coding, math, or technical complexity.
          </p>

          {/* CTA */}
          <Link
            to="/roadmap/python"
            className="group relative inline-flex items-center justify-center
  bg-white/95 text-indigo-700 font-semibold
  px-10 py-4 rounded-full
  shadow-[0_20px_40px_rgba(0,0,0,0.15)]
  transition-all duration-300 ease-out
  hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]
  active:translate-y-0.5"
          >
            {/* Glow Ring */}
            <span
              className="absolute inset-0 rounded-full
    bg-gradient-to-r from-indigo-400 to-purple-400
    opacity-0 blur-md
    transition-opacity duration-300
    group-hover:opacity-30"
            />

            {/* Button Text */}
            <span className="relative z-10">Start Learning</span>
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-28 px-6 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16">
            What You’ll Get From This Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "AI Explained Simply",
                desc: "Learn what Artificial Intelligence really is using real-world examples and easy explanations.",
                icon: <AiOutlineRobot size={40} className="text-indigo-600" />,
              },
              {
                title: "Machine Learning Basics",
                desc: "Understand how machines learn from data and improve over time.",
                icon: (
                  <AiOutlineLineChart size={40} className="text-indigo-600" />
                ),
              },
              {
                title: "Clear Learning Roadmap",
                desc: "Follow a structured roadmap that shows exactly what to learn and in what order.",
                icon: (
                  <MdOutlineTimeline size={40} className="text-indigo-600" />
                ),
              },
              {
                title: "Real-World Use Cases",
                desc: "Discover how AI and ML are used in healthcare, finance, education, and daily life.",
                icon: <GiWorld size={40} className="text-indigo-600" />,
              },
            ].map((item) => (
              <Tilt
                key={item.title}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                glareEnable={true}
                glareMaxOpacity={0.15}
                scale={1.03}
                className="w-full group"
              >
                <div
                  className="relative overflow-hidden
              bg-white rounded-3xl p-8
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              transition-transform duration-300
              hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                >
                  {/* Hover Shine */}
                  <div
                    className="absolute inset-0 rounded-3xl
                bg-white/10 pointer-events-none
                opacity-0 group-hover:opacity-20
                transition-opacity duration-500"
                  />

                  {/* Card Content */}
                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-4">{item.icon}</div>

                    <h3 className="text-base md:text-xl font-bold mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-900">
            Who Is This Platform For?
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { icon: "🎓", text: "Students curious about AI & ML" },
              { icon: "💼", text: "Non-technical professionals" },
              { icon: "🚀", text: "Beginners with zero background" },
              {
                icon: "🧠",
                text: "Anyone who wants clarity before going deeper",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="relative group flex items-center gap-4
            bg-white/90 backdrop-blur-lg rounded-2xl p-6
            shadow-[0_5px_20px_rgba(0,0,0,0.08)]
            hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            transition-all duration-300 cursor-default"
              >
                {/* Icon Circle */}
                <span
                  className="flex-shrink-0 w-12 h-12 rounded-full
              bg-gradient-to-br
              text-white flex items-center justify-center
              text-xl md:text-2xl font-bold shadow-lg
              group-hover:scale-110 transition-transform duration-300"
                >
                  {item.icon}
                </span>

                {/* Text */}
                <span className="text-gray-900 text-lg md:text-xl font-medium">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-16 text-gray-900">
            Your Learning Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                desc: "Understand AI & ML concepts",
              },
              {
                step: 2,
                desc: "Learn types and applications",
              },
              {
                step: 3,
                desc: "Explore real-world examples",
              },
              {
                step: 4,
                desc: "Follow a guided learning roadmap",
              },
            ].map((item) => (
              <Tilt
                key={item.step}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.15}
                scale={1.02}
                className="w-full group"
              >
                <div
                  className="relative bg-white rounded-3xl p-8
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              transition-transform duration-300
              hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
            "
                >
                  {/* Step Number Badge */}
                  <div
                    className="w-12 h-12 mx-auto rounded-full
              bg-gradient-to-tr 
               font-bold flex items-center justify-center
              text-lg md:text-xl mb-4 shadow-lg
              group-hover:scale-110 transition-transform duration-300"
                  >
                    {item.step}
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
                    {item.desc}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA SECTION */}
      <section className="bg-indigo-600 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-lg">
            Start Your AI Journey Today
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-10 drop-shadow-md">
            Get a clear understanding of Artificial Intelligence before diving
            into technical details.
          </p>

          <a
            href="/roadmap/python"
            className="inline-flex items-center justify-center
        bg-white/95 text-indigo-700 font-semibold
        px-10 py-4 rounded-full
        shadow-[0_15px_30px_rgba(0,0,0,0.15)]
        hover:bg-white hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        transition-all duration-300
        transform hover:-translate-y-1"
          >
            Explore AI Overview
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
