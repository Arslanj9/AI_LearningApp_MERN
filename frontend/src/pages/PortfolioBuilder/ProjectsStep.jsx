const ProjectsStep = ({ formData, setFormData }) => {
  const removeProject = (indexToRemove) => {
    const updatedProjects = formData.projects.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div className="space-y-6">
      {formData.projects.map((project, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm relative"
        >
          {/* Project Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Project {index + 1}
            </h3>

            {formData.projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="rounded-lg p-1 text-gray-400 transition
                           hover:bg-red-50 hover:text-red-600
                           focus:outline-none focus:ring-2 focus:ring-red-500/30"
                title="Remove project"
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Project Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Portfolio Website"
                value={project.name}
                onChange={(e) => {
                  const projects = [...formData.projects];
                  projects[index].name = e.target.value;
                  setFormData({ ...formData, projects });
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                           text-sm placeholder-gray-400 shadow-sm
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what this project does and the problem it solves"
                value={project.description}
                onChange={(e) => {
                  const projects = [...formData.projects];
                  projects[index].description = e.target.value;
                  setFormData({ ...formData, projects });
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                           text-sm placeholder-gray-400 shadow-sm resize-none
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition"
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Tech Stack
              </label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={project.tech}
                onChange={(e) => {
                  const projects = [...formData.projects];
                  projects[index].tech = e.target.value;
                  setFormData({ ...formData, projects });
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                           text-sm placeholder-gray-400 shadow-sm
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition"
              />
            </div>

            {/* GitHub Link */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                GitHub Repository
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={project.github}
                onChange={(e) => {
                  const projects = [...formData.projects];
                  projects[index].github = e.target.value;
                  setFormData({ ...formData, projects });
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                           text-sm placeholder-gray-400 shadow-sm
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Project Button */}
      <button
        type="button"
        onClick={() =>
          setFormData({
            ...formData,
            projects: [
              ...formData.projects,
              { name: "", description: "", tech: "", github: "", live: "" },
            ],
          })
        }
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600
                   hover:text-indigo-700 transition cursor-pointer"
      >
        + Add another project
      </button>
    </div>
  );
};

export default ProjectsStep;
