import { useState } from "react";
import ProjectsStep from "./PortfolioBuilder/ProjectsStep";
import PreviewStep from "./PortfolioBuilder/PreviewStep";

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
        <div style={{ height: "calc(100vh - 64px)" }} className="bg-gray-100 flex items-center justify-center p-4">
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
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Sarah Chen"
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
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Professional Title
                            </label>
                            <input
                                type="text"
                                placeholder="Cloud DevOps Engineer | AWS Solutions Architect"
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
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Short Bio
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Cloud infrastructure enthusiast with expertise in automating deployments and optimizing DevOps pipelines. Passionate about containerization, orchestration, and infrastructure-as-code."
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
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Skills
                            </label>

                            <textarea
                                rows={4}
                                placeholder="AWS, Kubernetes, Docker, Terraform, Jenkins, GitLab CI/CD, Linux, Python, Ansible"
                                value={formData.skills}
                                onChange={(e) =>
                                    setFormData({ ...formData, skills: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                   text-sm placeholder-gray-400 shadow-sm resize-none
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   transition"
                            />

                            <p className="text-xs text-gray-500">
                                Separate skills with commas. These will appear as tags on your portfolio.
                            </p>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <ProjectsStep
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}


                {step === 3 && (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Experience / Education
                            </label>

                            <textarea
                                rows={6}
                                placeholder="e.g. BS Computer Science (2019–2023), Cloud DevOps Engineer with 4+ years of experience managing AWS infrastructure, containerizing applications with Docker/Kubernetes, and implementing CI/CD pipelines. Led migration of legacy systems to cloud platforms, reducing operational costs by 40%."
                                value={formData.experience}
                                onChange={(e) =>
                                    setFormData({ ...formData, experience: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                   text-sm placeholder-gray-400 shadow-sm resize-none
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                   transition"
                            />

                            <p className="text-xs text-gray-500">
                                Include education, job roles, freelancing, or internships. Bullet points work well.
                            </p>
                        </div>
                    </div>
                )}

                {step === 4 && <PreviewStep formData={formData} />}


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

                    
                    <button
                        onClick={next}
                        disabled={step === steps.length - 1}
                        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold
    text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40
    ${step === steps.length - 1
                                ? "bg-gray-400 cursor-not-allowed opacity-60"
                                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                            }`}
                    >
                        Next →
                    </button>

                </div>

            </div>
        </div>
    );
}
