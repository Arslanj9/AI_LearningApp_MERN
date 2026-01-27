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
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Arslan Javaid"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                   text-sm placeholder-gray-400 shadow-sm
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   transition"
                            />
                        </div>

                        {/* Professional Title */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Professional Title
                            </label>
                            <input
                                type="text"
                                placeholder="MERN Stack Developer | Frontend Engineer"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                   text-sm placeholder-gray-400 shadow-sm
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   transition"
                            />
                            <p className="text-xs text-gray-500">
                                This will appear as your headline on the portfolio
                            </p>
                        </div>

                        {/* Bio */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Short Bio
                            </label>
                            <textarea
                                rows={4}
                                placeholder="A passionate developer who loves building scalable web apps..."
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({ ...formData, bio: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                   text-sm placeholder-gray-400 shadow-sm resize-none
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   transition"
                            />
                            <p className="text-xs text-gray-500">
                                2–4 lines is perfect. This will be AI-refined later.
                            </p>
                        </div>
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
                <div className="mt-8 flex items-center justify-between border-t pt-6">
                    {/* Back Button */}
                    <button
                        onClick={back}
                        disabled={step === 0}
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium
               text-gray-600 transition
               hover:bg-gray-100
               focus:outline-none focus:ring-2 focus:ring-gray-300
               disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                        ← Back
                    </button>

                    {/* Next / Generate Button */}
                    <button
                        onClick={next}
                        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold
                text-white shadow-md transition cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
                ${step === steps.length - 1
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {step === steps.length - 1 ? (
                            <>
                                Generate Portfolio 🚀
                            </>
                        ) : (
                            <>
                                Next →
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
