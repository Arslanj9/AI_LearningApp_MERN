import { useState } from "react";

const steps = ["Basic Info", "Skills", "Projects", "Experience", "Preview"];

export default function AutoPortfolioBuilder() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    skills: "",
    projects: [
      { name: "", description: "", tech: "", github: "", live: "" }
    ],
    experience: "",
  });

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6">
        {/* Step Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Auto Portfolio Builder</h2>
          <p className="text-sm text-gray-500">Step {step + 1} of {steps.length}: {steps[step]}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        {step === 0 && (
          <div className="space-y-4">
            <input
              className="input"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <input
              className="input"
              placeholder="Professional Title (e.g. MERN Stack Developer)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              className="input"
              placeholder="Short Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <textarea
              className="input"
              placeholder="Skills (comma separated: React, Node, MongoDB)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="border p-4 rounded-xl">
                <input
                  className="input"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].name = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />
                <textarea
                  className="input"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].description = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />
                <input
                  className="input"
                  placeholder="Tech Stack"
                  value={project.tech}
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].tech = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />
                <input
                  className="input"
                  placeholder="GitHub Repo Link"
                  value={project.github}
                  onChange={(e) => {
                    const projects = [...formData.projects];
                    projects[index].github = e.target.value;
                    setFormData({ ...formData, projects });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => setFormData({
                ...formData,
                projects: [...formData.projects, { name: "", description: "", tech: "", github: "", live: "" }]
              })}
              className="text-indigo-600 font-semibold"
            >
              + Add another project
            </button>
          </div>
        )}

        {step === 3 && (
          <textarea
            className="input"
            placeholder="Experience / Education"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />
        )}

        {step === 4 && (
          <div className="space-y-3 text-sm">
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Title:</strong> {formData.title}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
            <p className="text-gray-500">This data will be used to generate:</p>
            <ul className="list-disc ml-6">
              <li>Portfolio Website</li>
              <li>GitHub README</li>
              <li>Project Explanations (AI-generated)</li>
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={back} disabled={step === 0} className="btn-secondary">Back</button>
          <button onClick={next} className="btn-primary">
            {step === steps.length - 1 ? "Generate Portfolio" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
